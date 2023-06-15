// Import Third-party Dependencies
import React from "react";
import { Button } from "@chakra-ui/react";

// Import Internal Dependencies
import { IconDelete, MyModal } from "../../styledComponent";

interface IDelete {
  id: number;
  handleDelete: (id: number) => Promise<void>;
  loading?: boolean;
  size?: string;
}

const DeleteSomething = ({ id, handleDelete, loading, size = "xs" }: IDelete): JSX.Element => {
  return (
    <MyModal
      toggle={
        <IconDelete
          type="button"
          size={size}
          ml="1"
        />
      }
      body={"Êtes-vous sûr de supprimer ?"}
      displayFooter={true}
      confirm={
        <Button
          onClick={() => handleDelete(id)}
          variant="danger"
          isLoading={loading}
        >
          oui
        </Button>
      }
    />
  );
};


export default DeleteSomething;
