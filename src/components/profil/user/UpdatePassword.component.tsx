// Import Third-party Dependencies
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

// Import Internal Dependencies
import * as AuthService from "../../../services/auth/auth.service";
import { MyInput, MyModal } from "../../styledComponent";

const UpdatePassword = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthService.IUpdatePassword>();
  const [closeModal, setCloseModal] = React.useState<boolean>(false);

  async function updatePassword(data: AuthService.IUpdatePassword) {
    await AuthService.default.updatePassword(data);
    reset();
    setCloseModal(true);
  }

  return (
    <MyModal
      closeModal={closeModal}
      toggle={
        <Button isFullWidth variant="outline" leftIcon={<EditIcon />}>Mot de passe</Button>}
      header="Changer le mot de passe"
      body={
        <>
          <form onSubmit={handleSubmit(updatePassword)}>
            <MyInput value="password"
              type="password"
              label="Mot de passe actuel"
              placeholder="Mot de passe"
              autoComplete="current-password"
              id="passwordUpdate"

              register={register}
              errors={errors}
              required={true}
              minLength={8}
            />
            <MyInput value="newPassword"
              type="password"
              label="Nouveau mot de passe"
              placeholder="Nouveau mot de passe"
              autoComplete="current-password"
              id="newPasswordUpdate"

              register={register}
              errors={errors}
              required={true}
              minLength={8}
            />
            <MyInput value="confirmNewPassword"
              type="password"
              label="Nouveau mot de passe"
              placeholder="Nouveau mot de passe"
              autoComplete="current-password"
              id="confirmNewPassWordUpdate"

              register={register}
              errors={errors}
              required={true}
              minLength={8}
            />
            <Button float="right" type="submit" isLoading={isSubmitting}>Valider</Button>
          </form>
        </>
      }
    />
  );
};


export default UpdatePassword;
