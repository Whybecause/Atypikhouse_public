// Require External Dependencies
import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { Box } from "@chakra-ui/react";
import Pusher from "pusher-js";

// Require Internal Dependecies
import AuthModal from "../../components/auth/auth-modal.component";
import headerStyles from "./header.style";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { displayMessage } from "../../slices/messagesSlice";
import { selectUser } from "../../slices/userSlice";
import MenuContainer from "./MenuContainer";
import BurgerMenu from "./BurgerMenu";
import LogoContainer from "./LogoContainer";

function Header(): JSX.Element {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const [session] = useSession();

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: "eu",
  });
  const channel = pusher.subscribe(`${user.id}`);
  channel.bind("chat-event", async function (msg) {
    dispatch(displayMessage({
      roomId: msg.senderId,
      contactName: msg.contactName,
      asBeenRead: msg.asBeenRead,
      content: msg.content,
      createdAt: msg.createdAt,
      id: msg.id,
      senderId: msg.senderId,
      senderImage: msg.senderImage,
      senderName: msg.senderName
    }));
  });

}, [user]);

  return (
    <>
      <Box className="header-design" bg="brand.blue1">
        <MenuContainer
          className="menu-position"
          isActive={isActive}
        >
          {session
            ? (<BurgerMenu isActive={isActive} />)
            : (<AuthModal />)
          }
        </MenuContainer>
        <LogoContainer/>
      </Box>

      <style jsx global>
        {headerStyles}
      </style>
    </>
  );
}

export default Header;
