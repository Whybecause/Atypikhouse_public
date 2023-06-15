// Import Third-party Dependencies
import React from "react";
import { useRouter } from "next/router";
import {
  SimpleGrid,
  Flex,
  Spacer
} from "@chakra-ui/react";

// Import Internal Dependencies
import PropertiesExcerpt from "../../../components/property/PropertiesExcerpt.component";
import DeleteProperty from "../../../components/property/DeleteProperty";
import CalendarByProperty from "./CalendarByProperty.component";
import { IconEdit } from "../../../components/styledComponent";

const DashboardProperties = ({ properties }): JSX.Element => {
  const router = useRouter();

  return (
    <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="20px">
      {properties.map((property) => (
        <PropertiesExcerpt key={property.id} propertyId={property.id}>
          <Flex mt="5">
            <DeleteProperty propertyId={property.id} />
            <Spacer />
            <IconEdit size="md" onClick={() => router.push(`/property/edit/${property.id}`)} />
            <Spacer />
            <CalendarByProperty propertyId={property.id} />
          </Flex>
        </PropertiesExcerpt>
      ))}
    </SimpleGrid>
  );
};


export default DashboardProperties;
