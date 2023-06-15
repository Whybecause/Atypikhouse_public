import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { nanoid } from "@reduxjs/toolkit";
import {
  Box,
  Flex,
  Center,
  Stack,
  Avatar,
  Text,
  Input,
  useColorModeValue,
  Button,
  Spacer,
  Icon
} from "@chakra-ui/react";
import SendIcon from '@material-ui/icons/Send';

import { ArrowBack, MySpinner } from "../../components/styledComponent/index";
import { showDateOrTime } from "../../utils/helpers/dates-helper";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";
import { selectUser } from "../../slices/userSlice";
import {
  selectLastMsgByRoom,
  selectMessagesByRoomId,
  displayMessage,
  updateMessage,
  messageRead,
} from "../../slices/messagesSlice";
import * as api from "../../utils/helpers/api-helper";
import messagesService from "../../services/messages/messages.service";

const ChatRoom = (): JSX.Element => {
  const router = useRouter();
  const roomId = Number(router.query.id);
  const [content, setContent] = useState("");
  const contentRef = useRef<HTMLInputElement>();

  const user = useAppSelector(selectUser);
  const messages = useAppSelector(state => selectMessagesByRoomId(state, roomId));
  const lastMsg = useAppSelector((state) => selectLastMsgByRoom(state, roomId));
  const roomStatus = useAppSelector((state) => state.messages.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function markAsRead() {

      if (lastMsg?.senderId !== user.id && !lastMsg?.asBeenRead) {
        dispatch(messageRead({ id: lastMsg?.id, changes: { asBeenRead: true } }));
        await messagesService.markAsRead(roomId, { asBeenRead: true });
      }
    }

    markAsRead();
  }, [lastMsg]);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>();
    React.useEffect(() => elementRef.current.scrollIntoView({ block: "nearest", inline: "start" }));
    return <Box ref={elementRef} />;
  };


  React.useEffect(() => {
    if (contentRef.current) contentRef.current.focus();
  }, [contentRef]);

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const msg = dispatch(displayMessage({
        id: nanoid(),
        pending: true,
        roomId: roomId,
        senderImage: user?.customImage ? user?.customImage?.uri : user?.image,
        content: content,
        createdAt: new Date().toISOString(),
        senderId: user.id
      }));
      setContent("");
      const { result } = await api.default.post(`/protected/message/create/${roomId}`, { content: msg.payload.content });
      dispatch(updateMessage({ id: msg.payload.id, changes: { ...result } }));
      await api.default.post("/pusher", { ...result, channel: `${roomId}` });
    }
    catch (e) {
      console.log(e);
    }
  };

  if (roomStatus === "failed") {
    return <div><Center>Impossible d'envoyer le message</Center></div>;
  }

  return (
    <>
      <Head><title>Chat</title></Head>
      <Box
        position="fixed"
        top="0"
        w="100%"
        zIndex={100}
        h="100vh"
        bg={useColorModeValue("white", "brand.dark")}
      >
        <Box h="100%" overflow="hidden">
          <Flex align="center" bg="brand.blue1" borderWidth="2px" borderRadius="xl">
            <ArrowBack url="/messages" />
            <Center ml="2" color="white"><h4>{router.query.name}</h4></Center>
          </Flex>
          <Box h="85%" overflow="auto" pb="50px">
            {roomStatus === "loading" ? (
              <Box h="100%" d="flex" alignItems="center" justifyContent="center" margin="auto">
                <MySpinner size="xl" color="brand.orange1" thickness="4px" />
              </Box>
            ) : (
              messages.map((message) => (
                <Stack key={message.id} align="flex-end" pt="2" pr="2" mb="2">
                  <Box borderWidth="2px" borderRadius="xl" p="1" bg={message.senderName === user.name ? "brand.gray2" : "brand.orange1"}>
                    <Stack direction="row">
                      {message.senderId ? (
                        <Avatar
                          src={message.senderImage}
                          alt="User Image"
                          size="xs"
                        />
                      ) : <p>Supprimé</p>}
                      <Box maxW="280px" color="black">{message.content}</Box>
                    </Stack>

                    <Stack align="flex-end">
                      {message.pending ? (
                        <MySpinner size="xs" />
                      ) : (
                        <Text color="gray" fontSize="xs">{showDateOrTime(message.createdAt)}</Text>
                      )}
                    </Stack>

                  </Box>
                </Stack>
              ))
            )}
            <AlwaysScrollToBottom />
          </Box>
          <form onSubmit={handleMessage}>
            <Flex pl="1" pr="1" position="fixed" bottom={"1"} w="100%">
              <Input
                focusBorderColor="brand.input"
                rounded="full"
                bg={useColorModeValue('gray.100', 'gray.600')}
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                type="text"
                id="content"
                name="content"
                placeholder="Tapez votre message..."
              />
              <Spacer />
              <Button type="submit" rounded="full" >
                <Icon as={SendIcon} />
              </Button>
            </Flex>
          </form>
        </Box>


      </Box>
    </>
  );
};

export default ChatRoom;
