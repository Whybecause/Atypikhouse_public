// Import Third-party Dependencies
import React from "react";
import { FormControl, Select } from "@chakra-ui/react";

// Import Internal Dependencies
import { FormError, Label } from "../../styledComponent";

interface IMySelect {
  register(...args: any): void,
  errors: any,
  id: string,
  value: string,
  label?: string,
  required?: boolean,
  children?: any,
}

const MySelect = ({ register, errors, value, id, label, required, children }: IMySelect): JSX.Element => {
  return (
    <FormControl id={id} mb="5"
      isInvalid={errors[value] ? true : false}
    >
      <Label label={label} htmlFor={value} isRequired={required} />

      <Select
        focusBorderColor="brand.input"
        name={value}
        id={id}
        {...register(
          `${value}` as const,
          {
            required: required
          }
        )}
      >
        {children}
      </Select>
      <FormError errors={errors} value={value} />
    </FormControl>
  );
};


export default MySelect;
