// Import Third-party Dependencies
import React from "react";
import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage
} from "@chakra-ui/react";

const CommentInput = ({ register, errors }): JSX.Element => {
  return (
    <FormControl id="content">
      <FormLabel htmlFor="content"></FormLabel>
      <Textarea
        {...register("content", { pattern: /\S/ })}
        type="text"
        id="content"
        name="content"
        placeholder="Entrez votre commentaire..."
      />
      <FormErrorMessage>
        {errors.message && errors.message.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default CommentInput;
