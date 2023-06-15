// Import Third-party Dependencies
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/client";
import {
  ChatIcon,
  SettingsIcon,
  CalendarIcon,
  CloseIcon,
  LockIcon
} from "@chakra-ui/icons";
import {
  Menu,
  Button,
  MenuButton,
  Box,
  MenuList,
  MenuItem,
  Divider,
  Icon
} from "@chakra-ui/react";

// Import Internal Dependencies
import { useAppSelector } from "../../hooks/reduxHook";
import { selectUser } from "../../slices/userSlice";
import { selectNumberUnreadMessages } from "../../slices/messagesSlice";

interface BurgerMenu {
  isActive: (value: string) => boolean
}

const BurgerMenu = ({ isActive }: BurgerMenu): JSX.Element => {
  const user = useAppSelector(selectUser);
  const numberOfUnreadMessages = useAppSelector((state) => selectNumberUnreadMessages(state, user?.id));

  return (
    <Menu>
      <MenuButton as={Button} variant="burger" size="sm" className="relative-container">
        {user?.name?.substring(0, 1)}
        {numberOfUnreadMessages > 0 && (
          <Box d="flex" justifyContent="center" alignItems="center" className="notif-absolute">
            <Box as="h4" color="white">{numberOfUnreadMessages !== 0 ? numberOfUnreadMessages : null}</Box>
          </Box>
        )}
      </MenuButton>
      <MenuList>
        {user.role === "ADMIN" && (
          <Link href={"/dashboard/admin"}>
            <MenuItem>
              <a data-active={isActive("/dashboard/admin")}>
                <Icon as={LockIcon} mr="2" />
                Admin
              </a>
            </MenuItem>
          </Link>
        )}
        <Link href={"/dashboard/tenant"}>
          <MenuItem>
            <a data-active={isActive("/dashboard/tenant")}>
              <Icon as={CalendarIcon} mr='2' />
              Locataire
            </a>
          </MenuItem>
        </Link>
        <Link href={"/dashboard/host"}>
          <MenuItem>
            <a data-active={isActive("/dashboard/host")}>
              <Icon as={CalendarIcon} mr='2' />
              Propriétaire
            </a>
          </MenuItem>
        </Link>

        <Divider />
        <Link href={"/messages"}>
          <MenuItem mt="2">
            <a data-active={isActive("/messages")}>
              <Icon as={ChatIcon} mr='2' />
              Messages {numberOfUnreadMessages > 0 && (
                (numberOfUnreadMessages > 1
                  ? `(${numberOfUnreadMessages} nouveaux)`
                  : `(${numberOfUnreadMessages} nouveau)`
                )
              )}
            </a>
          </MenuItem>
        </Link>
        <Link href={`/profil/${user.id}`}>
          <MenuItem>
            <a data-active={isActive("/profil/[id]")}>
              <Icon as={SettingsIcon} mr='2' />
              Profil
            </a>
          </MenuItem>
        </Link>

        <Divider />

        <MenuItem
          mt="2"
          onClick={() =>
            signOut({ callbackUrl: `${process.env.CLIENT_URL}/` })
          }>
          <a>
            <Icon as={CloseIcon} mr='2' />
            Déconnexion
          </a>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};


export default BurgerMenu;
