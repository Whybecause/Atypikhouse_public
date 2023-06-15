// Import Third-party Dependencies
import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Badge,
  useColorMode,
  Text
} from "@chakra-ui/react";

// Import Internal Dependencies
import { formatAmountForDisplay } from "../../utils/helpers/amount-helpers";
import { isPropertyNew } from "../../utils/helpers/dates-helper";
import * as config from "../../config/index";
import PropertyRating from "./PropertyRating.component";
import PropertyEquipmentsInput from "./PropertyEquipmentsInput.component";
import { useAppSelector } from "../../hooks/reduxHook";
import { selectPropertiesById, selectReviewByProperty } from "../../slices/propertiesSlice";
import PropertyCard from "./PropertyCard";
interface IPropertyExcerpt {
  propertyId: any;
  children?: any;
}

const PropertiesExcerpt: React.FC<IPropertyExcerpt> = ({ propertyId, children }) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const property = useAppSelector((state) => selectPropertiesById(state, propertyId));
  const reviews = useAppSelector((state) => selectReviewByProperty(state, propertyId));

  return (
    <PropertyCard property={property}>
      <Box className="pointer" onClick={() => router.push(`/property/${property.id}`)}>

        <Box d="flex" alignItems="baseline"  >
          <Badge borderRadius="full" px="2" bg="teal.50" color="teal.600">
            {isPropertyNew(property?.createdAt) ? "New" : null}
          </Badge>
          {property?.equipments &&
            (<PropertyEquipmentsInput property={property} />)
          }
        </Box>

          <Text align="center"
            fontWeight='medium'
            color="gray.400"
            lineHeight="tight"
            isTruncated
          >
            {property?.propertyType?.type}
          </Text>

        <Box
          as="h4"
          mt="1"
          fontWeight="semibold"
          lineHeight="tight"
          isTruncated
        >
          {property?.name}
        </Box>

        <Box>
          {formatAmountForDisplay(property?.price, config.CURRENCY)}
          <Box as="span" color="gray.400" fontSize="sm">
            / nuit
          </Box>
        </Box>

      </Box>

      <Box d="flex" mt="2">
        <PropertyRating property={property} />
        <Box as="span" ml="2" color={colorMode === "light" ? "gray.600" : "gray"} fontSize="sm">
          {reviews?.length
            ? (
              <p>{
                reviews?.length > 1
                  ? `${reviews?.length} commentaires`
                  : `${reviews?.length} commentaire`
              }
              </p>
            ) : (<p>0 commentaires</p>)}
        </Box>
      </Box>
      {children}
    </PropertyCard>
  );
};


export default PropertiesExcerpt;
