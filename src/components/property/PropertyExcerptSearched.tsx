// Import Third-party Dependencies
import React from "react";
import { useRouter } from "next/router";
import {
  Text,
  Box,
  Divider
} from "@chakra-ui/react";

// Import Internal Dependencies
import { useAppSelector } from "../../hooks/reduxHook";
import { selectUser } from "../../slices/userSlice";
import { selectPropertiesById } from "../../slices/propertiesSlice";
import PropertiesExcerpt from "./PropertiesExcerpt.component";
import DeleteProperty from "../dashboard/admin/user/property/DeleteProperty.component";
import { IconEdit } from "../styledComponent";

const PropertyExcerptSearched = ({ propertyId }): JSX.Element => {
  const router = useRouter();

  const property = useAppSelector((state) => selectPropertiesById(state, propertyId));
  const user = useAppSelector(selectUser);
  const isAdmin = user?.role === "ADMIN";

  return (
    <PropertiesExcerpt propertyId={property.id} >
      <Text mt="3" mb="2" color="gray" isTruncated>
        {`${property?.adress?.city} (${property?.adress?.ZIPCode})`}
      </Text>
      {isAdmin && (
        <>
          <Divider mb="2" />
          <Box d="flex" justifyContent="space-between" alignItems="center">
            <IconEdit size="xs" onClick={() => router.push(`/property/edit/${propertyId}`)} />
            <DeleteProperty id={property?.id} />
          </Box>
        </>
      )}
    </PropertiesExcerpt>
  );
};


export default PropertyExcerptSearched;
