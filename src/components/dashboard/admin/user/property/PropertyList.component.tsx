// Import Third-party Dependencies
import React from "react";
import { useRouter } from "next/dist/client/router";
import { Text, Td, Tr, Box } from "@chakra-ui/react";
import dayjs from "dayjs";

// Import Internal Dependencies
import { MyModal } from "../../../../../components/styledComponent";
import PropertyTable from "./PropertyTable.component";
import { prettifyIf0 } from "../../../../../utils/helpers/string.helper";
import DeleteProperty from "./DeleteProperty.component";

const PropertyList = ({ user, userProperties }): JSX.Element => {
  const router = useRouter();

  const TdRedirect = ({ children, property }) => {
    return (
      <Td onClick={() => router.push(`/property/edit/${property.id}`)}>
        {children}
      </Td>
    );
  };

  return (
    <MyModal
      size="full"
      toggle={<Box>{prettifyIf0(userProperties?.length)}</Box>}
      header={`Propriétés de ${user.name} (${userProperties.length})`}
      body={
        <PropertyTable>
          {userProperties.map(property => (
            <Tr _hover={{ bg: "brand.input", cursor: "pointer" }} key={property.id}>
              <TdRedirect property={property}>{property.id}</TdRedirect>
              <TdRedirect property={property}>{property.price} €</TdRedirect>
              <TdRedirect property={property}>
                {/* Réservations en cours */}
                {prettifyIf0 (property?.historical?.filter(histo =>
                  dayjs(histo.dateEnd) > dayjs().startOf("day")).length)
                }
              </TdRedirect>
              <TdRedirect property={property}>{prettifyIf0(property?.rate)}</TdRedirect >
              <TdRedirect property={property}>{prettifyIf0(property?.commentary?.length)}</TdRedirect >
              <TdRedirect property={property}>{property.adress.city}</TdRedirect>
              <TdRedirect property={property}>
                <Text isTruncated>{property.name}</Text>
              </TdRedirect>
              <Td><DeleteProperty id={property.id} /></Td>
            </Tr>
          ))}
        </PropertyTable>
      }
    />
  );
};

export default PropertyList;

