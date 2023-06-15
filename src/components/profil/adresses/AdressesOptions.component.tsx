// Import External dependencies
import React from "react";
import { Box, useDisclosure, Select } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

// Import Internal dependencies
import { useAppSelector } from "../../../hooks/reduxHook";
import { selectAdressById, selectAdressesOtherThanMain } from "../../../slices/adressesSlice";
import { InfoPopover } from "../../styledComponent/index";
import { selectUser } from "../../../slices/userSlice";


export const AdressesOptions = ({ setMainAdressId }): JSX.Element => {
  const user = useAppSelector(selectUser);
  const adressesOtherThanMain = useAppSelector((state) => selectAdressesOtherThanMain(state, user?.mainAdressId));
  const mainAdress = useAppSelector((state) => selectAdressById(state, user?.mainAdressId));

  const { onOpen, onClose, isOpen } = useDisclosure();

  const onAdressChange = e => setMainAdressId(JSON.parse(e.target.value));

  return (
    <>
      <Box mt="5" mb="2">
        <InfoPopover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          placement="auto"
          title="Adresse de résidence"
          icon={<InfoIcon />}
          textBody="Sélectionner une adresse de résidence permet de désactiver l'annnonce associée à cette adresse le cas échéant. Cela vous permet d'y séjourner sans recevoir de réservations" />
      </Box>
      <Box d="flex" alignItems="center" justifyContent="center">
        <Select
          form="userForm"
          id="mainAdress"
          name="adresses"
          onChange={onAdressChange}
        >
          {user?.mainAdressId ? (
            <option value={user?.mainAdressId}>{`${mainAdress?.street} ${mainAdress?.city} ${mainAdress?.ZIPCode}`}</option>
          ) : (
            <option value="">Sélectionnez une adresse de résidence</option>
          )}
          {adressesOtherThanMain?.map(adress => (
            <option key={adress.id} value={adress.id}>{`${adress?.street} ${adress?.city} ${adress?.ZIPCode}`}</option>
          ))}
        </Select>
      </Box>
    </>
  );
};
