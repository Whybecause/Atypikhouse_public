// Import External dependencies
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Stack,
  Box,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

// Import Internal dependencies
import { useAppDispatch } from "../../../hooks/reduxHook";
import { addNewAdress } from "../../../slices/adressesSlice";
import { AddButton, MyModal } from "../../styledComponent/index";
import AdressInput from "./AdressInput.component";

export const AddAdressForm: React.FC = () => {
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [closeModal, setCloseModal] = useState<boolean>(false);

  const { register, setValue, handleSubmit, reset, formState: { errors }, } = useForm();

  const dispatch = useAppDispatch();

  const canSave = addRequestStatus === "idle";

  const onNewAdressSubmit = async (data) => {
    if (canSave) {
      setAddRequestStatus("pending");
      await dispatch(
        addNewAdress({ street: data.street, ZIPCode: parseInt(data.ZIPCode), city: data.city, country: data.country })
      );
      reset();
      setCloseModal(true);
      setAddRequestStatus("idle");
    }
  };

  return (
    <MyModal
      closeModal={closeModal}
      toggle={
        <AddButton variant="light" size="sm" mt="5" content="Adresse" />
      }
      header={<div>Ajouter une adresse</div>}
      body={
        <Box p="5" mt="5" borderRadius="xl">
          <form onSubmit={handleSubmit(onNewAdressSubmit)}>
            <AdressInput
              register={register}
              setValue={setValue}
              errors={errors}
            />
            <Stack align="flex-end">
              <Button
                leftIcon={<CheckIcon />}
                mt="4"
                type="submit"
                isLoading={!canSave}
              >
                Ajouter
              </Button>
            </Stack>
          </form>
        </Box>
      }
    />
  );
};
