import React from "react";
import Head from "next/head";
import { Box, Stack } from "@chakra-ui/react";

import EditUser from "../../components/profil/user/EditUser";
import EditAdress from "../../components/profil/adresses/EditAdress";
import DeleteUser from "../../components/profil/user/DeleteUser";
import UpdatePassword from "../../components/profil/user/UpdatePassword.component";
import { useAppSelector } from "../../hooks/reduxHook";
import { selectUser } from "../../slices/userSlice";
import useIsGoogle from "../../hooks/useIsGoogle";

const Profil: React.FC = () => {
  const user = useAppSelector(selectUser);
  const { isGoogle } = useIsGoogle(user?.id);

  return (
    <>
      <Head>
        <title>Profil</title>
      </Head>
      <Box pl="3" pr="3" className="form-container">
        <Box p="3" borderWidth="3px" borderRadius="xl" borderColor="brand.blue2">
          <EditUser />
        </Box>
        <Stack d="flex" justifyContent="space-between" direction={["column", "column", "row"]} p="5">
          <Stack direction={["column", "column", "row"]}>
            <EditAdress />
            {!isGoogle && (<UpdatePassword />)}
          </Stack>
          <DeleteUser />
        </Stack>
      </Box>
    </>
  );
};

export default Profil;
