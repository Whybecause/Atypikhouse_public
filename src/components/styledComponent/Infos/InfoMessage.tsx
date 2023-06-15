// Import Third-party Dependencies
import React from "react";
import {
  Box,
  Text,
  Center,
  useColorModeValue
} from "@chakra-ui/react";

const InfoMessage = (props): JSX.Element => {
  const bg = useColorModeValue("brand.gradient1", "white");
  const color = useColorModeValue("brand.light1", "brand.dark");
  const shadow = useColorModeValue("dark-lg", "1px 3px 2px white");

  return (
    <Box
      className="small-container"
      p="5"
      bg={bg}
      color={color}
      borderRadius="lg"
      boxShadow={shadow}
      mb={props.mb}
    >
      <Center>
        <Text fontWeight="bold">{props.message}</Text>
      </Center>
    </Box>
  );
};


export default InfoMessage;
