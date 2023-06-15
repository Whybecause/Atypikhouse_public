// Import Third-party Dependencies
import React from "react";
import { FormErrorMessage } from "@chakra-ui/react";

// Import Internal Dependencies
import { capitalizeFirstLetter } from "../../../utils/helpers/string.helper";

const FormError = ({ errors, value }): JSX.Element => {
  return (
    <>
      {errors[value] && errors[value].type === "required" && (
        <FormErrorMessage fontWeight="bold">
          Ce champs est requis 😱
        </FormErrorMessage>
      )}
      {errors[value] && errors[value].type === "pattern" && (
        <FormErrorMessage fontWeight="bold">
          {capitalizeFirstLetter(value)} invalide 😱
        </FormErrorMessage>
      )}
      {errors[value] && errors[value].type === "minLength" && (
        <FormErrorMessage fontWeight="bold">
          Ce champs est trop court 😱
        </FormErrorMessage>
      )}
      {errors[value] && errors[value].type === "maxLength" && (
        <FormErrorMessage fontWeight="bold">
          Ce champs est trop long 😱
        </FormErrorMessage>
      )}
    </>
  );
};


export default FormError;
