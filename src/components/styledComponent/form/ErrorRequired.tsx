// Import Third-party Dependencies
import React from "react";
import { FormErrorMessage } from "@chakra-ui/react";


const ErrorRequired = (): JSX.Element => {
  return (
    <FormErrorMessage fontWeight="bold">
      Ce champs est requis 😱
    </FormErrorMessage>
  );
};


export default ErrorRequired;
