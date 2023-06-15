// Import Third-party Dependencies
import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import PersonIcon from '@material-ui/icons/Person';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import HotelIcon from '@material-ui/icons/Hotel';
import BathtubIcon from '@material-ui/icons/Bathtub';

const PropertyEquipmentsInput = ({ property }): JSX.Element => {

  return (
    <Box
      color="gray.500"
      fontWeight="semibold"
      letterSpacing="wide"
      fontSize="md"
      textTransform="uppercase"
      pl="3"
      mt="1"
      d="flex"
      justifyContent="space-between"
      w="100%"
    >
      <Box d="flex" alignItems="center">
        <p>{property?.equipments["input"]?.[0]?.value}</p>
        <Icon as={PersonIcon} />
      </Box>

      <Box d="flex" alignItems="center">
        <p>{property?.equipments["input"]?.[1]?.value}</p>
        <Icon as={MeetingRoomIcon} />
      </Box>

      <Box d="flex" alignItems="center">
        <p>{property?.equipments["input"]?.[2]?.value}</p>
        <Icon as={HotelIcon} />
      </Box>

      <Box d="flex" alignItems="center">
        <p>{property?.equipments["input"]?.[3]?.value}</p>
        <Icon as={BathtubIcon} />
      </Box>

    </Box>
  );
};


export default PropertyEquipmentsInput;
