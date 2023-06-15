// Import External dependencies
import React from "react";
import { Box, Button } from "@chakra-ui/react";

// Import Internal Dependencies
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { selectPropertyByAdress } from "../../../slices/propertiesSlice";
import { IconDelete, MyModal } from "../../styledComponent";
import { deleteAdress } from "../../../slices/adressesSlice";
import adressService from "../../../services/adress/adress.service";
import { selectUser } from "../../../slices/userSlice";

const DeleteAdress = ({ adressId }): JSX.Element => {
  const user = useAppSelector(selectUser);
  const hasProperty = useAppSelector(
    (state) => selectPropertyByAdress(state, adressId)
  );
  const isMainAdress = adressId === user.mainAdressId;
  const canDelete = !isMainAdress && !hasProperty;

  const dispatch = useAppDispatch();

  const handleDeleteAdress = async (id) => {
    dispatch(deleteAdress(id));
    await adressService.deleteAdress(id);
  };


  return (
    <MyModal
      toggle={<IconDelete size="xs" />}
      header={
        <>
          {hasProperty && (
            <p>Vous ne pouvez pas supprimer cette adresse car elle est associée à une propriété.</p>
          )}
          {isMainAdress && (
            <p>Vous ne pouvez pas supprimer votre adresse de résidence.</p>
          )}
        </>
      }
      body={
        canDelete && (
          <Box mt="1" as="p" fontWeight="bold">Êtes-vous sur de vouloir supprimer cette adresse ?</Box>
        )
      }
      displayFooter={true}
      cancel={canDelete && <Button>Non</Button>}
      confirm={canDelete && <Button onClick={() => handleDeleteAdress(adressId)} variant="danger">Oui</Button>
      }
    />
  );
};


export default DeleteAdress;
