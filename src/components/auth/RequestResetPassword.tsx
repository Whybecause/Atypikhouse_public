// Import Third-party Dependencies
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";

// Import Internal Dependencies
import { MyInput } from "../../components/styledComponent";
import * as emailService from "../../services/email/email.service";

const RequestResetPassword = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<emailService.IResetPassword>();

  async function onPasswordResetRequest(data: emailService.IResetPassword) {
    await emailService.default.sendResetPasswordLink(data);
  }

  return (
    <form onSubmit={handleSubmit(onPasswordResetRequest)}>
      <MyInput value="email"
        type="email"
        label="Obtenez un lien de réinitialisation par email"
        placeholder="Entrez votre email"
        id="passwordReset"
        register={register}
        errors={errors}
        required={true}
      />
      <Button type="submit" isFullWidth isLoading={isSubmitting}>Envoyer</Button>
    </form>
  );
};

export default RequestResetPassword;
