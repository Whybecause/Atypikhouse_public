// Import Third-party Dependencies
import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

// Import Internal Dependencies
import searchStyle from "./search.style";

const AutocompleteResultsExcerpt = ({ active, result, setSelected, setHovered }): JSX.Element => {
  const bg = useColorModeValue("brand.light1", "brand.dark");

  return (
    <>
      <Box
        bg={bg}
        className={active ? "autocomplete-active" : "autocomplete-item"} id={result.nom}
        onClick={() => setSelected(result)}
        onMouseEnter={() => setHovered(result)}
        onMouseLeave={() => setHovered(undefined)}
      >
        <a>
          {result.nom}
          ({result?.codesPostaux
            ? result.codesPostaux[0]
            : result.code
          })
        </a>
      </Box>
      <style jsx global>
        {searchStyle}
      </style>
    </>
  );
};


export default AutocompleteResultsExcerpt;
