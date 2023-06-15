// Import External dependencies
import React from "react";
import { Box, Text } from "@chakra-ui/react";

// Import Internal dependencies
import { useAppSelector } from "../../../hooks/reduxHook";
import { selectAdressById } from "../../../slices/adressesSlice";
import { IconEdit } from "../../styledComponent/index";
import DeleteAdress from "./DeleteAdress.component";


const AdressExcerpt = (props): JSX.Element => {
  const adress = useAppSelector((state) => selectAdressById(state, props.adressId));

  return (
    <Box d="flex" className="pointer" borderWidth="2px" borderRadius="lg" p="2">
      <Box w="90%" d="flex" onClick={() => props.setAdressId(adress.id)} >
        <IconEdit size="xs" mr="2" />
        <Text isTruncated>
          {adress.street} {adress.ZIPCode} {adress.city} {adress.country}
        </Text>
      </Box>
      <Box w="10%" >
        <DeleteAdress adressId={adress.id} />
      </Box>
    </Box>
  );
};


export default AdressExcerpt;
