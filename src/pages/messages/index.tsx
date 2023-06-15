import React from "react";
import Head from "next/head";
import { Box, Center } from "@chakra-ui/react";

import { useAppSelector } from "../../hooks/reduxHook";
import { selectUser } from "../../slices/userSlice";
import { selectNumberUnreadMessages, selectRoomsIdsOrdered } from "../../slices/messagesSlice";
import { MySpinner } from "../../components/styledComponent/index";
import RoomExcerpt from "../../components/messages/RoomExcerpt.component";

const Rooms = (): JSX.Element => {
  const { id: userId } = useAppSelector(selectUser);

  const messagesStatus = useAppSelector((state) => state.messages.status);
  const error = useAppSelector((state) => state.messages.error);

  const numberUnreadMessages = useAppSelector((state) => selectNumberUnreadMessages(state, userId));
  const roomsIds = useAppSelector(selectRoomsIdsOrdered);

  const RoomsContainer = ({ children }) => (
    <Box className="form-container">
      <h1>
        <Center>
          Messagerie
        </Center>
      </h1>
      <Box p="2">
        {children}
      </Box>
    </Box>
  );

  let content;

  if (messagesStatus === "loading") {
    content =
      <RoomsContainer>
        <MySpinner size="xl" />
      </RoomsContainer>;
  }
  else if (messagesStatus === "succeeded") {
    content =
      <RoomsContainer>
        <Box as="h4" p="3">
          {numberUnreadMessages === 1 && `${numberUnreadMessages} nouveau message`}
          {numberUnreadMessages > 1 && `${numberUnreadMessages} nouveaux messages`}
        </Box>
        {roomsIds.length
          ? (
            roomsIds.map((roomId, index) => (
              <RoomExcerpt key={index} roomId={roomId} />
            ))
          )
          : (
            <h4><Center>Aucune conversations</Center></h4>
          )}
      </RoomsContainer>;

  } else if (messagesStatus === "failed") {
    content =
      <RoomsContainer>
        <div>{error}</div>
      </RoomsContainer>;
  }

  return (
    <>
      <Head><title>Messagerie</title></Head>
      {content}
    </>
  );
};

export default Rooms;
