// Import Third-party Dependencies
import React from "react";
import { useForm } from "react-hook-form";
import { FormHelperText, Button } from "@chakra-ui/react";

// Import Internal Dependencies
import * as AuthService from "../../services/auth/auth.service";
import { MyInput } from "../../components/styledComponent";

const Register = (): JSX.Element => {
  const mailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthService.RegisterPayload>();

  async function onRegister(data: AuthService.RegisterPayload) {
    await AuthService.default.register(data);
  }

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <MyInput value="firstname"
        type="text"
        label="Prénom"
        placeholder="Prénom"
        autoComplete="username"
        id="firstName"

        register={register}
        errors={errors}
        required={true}
        minLength={3}
      />
      <MyInput value="lastname"
        type="text"
        label="Nom de famille"
        placeholder="Nom de famille"
        autoComplete="username"
        id="lastname"

        register={register}
        errors={errors}
        required={true}
        minLength={3}
      />
      <MyInput value="email"
        type="email"
        label="Email"
        placeholder="Email"
        autoComplete="email"
        id="emailRegister"

        register={register}
        errors={errors}
        required={true}
        minLength={3}
        pattern={mailRegex}
      >
        <FormHelperText>
          Nous ne partagerons pas votre email.
        </FormHelperText>
      </MyInput>

      <MyInput value="password"
        type="password"
        label="Mot de passe"
        placeholder="Mot de passe"
        autoComplete="current-password"
        id="passwordRegister"

        register={register}
        errors={errors}
        required={true}
        minLength={8}
      />

      <Button
        type="submit"
        isLoading={isSubmitting}
        isFullWidth
      >
        S'inscire
      </Button>

    </form>
  );
};

export default Register;
