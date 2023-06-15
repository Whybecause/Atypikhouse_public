import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Stack, Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHook";
import { selectAdressById, selectAdressesIds, updateAdress } from "../../../slices/adressesSlice";
import AdressInput from "./AdressInput.component";
import AdressExcerpt from "./AdressExcerpt.component";
import { ArrowBack, MyModal } from "../../styledComponent";
import adressService from "../../../services/adress/adress.service";
import { AddAdressForm } from "./AddAdressForm";

const EditAdress: React.FC = () => {
  const [adressId, setAdressId] = useState<number>(undefined);

  const adressesIds = useAppSelector(selectAdressesIds);
  const adress = useAppSelector((state) => selectAdressById(state, adressId));
  const dispatch = useAppDispatch();

  const { register, setValue, handleSubmit, reset, formState: { errors }, } = useForm();

  const onArrowBack = () => {
    setAdressId(undefined);
    reset();
  };

  const handleUpdateAdress = async (data) => {
    const id = adressId;
    dispatch(updateAdress({ id: id, ...data }));
    reset();
    setAdressId(undefined);
    await adressService.updateAdress(id, data);
  };

  let AdressContent;
  let NoAdress;

  if (!adressesIds.length) {
    NoAdress = <Box as="h5" alignItems="center">Aucune adresse enregistrée</Box>;
  }

  if (!adressId) {
    AdressContent = (
      <>
        {adressesIds.map((adressId) => (
          <AdressExcerpt key={adressId} adressId={adressId} setAdressId={setAdressId} />
        ))}
      </>
    );
  }

  if (adressId) {
    AdressContent = (
      <>
        <ArrowBack onClick={() => onArrowBack()} />
        <Box p="5">
          <form onSubmit={handleSubmit(handleUpdateAdress)}>
            <Stack>
              <AdressInput
                register={register}
                setValue={setValue}
                errors={errors}
                street={adress.street}
                ZIPCode={adress.ZIPCode}
                country={adress.country}
                city={adress.city}
              />
              <Button type="submit">Valider</Button>
            </Stack>
          </form>
        </Box>
      </>
    );
  }

  return (
    <MyModal
      size="full"
      toggle={
        <Button
          isFullWidth
          variant="outline"
          leftIcon={<EditIcon />}>
          Mes adresses ({adressesIds.length})
        </Button>}
      header={
        <>
          <h2>Mes adresses</h2>
          <AddAdressForm />
        </>
      }
      body={<>{AdressContent}{NoAdress}</>}
      isClosableBottom={true}
    />
  );
};


export default EditAdress;
