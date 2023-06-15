// Import Third-party Dependencies
import React from "react";
import { Center, SimpleGrid } from "@chakra-ui/react";

// Import Internal Dependencies
import { useAppSelector } from "../../../../hooks/reduxHook";
import { selectAllPropertyTypes } from "../../../../slices/propertyTypesSlice";
import { selectUser } from "../../../../slices/userSlice";
import { InfoMessage } from "../../../../components/styledComponent";
import PropertyTypeExcerpt from "./PropertyTypeExcerpt.component";
interface PropertyType {
  displayScroll?: boolean;
}

const PropertyTypeList: React.FC<PropertyType> = ({ displayScroll = false }): JSX.Element => {
  const propertyTypes = useAppSelector(selectAllPropertyTypes);
  const propertyTypesStatus = useAppSelector((state) => state.propertyTypes.status);
  const user = useAppSelector(selectUser);
  const isAdmin = user?.role === "ADMIN";

  const GridWithOrWithoutScroll = ({ displayScroll = false, children }) => {
    return (
      <>
        {displayScroll ? (
          <SimpleGrid
            columns={4}
            spacingY="20px"
            d="flex"
            flexWrap="nowrap"
            overflowX="auto"
            justifyContent="space-between"
            className="custom-scrollbar"
          >
            {children}
          </SimpleGrid>
        ) : (
          <SimpleGrid columns={[1, 1, 2, 3, 4]} spacingX="20px" spacingY="10px">
            {children}
          </SimpleGrid>
        )}
      </>
    )
  }
  return (
    <>
      {propertyTypesStatus === "success" && Boolean(!propertyTypes?.length) && isAdmin && (
        <InfoMessage message="Vous pouvez créer et gérer des catégories de logement." />
      )}

      <GridWithOrWithoutScroll displayScroll={displayScroll}>
        {propertyTypes.map(propertyType => (
          <Center key={propertyType.id}>
            <PropertyTypeExcerpt propertyType={propertyType} />
          </Center>
        ))}
      </GridWithOrWithoutScroll>
    </>
  );
};


export default PropertyTypeList;
