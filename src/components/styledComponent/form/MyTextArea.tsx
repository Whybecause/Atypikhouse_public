// Import Third-party Dependencies
import React from "react";
import { FormControl, Textarea } from "@chakra-ui/react";

// Import Internal Dependencies
import { FormError, Label } from "../../styledComponent";

interface IMyTextArea {
  type: string;
  id: string;
  value: string;
  label?: string;
  placeholder?: string;
  register(...args: any): void;
  errors: any;
  autoComplete?: string;
  required?: boolean;
  pattern?: any;
  minLength?: number;
  maxLength?: number;
  displayStar?: boolean;
  children?: any;
  defaultValue?: any;
}
const MyTextArea = ({
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
  register,
  errors,
  displayStar = required,
  children,
  defaultValue
}: IMyTextArea): JSX.Element => {

  return (
    <FormControl id={id} mb="5"
      isInvalid={errors[value] ? true : false}
    >
      <Label label={label} htmlFor={value} isRequired={required} displayStar={displayStar} />
      <Textarea
        focusBorderColor="brand.input"
        {...register(
          `${value}`,
          {
            required: required,
            pattern: pattern,
            minLength: minLength,
            maxLength: maxLength
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


export default MyTextArea;
