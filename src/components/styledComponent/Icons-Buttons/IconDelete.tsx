// Import Third-party Dependencies
import React from "react";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";


const IconDelete = ({ ...props }): JSX.Element => {

  return (
    <IconButton
      aria-label="Delete"
      variant="danger"
      icon={<DeleteIcon />}
      {...props}
    />
  );
};


export default IconDelete;
