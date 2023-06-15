// Require External Dependencies
import React from "react";
import Image from "next/image";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

// Require Internal Dependencies
import { MyModal } from "../../components/styledComponent";
import Login from "./Login.component";
import Register from "./Register.component";
import RequestResetPassword from "./RequestResetPassword";
import { DEFAULT_IMAGE_URL } from "../../config/index";

export default function AuthModal(): JSX.Element {

  return (
    <>
      <MyModal
        toggle={
          <Image src={DEFAULT_IMAGE_URL} alt="Connexion" height="30" width="30" className="pointer" />
        }
        header="Bienvenue chez Atypikhouse 👀"
        body={
          <Tabs colorScheme="blue">
            <TabList>
              <Tab>Connexion</Tab>
              <Tab>Inscription</Tab>
              <Tab>Mot de passe?</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>

                <Login />

              </TabPanel>
              <TabPanel>

                <Register />

              </TabPanel>
              <TabPanel>

                <RequestResetPassword />

              </TabPanel>
            </TabPanels>
          </Tabs>}
      />
    </>
  );
}
