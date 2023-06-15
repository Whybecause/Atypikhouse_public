// Import Third-party Dependencies
import React from "react";
import { FormControl, Input } from "@chakra-ui/react";

// Import Internal Dependencies
import { FormError, Label } from "../../styledComponent";

interface IMyInput {
  type: string;
  id: string;
  value: string;
  label?: string;
  register(...args: any): void;
  errors: any;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  pattern?: any;
  minLength?: number;
  maxLength?: number;
  valueAsNumber?: boolean;
  displayStar?: boolean;
  children?: any;
  defaultValue?: any;
}

const MyInput = ({
  type,
  id,
  value,
  label,
  placeholder,
  autoComplete,
  required,
  pattern,
  minLength,
  maxLength,
  valueAsNumber,
  register,
  errors,
  displayStar = required,
  children,
  defaultValue
}: IMyInput): JSX.Element => {

  return (
    <FormControl id={id} mb="5"
      isInvalid={errors[value] ? true : false}
    >
      <Label label={label} htmlFor={value} isRequired={required} displayStar={displayStar} />
      <Input
        focusBorderColor="brand.input"
        {...register(
          `${value}` as const,
          {
            required: required,
            pattern: pattern,
            minLength: minLength,
            maxLength: maxLength,
            valueAsNumber: valueAsNumber
          }
        )}
        type={type}
        id={id}
        name={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
      />
      <FormError errors={errors} value={value} />
      {children}
    </FormControl>
  );
};


export default MyInput;
