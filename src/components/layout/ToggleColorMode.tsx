// Import Third-party Dependencies
import React from "react";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";


const ToggleColorMode = ({ children }): JSX.Element => {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "brand.dark");
  const color = useColorModeValue("brand.dark", "white");

  return (
    <Box color={color} minH="100vh" className="relative-container">
      {children}
      <button
        className="absolute-icon3"
        onClick={toggleColorMode}>
        {bg === "white" ? <MoonIcon/> : <SunIcon/> }
      </button>
    </Box>
  );
};

export default ToggleColorMode;
