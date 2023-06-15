// Import Third-party Dependencies
import React from "react";
import { useRouter } from "next/dist/client/router";
import {
  SimpleGrid,
  Box,
  IconButton,
  Text,
  Divider
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

// Import Internal Dependencies
import { dateLang } from "../../../utils/helpers/dates-helper";
import PropertyCard from "../../../components/property/PropertyCard";
import { useAppSelector } from "../../../hooks/reduxHook";
import { selectPropertiesById } from "../../../slices/propertiesSlice";

const CurrentTenantReservations = ({ propertyId, currentReservation }): JSX.Element => {
  const router = useRouter();
  const property = useAppSelector((state) => selectPropertiesById(state, propertyId));

  return (
    <>
      {currentReservation && property && (
        <PropertyCard property={property}>

          <Box
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            className="pointer"
            onClick={() => router.push(`/property/${property?.id}`)}
          >
            {property?.name}
          </Box>

          <Box mt="2" borderRadius="xl" borderWidth="1px" borderColor="brand.blue1" p="2">
            <Text color="brand.orange1" fontWeight="bold">Du {dateLang(currentReservation?.dateStart, "DD MMM ")} au {dateLang(currentReservation?.dateEnd, "DD MMM YYYY")} </Text>
            <Text fontSize="sm">
              {property?.adress?.street} - {property?.adress?.city} - {property?.adress?.ZIPCode}
            </Text>
            <Divider mb="2" mt="1" />
            <Box d="flex" justifyContent="space-between">
              <Text>{currentReservation?.price}€</Text>
              <IconButton aria-label="Contat host button" icon={<ChatIcon />} onClick={() => router.push(`/messages/${currentReservation?.property?.userId}`)} />
            </Box>
          </Box>

        </PropertyCard>
      )}
    </>
  );
};


const DashboardTenantReservations = ({ currentReservations }): JSX.Element => {
  return (
    <SimpleGrid columns={[1, 2, 3, 3, 5]} spacing="20px" p="6">
      {currentReservations.map((currentReservation) => (
        <CurrentTenantReservations key={currentReservation.id} currentReservation={currentReservation} propertyId={currentReservation.propertyId} />
      ))}
    </SimpleGrid>
  );
};


export default DashboardTenantReservations;
