// Import Third-party Dependencies
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";


const AddButton = (props): JSX.Element => {
  return (
    <Button
      rightIcon={<AddIcon />}
      {...props}
    >
      {props.content}
    </Button>
  );
};


export default AddButton;
