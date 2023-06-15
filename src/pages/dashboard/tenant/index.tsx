import React from "react";
import {
  Center,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Text
} from "@chakra-ui/react";
import Head from "next/head";

import { useAppSelector } from "../../../hooks/reduxHook";
import { selectUser } from "../../../slices/userSlice";
import { selectTenantCurrentReservations, selectTenantFinishedReservations } from "../../../slices/propertiesSlice";
import DashboardTenantReservations from "../../../components/dashboard/tenant/DashboardTenantReservations.component";
import DashboardTenantHisto from "../../../components/dashboard/tenant/DashboardTenantHisto.component";
import { MySpinner } from "../../../components/styledComponent/index";

const TenantDashboard: React.FC = () => {
  const { id: userId } = useAppSelector(selectUser);
  const currentReservations = useAppSelector((state) => selectTenantCurrentReservations(state, userId));
  const tenantFinishedReservations = useAppSelector((state) => selectTenantFinishedReservations(state, userId));
  const historicalStatus = useAppSelector((state) => state?.historical?.status);
  const error = useAppSelector((state) => state.historical.error);

  return (
    <>
      <Head>
          <title>Mes Reservations</title>
      </Head>
      <div className="page-container">
        <Center><h2>Tableau de bord</h2></Center>
        <Tabs colorScheme="blue" mt="2" p="2">
          <TabList>
            <Tab>Réservations ({currentReservations.length})</Tab>
            <Tab>Historique ({tenantFinishedReservations.length})</Tab>
          </TabList>
          {historicalStatus === "loading" && (
            <Center><MySpinner size="xl" /></Center>
          )}
          {historicalStatus === "succeeded" && (
            <TabPanels>
              <TabPanel>
                {currentReservations.length ? (
                  <DashboardTenantReservations currentReservations={currentReservations} />
                ) : (<Center><Text fontWeight="bold">Pas de réservations en cours</Text></Center>)}
              </TabPanel>
              <TabPanel>
                {tenantFinishedReservations.length ? (
                  <DashboardTenantHisto tenantFinishedReservations={tenantFinishedReservations} />
                ) : (
                  <Center><Text fontWeight="bold">Pas d'anciennes réservations</Text></Center>
                )}
              </TabPanel>
            </TabPanels>
          )}
          {historicalStatus === "failed" && (
            <div>{error}</div>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default TenantDashboard;
