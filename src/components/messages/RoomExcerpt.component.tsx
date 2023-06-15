// Import Third-party Dependencies
import React from "react";
import Link from "next/link";
import {
  Box,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";

// Import Internal Dependencies
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  deleteMessages,
  selectLastMsgByRoom,
  selectMessagesIdsByRoomId
} from "../../slices/messagesSlice";
import { showDateOrTime } from "../../utils/helpers/dates-helper";
import { DeleteSomething } from "../../components/styledComponent";
import { selectUser } from "../../slices/userSlice";
import messagesService from "../../services/messages/messages.service";

const RoomExcerpt = ({ roomId }): JSX.Element => {
  const { id: userId } = useAppSelector(selectUser);
  const lastMsg = useAppSelector((state) => selectLastMsgByRoom(state, roomId));

  const dispatch = useAppDispatch();

  const asBeenRead = lastMsg.senderId !== userId ? [lastMsg.asBeenRead].every(Boolean) : true;
  const isAuthor = lastMsg.senderId === userId;

  const bg = asBeenRead
    ? useColorModeValue("brand.light1", "brand.dark")
    : "brand.blue1";
  const color = asBeenRead
    ? useColorModeValue("brand.dark", "brand.light")
    : "brand.light1";

  const messagesIdsByRoomId = useAppSelector((state) => selectMessagesIdsByRoomId(state, roomId));

  const DeleteConv = async (id) => {
    dispatch(deleteMessages(messagesIdsByRoomId));
    await messagesService.deleteMessages(id);
  };


  return (
    <Box bg={bg} color={color}
      borderColor="brand.blue2" borderWidth="1px" borderRadius="2xl" p="2" _hover={{ background: "brand.blue1", color: "white" }} mb="1" >
      <Box d="flex">
        <Link href={{ pathname: `/messages/${encodeURIComponent(lastMsg.roomId)}`, query: { name: lastMsg.contactName } }}>
          <Stack direction="column" w={["80%", "90%"]} className="pointer">
            <Text fontSize="xl">{isAuthor ? lastMsg.contactName : lastMsg.senderName}</Text>
            <Stack direction="row">
              {isAuthor
                ? (<span>Vous:</span>)
                : (<span>{lastMsg.senderName}:</span>)
              }
              <Text noOfLines={1}>{lastMsg.content}</Text>
            </Stack>
          </Stack>
        </Link>
        <Box w={["20%", "10%"]} d="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
          <p>{showDateOrTime(lastMsg.createdAt)}</p>
          <DeleteSomething
            id={lastMsg?.roomId}
            handleDelete={DeleteConv}
            size="xs"
          />
        </Box>
      </Box>
    </Box>
  );
};


export default RoomExcerpt;
