import React from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Center,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel
} from "@chakra-ui/react";

import { useAppSelector } from "../../../hooks/reduxHook";
import { selectUser } from "../../../slices/userSlice";
import { selectHostProperties, selectHostReservations, selectHostHistorical } from "../../../slices/propertiesSlice";
import { AddButton } from "../../../components/styledComponent/index";
import DashboardHostProperties from "../../../components/dashboard/host/DashboardProperties.component";
import DashboardResaHisto from "../../../components/dashboard/host/DashboardResaHisto.component";
import PropertiesStatus from "../../../components/property/PropertiesStatus.component";

const HostDashboard = (): JSX.Element => {
  const { id: userId } = useAppSelector(selectUser);

  const hostProperties = useAppSelector((state) => selectHostProperties(state, userId));
  const reservations = useAppSelector((state) => selectHostReservations(state, userId));
  const historical = useAppSelector((state) => selectHostHistorical(state, userId));

  return (
    <div className="page-container">
      <Head>
        <title>Gerer les reservations</title>
      </Head>
      <Center>
        <h2>Tableau de bord</h2>
      </Center>
      <Link href="/property/create">
        <AddButton content="Nouvelle annonce" size="sm" />
      </Link>
      <PropertiesStatus property={hostProperties}>
        <Tabs colorScheme="blue" mt="2" p="2">
          <TabList>
            <Tab>Propriétés ({hostProperties.length})</Tab>
            <Tab>Réservations ({reservations.length})</Tab>
            <Tab>Historique ({historical.length})</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DashboardHostProperties properties={hostProperties} />
            </TabPanel>
            <TabPanel>
              <DashboardResaHisto historical={reservations} />
            </TabPanel>
            <TabPanel>
              <DashboardResaHisto historical={historical} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PropertiesStatus>
    </div>
  );
};

export default HostDashboard;
