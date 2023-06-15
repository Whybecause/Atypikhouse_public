// Import Third-party Dependencies
import React from "react";
import { IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const IconEdit = ({ ...props }): JSX.Element => {
  return (
    <IconButton
      aria-label="Edit"
      mr="2"
      icon={<EditIcon />}
      {...props}
    />
  );
};


export default IconEdit;
