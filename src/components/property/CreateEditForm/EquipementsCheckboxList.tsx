// Import Third-party Dependencies
import React from "react";
import Image from "next/image";
import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  SimpleGrid,
  Text
} from "@chakra-ui/react";

// Import Internal Dependencies
import { useAppSelector } from "../../../hooks/reduxHook";
import { selectAllEquipements } from "../../../slices/equipementsSlice";
import { capitalizeFirstLetter } from "../../../utils/helpers/string.helper";

const CheckboxContent = ({ children, equipement }): JSX.Element => {
  return (
    <Box
      bg="brand.light1"
      border="1px solid black"
      borderRadius="md"
      p="2"
    >
      <Box d="flex">
        <Image
          src={equipement?.image?.[0].uri}
          alt={equipement?.label}
          height="40"
          width="40"
        />
        {children}
      </Box>
      <Text whiteSpace="nowrap" fontWeight="bold" color="brand.dark">{capitalizeFirstLetter(equipement?.label)}</Text>
    </Box>
  );
};


const EquipementsCheckboxList = ({ propertyEquipementIds, register }): JSX.Element => {
  const allEquipements = useAppSelector(selectAllEquipements);

  return (
    <>
      <FormControl mt="5" mb="5">
        <FormLabel fontWeight="bold">Équipements :</FormLabel>

        <SimpleGrid columns={[2, 3, 8]} spacing="20px" p="2" >

          {allEquipements?.map((equipement, index) => (
            <div key={equipement.id}>
              {propertyEquipementIds?.includes(equipement.id)
                ? (
                  <CheckboxContent equipement={equipement}>
                    <Checkbox defaultChecked
                      ml="4"
                      size="md"
                      colorScheme="green"
                      borderColor="brand.dark"
                      value={equipement.id}
                      {...register(`equipementTypeIds.${index}`)}
                    />
                  </CheckboxContent>
                )
                : (
                  <CheckboxContent equipement={equipement}>
                    <Checkbox
                      ml="4"
                      size="md"
                      colorScheme="green"
                      borderColor="brand.dark"
                      value={equipement.id}
                      {...register(`equipementTypeIds.${index}`)}
                    />
                  </CheckboxContent>
                )
              }
            </div>
          ))}

        </SimpleGrid>
      </FormControl>
    </>
  );
};


export default EquipementsCheckboxList;
