// Import Third-party Dependencies
import React from "react";
import { useForm } from "react-hook-form";
import {
  Center,
  Text,
  Button
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

// Import Internal Dependencies
import * as AuthService from "../../services/auth/auth.service";
import { MyInput } from "../../components/styledComponent";

const Login = (): JSX.Element => {
  const mailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthService.SignInPayload>();

  async function onCredentialsSignIn(data: AuthService.SignInPayload) {
    await AuthService.default.credentialsSignIn(data);
  }

  async function onGoogleSignIn() {
    try {
      await AuthService.default.googleSignIn();
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onCredentialsSignIn)}>
      <MyInput value="email"
        type="email"
        label="Email"
        placeholder="Adresse Email"
        autoComplete="email"
        id="emailLogin"

        register={register}
        errors={errors}
        required={true}
        pattern={mailRegex}
      />
      <MyInput value="password"
        type="password"
        label="Mot de passe"
        placeholder="Mot de passe"
        autoComplete="current-password"
        id="passwordLogin"

        register={register}
        errors={errors}
        required={true}
        minLength={8}
      />
      <Button
        type="submit"
        isLoading={isSubmitting}
        isFullWidth
        mb="5"
      >
        Connexion
      </Button>
      <Center><Text color="grey">OU</Text></Center>
      <Button
        colorScheme="black"
        variant="outline"
        isFullWidth
        leftIcon={<FcGoogle />}
        mt="5"
        onClick={onGoogleSignIn}
      >
        Se connecter avec Google
      </Button>
    </form>
  );
};

export default Login;
