// Import Third-party Dependencies
import React from "react";
import { Box, FormLabel } from "@chakra-ui/react";

interface ILabel {
  label: string;
  htmlFor?: string;
  isRequired?: boolean;
  displayStar?: boolean;
}

const Label = ({ label, htmlFor, isRequired, displayStar = isRequired }: ILabel): JSX.Element => {
  return (
    <FormLabel htmlFor={htmlFor} fontWeight="bold" whiteSpace="nowrap">
      {label} {isRequired && displayStar &&
        <Box as="span" color="tomato">*</Box>
      }
    </FormLabel>
  );
};


export default Label;
