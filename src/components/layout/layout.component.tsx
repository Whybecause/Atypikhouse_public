// Require External Dependencies
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { useSession } from "next-auth/client";
import { Box } from "@chakra-ui/react";

// Require Internal Dependencies
import { store } from "../../store";
import Header from "../header/header.component";
import { fetchAdresses } from "../../slices/adressesSlice";
import { fetchUser } from "../../slices/userSlice";
import { fetchMessages } from "../../slices/messagesSlice";
import { fetchProperties } from "../../slices/propertiesSlice";
import ErrorSuccessModal from "../../components/error-success/ErrorSuccessToast";
import ToggleColorMode from "./ToggleColorMode";
import { fetchEquips } from "../../slices/equipementsSlice";
import { fetchPropertyTypes } from "../../slices/propertyTypesSlice";
import Footer from "../footer";

interface Props {
  children: ReactNode;
}

function Layout(props: Props): JSX.Element {
  const [session] = useSession();

  React.useEffect(() => {
    store.dispatch(fetchProperties());
    store.dispatch(fetchEquips());
    store.dispatch(fetchPropertyTypes());
  }, []);

  React.useEffect(() => {
    if (session) {
      store.dispatch(fetchUser());
      store.dispatch(fetchAdresses());
      store.dispatch(fetchMessages());
    }
  }, [session]);

  return (
    <Provider store={store}>
      <ToggleColorMode>
        <Box minH="100vh" position="relative" overflow="hidden" >
          <Header />
          <Box as="main" pt="120px"
          pb={["38rem", "25rem", "15rem"]}
          >{props.children}</Box>
          <ErrorSuccessModal />
          <Footer />
        </Box>
      </ToggleColorMode>
    </Provider>
  );
}

export default Layout;
