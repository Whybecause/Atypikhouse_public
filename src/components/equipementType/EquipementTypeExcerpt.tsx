// Import Third-party Dependencies
import React from "react";
import Image from "next/image";

import { Box, Divider, Text } from "@chakra-ui/react";

// Import Internal Dependencies
import EditEquip from "../dashboard/admin/equipements/EditEquip.component";
import { useAppSelector } from "../../hooks/reduxHook";
import { selectEquipementsById } from "../../slices/equipementsSlice";
import DeleteEquip from "../dashboard/admin/equipements/DeleteEquip";
import { DEFAULT_PICTURE_URL } from "../../config";

interface IEquipementTypeExcerpt {
  equipementTypeId: any;
  isAdmin?: boolean;
}

const EquipementTypeExcerpt = ({ equipementTypeId, isAdmin }: IEquipementTypeExcerpt): JSX.Element => {
  const equipement = useAppSelector((state) => selectEquipementsById(state, equipementTypeId));
  const imageUri = equipement?.image?.[0]?.uri;

  return (
    <Box
      p="2"
      bg="brand.light1"
      border="1px solid black"
      borderRadius="md"
      w="120px"
      minH="100px"
      backgroundSize="cover"
    >
      <Box objectFit="scale-down" position="relative" w="50px" h="50px">

        <Image
          src={imageUri ? imageUri : DEFAULT_PICTURE_URL}
          alt={equipement?.label}
          objectFit="cover"
          layout="fill"
        />
      </Box>

      <Text mt="1" mb="2" lineHeight="1" fontSize="sm" pl="2" color="brand.dark">{equipement?.label}</Text>

      {isAdmin && (
        <>
          <Divider />
          <Box mt="1" d="flex" justifyContent="space-between" alignItems="center">
            <EditEquip equip={equipement} />
            <DeleteEquip id={equipement?.id} />
          </Box>
        </>
      )}
    </Box>
  );
};


export default EquipementTypeExcerpt;
