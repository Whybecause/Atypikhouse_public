import React from "react";
import { Input, InputGroup, useColorMode } from "@chakra-ui/react";

import AutocompleteResultsExcerpt from "./AutocompleteResultsExcerpt.component";
import searchStyle from "./search.style";

const InputWithAutocomplete = ({
  userInput,
  hasSelected,
  setHasSelected,
  results,
  resultsSelection,
}) => {

  const { colorMode } = useColorMode();

  return (
    <>
      <div className="autocomplete">
        <InputGroup>
          <Input
            type="text"
            placeholder="Où allez-vous?"
            focusBorderColor="brand.input"
            borderColor={colorMode === "light" ? "#E2E8F0" : "white"}
            value={userInput.value}
            onChange={(e) => {
              userInput.onChange(e);
              setHasSelected(false)
            }}
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
      <style jsx global>
        {searchStyle}
      </style>
    </>
  )
}

export default InputWithAutocomplete;
