// Import Third-party Dependencies
import React from "react";
import {
  SimpleGrid, 
  Stack, 
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  FormControl 
} from "@chakra-ui/react";

// Import Internal Dependencies
import { Label } from "../../styledComponent";


const EquipDefault = (props): JSX.Element => {
  const { equipInputs, register, setValue } = props;

  return (
    <SimpleGrid columns={[2, 4, 4]} mt="5">

      {equipInputs?.map((input, index) => (
        <FormControl key={index} id={index}>

          <Stack mt="2" align="center">

            <Box d="flex">
              <Label label={input.label} isRequired={true} />
            </Box>

            <NumberInput
              focusBorderColor="brand.input"
              min={0}
              maxW="100px"
              defaultValue={input.value}
              {...setValue(
                `equipments.input.${index}.label`,
                input.label
              )}
              isRequired
            >
              <NumberInputField
                {...register(`equipments.input.${index}.value`, {
                  valueAsNumber: true,
                  required: true,
                })}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

          </Stack>
        </FormControl>

      ))}
    </SimpleGrid>
  );
};


export default EquipDefault;
