import { useState, useEffect } from "react";
import useSWR from "swr";

import * as api from "../utils/helpers/api-helper";
import { flatten } from "../utils/helpers/array-helper";

const useAutocompleteLocationResults = ( inputValue, hasSelected ) => {
  const [hasStoppedTyping, setHasStoppedTyping] = useState<boolean>(false);

  const [results, setResults] = useState([]);

  const citiesApiUrl = `https://geo.api.gouv.fr/communes?nom=${inputValue}&boost=population&limit=5`;
  const departmentsApiUrl = `https://geo.api.gouv.fr/departements?nom=${inputValue}&boost=population&limit=5`;

  const { data: cities } = useSWR(!hasSelected && hasStoppedTyping ? citiesApiUrl : null, api.default.fetcher); //hasSelected permet de pas refetch la data une fois que l"user a cliqué sur le nom d"une ville
  const { data: departments } = useSWR(!hasSelected && hasStoppedTyping ? departmentsApiUrl : null, api.default.fetcher);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setHasStoppedTyping(true);
    }, 500);
    return () => {
      clearTimeout(delayDebounceFn),
      setHasStoppedTyping(false);
    };
  }, [inputValue]);

  useEffect(() => {
    if (!cities || !departments) return;
    setResults(flatten([cities, departments]));
  }, [cities, departments]);

  return { results };
};

export default useAutocompleteLocationResults;
