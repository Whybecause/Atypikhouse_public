// Import External dependencies
import React, { useState, useEffect } from "react";
import { Input, FormControl, useColorMode, InputGroup } from "@chakra-ui/react";

// Import Internal Dependencies
import { ErrorRequired } from "../../styledComponent";
import { useUserInput } from "../../../hooks/useSearch";
import useAutocompleteLocationResults from "../../../hooks/useAutocompleteLocationResults";
import useAutocompleteSelection from "../../../hooks/useAutocompleteSelection";
import searchStyle from "../../search/search.style";
import AutocompleteResultsExcerpt from "../../search/AutocompleteResultsExcerpt.component";
interface IAdressInput {
  register(...args: any): void;
  setValue?: any;
  errors: any;
  defaultValue?: string;
  street?: string;
  ZIPCode?: number;
  city?: string;
  country?: string;
}

const AdressInput = ({ register, setValue, errors, street, ZIPCode, city, country }: IAdressInput): JSX.Element => {
  const userInput = useUserInput("");
  const [hasSelected, setHasSelected] = useState<boolean>(false);
  const { results } = useAutocompleteLocationResults(userInput.value, hasSelected);
  const resultsSelection = useAutocompleteSelection(results);

  useEffect(() => {
    if (resultsSelection.selectedResult !== undefined) {
      userInput.onClick(resultsSelection.selectedResult.nom);
      setHasSelected(true);
    }
  }, [resultsSelection.selectedResult]);

  const { colorMode } = useColorMode();

  return (
    <>
      <FormControl isInvalid={errors.street?.type === "required"}>
        <Input
          {...register("street", { required: true })}
          focusBorderColor="brand.input"
          borderColor={colorMode === "light" ? "#E2E8F0" : "white"}
          id="street"
          type="text"
          name="street"
          placeholder="Numéro/Rue"
          defaultValue={street}
        />
        <ErrorRequired />
      </FormControl>

      <FormControl isInvalid={errors.city?.type === "required"}>
      <div className="autocomplete">
        <InputGroup>
          <Input
            type="text"
            id="city"
            name="city"
            mt="6"
            mr="2"
            placeholder="Ville"
            focusBorderColor="brand.input"
            borderColor={colorMode === "light" ? "#E2E8F0" : "white"}
            value={userInput.value || city}
            onChange={(e) => {
              userInput.onChange(e);
              setHasSelected(false)
            }}
            {...setValue("city", userInput.value)}
            required
          />
        </InputGroup>

        {!hasSelected
          ? (
            <div className="autocomplete-items">
              {results?.map((result, index) => (
                <AutocompleteResultsExcerpt
                  key={index}
                  result={result}
                  active={index === resultsSelection.cursor}
                  setSelected={resultsSelection.setSelectedResult}
                  setHovered={resultsSelection.setHovered}
                />
              ))}
            </div>
          ) : (<></>)}
      </div>
        <ErrorRequired />
      </FormControl>

      <FormControl id="ZIPCode">
        <Input
          {...register("ZIPCode", { valueAsNumber: true, required: true })}
          mt="6"
          id="ZIPCode"
          type="number"
          name="ZIPCode"
          placeholder="Code postal"
          focusBorderColor="brand.input"
          borderColor={colorMode === "light" ? "#E2E8F0" : "white"}
          defaultValue={ZIPCode}
          required
        />
        <ErrorRequired />
      </FormControl>

      <FormControl isInvalid={errors.country?.type === "required"}>
        <Input
          {...register("country", { required: true })}
          mt="6"
          id="country"
          type="text"
          name="country"
          placeholder="Pays"
          focusBorderColor="brand.input"
          borderColor={colorMode === "light" ? "#E2E8F0" : "white"}
          defaultValue={country}
        />
        <ErrorRequired />
      </FormControl>
      <style jsx global>
        {searchStyle}
      </style>
    </>
  );
};

export default AdressInput;
