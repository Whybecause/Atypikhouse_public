// Import Third-party Dependencies
import React from "react";
import { FormControl, FormHelperText } from "@chakra-ui/form-control";

// Import Internal Dependencies
import AdressInput from "../../profil/adresses/AdressInput.component";
import { Label } from "../../styledComponent";

const AdressWrapper = (props): JSX.Element => {
  const { register, setValue, errors } = props;

  return (
    <FormControl mt="5">
      <Label label="Adresse" htmlFor="adress" isRequired={true} />
      <AdressInput
        register={register}
        setValue={setValue}
        errors={errors}
      />
      <FormHelperText>
        Nous ne partagerons votre adresse qu'avec vos futurs
        locataires.
      </FormHelperText>
    </FormControl>
  );
};

export default AdressWrapper;
