
import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from "@chakra-ui/react";
import Head from 'next/head'

import UserList from "../../../components/dashboard/admin/user/UserList.component";
import AdminPage from "../../../components/styledComponent/auth/AdminPage";
import CreateEquipForm from "../../../components/dashboard/admin/equipements/CreateEquipForm.component";
import CreatePropertyType from "../../../components/dashboard/admin/propertyType/CreatePropertyType.component";
import PropertyTypeList from "../../../components/dashboard/admin/propertyType/PropertyTypeList.component";
import { useAppSelector } from "../../../hooks/reduxHook";
import { selectEquipementsIds } from "../../../slices/equipementsSlice";
import EquipementTypeList from "../../../components/equipementType/EquipementTypeList";
import { InfoMessage } from "../../../components/styledComponent";

const AdminDashboard = (): JSX.Element => {
  const equipementIds = useAppSelector(selectEquipementsIds);

  return (
    <>
    <Head>
        <title>Administrateur</title>
    </Head>
    <AdminPage>
      <Tabs colorScheme="blue" className="page-container">
        <TabList>
          <Tab>Utilisateurs</Tab>
          <Tab>Équipements</Tab>
          <Tab>Catégories</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserList />
          </TabPanel>
          <TabPanel>
            <CreateEquipForm />
            <Box mt="5" mb="5">
              {equipementIds?.length
                ? (
                  <h2>Equipements disponibles ({equipementIds?.length})</h2>
                ) : (
                  <InfoMessage message="Vous pouvez créer des équipements que les propriétaires pourront sélectionner dans leurs annonces 😊!" />
                )}
            </Box>
            <EquipementTypeList equipementIds={equipementIds} isAdmin={true} />
          </TabPanel>
          <TabPanel>
            <CreatePropertyType />
            <PropertyTypeList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AdminPage>
    </>
  );
};


export default AdminDashboard;
