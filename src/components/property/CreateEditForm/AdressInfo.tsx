// Import Third-party Dependencies
import React from "react";
import { Box, Center, useDisclosure } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

// Import Internal Dependencies
import { InfoPopover } from "../../styledComponent/index";

const AdressInfo = (props): JSX.Element => {
  const { adress } = props;

  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Box mt="4">
      <InfoPopover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="auto"
        title="Adresse"
        icon={<InfoIcon />}
        textBody="Vous pouvez modifier l'adresse directement sur votre page profil"
      />
      <Center>
        {adress?.street} {adress?.city} {adress?.ZIPCode}{" "}
        {adress?.country}
      </Center>
    </Box>
  );
};


export default AdressInfo;
