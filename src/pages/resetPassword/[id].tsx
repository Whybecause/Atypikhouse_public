import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Box, Button, Center } from "@chakra-ui/react";

import * as AuthService from "../../services/auth/auth.service";
import { MyInput } from "../../components/styledComponent";

const ResetPassword = () => {
  const router = useRouter();
  const { id: identifier, token } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthService.IResetPassword>();

  const onSubmitPassword = async (data: AuthService.IResetPassword) => {
    await AuthService.default.resetPassword(data);
  };

  return (
    <>
      <Head><title>Réinitialiser le mot de passe</title></Head>
      <Box className="form-container">
        <Center mb="5"><h1>Changez votre mot de passe</h1></Center>
        <form onSubmit={handleSubmit(onSubmitPassword)}>
          <input type="hidden" defaultValue={identifier} {...register("identifier")} />
          <input type="hidden" defaultValue={token} {...register("token")} />
          <MyInput value="password"
            type="password"
            id="password"
            label="Nouveau mot de passe"
            placeholder="Entrez votre nouveau mot de passe"
            autoComplete="password"
            required={true}
            minLength={8}
            register={register}
            errors={errors}
          />
          <MyInput value="passwordConfirm"
            type="password"
            id="passwordConfirm"
            label="Confirmez votre nouveau mot de passe"
            placeholder="Confirmez votre nouveau mot de passe"
            autoComplete="password"
            required={true}
            minLength={8}
            register={register}
            errors={errors}
          />
          <Button type="submit" isLoading={isSubmitting}>Valider</Button>
        </form>
      </Box>
    </>
  );
};

export default ResetPassword;
