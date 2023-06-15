// Import Third-party Dependencies
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Select,
  Stack,
  Icon,
  Button
} from "@chakra-ui/react";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";
import dayjs from "dayjs";

// Import Internal Dependencies
import searchStyle from "./search.style";
import { useUserInput } from "../../hooks/useSearch";
import { useAppSelector } from "../../hooks/reduxHook";
import {
  selectPropertyTypeById,
  selectPropertyTypesOtherThanCurrent
} from "../../slices/propertyTypesSlice";
import { selectNumberOfPropertiesByPropertyType } from "../../slices/propertiesSlice";
import { MyModal } from "../styledComponent";
import InputWithAutocomplete from "./InputWithAutocomplete";
import useAutocompleteLocationResults from "../../hooks/useAutocompleteLocationResults";
import useAutocompleteSelection from "../../hooks/useAutocompleteSelection";

const OptionsPropertyType = ({ propertyType }): JSX.Element => {
  const { id: typeId } = propertyType;
  const numberOfPropertiesByType = useAppSelector((state) => selectNumberOfPropertiesByPropertyType(state, typeId));

  return (
    <option key={propertyType?.id} value={propertyType?.id}>
      {`
      ${propertyType?.type}
      ${numberOfPropertiesByType?.length ? `(${numberOfPropertiesByType?.length})` : ""}
      `}
    </option>
  );
};

const SearchBar = (): JSX.Element => {
  const router = useRouter();
  const userInput = useUserInput(router.query.name || "");
  const [hasSelected, setHasSelected] = useState<boolean>(false);
  const { results } = useAutocompleteLocationResults(userInput.value, hasSelected);
  const resultsSelection = useAutocompleteSelection(results);

  const [code, setCode] = useState(router.query.pid || "");
  const [dateStart, setStartDate] = useState(null);
  const [dateEnd, setEndDate] = useState(null);
  const [propertyTypeId, setPropertyTypeId] = useState(router.query.typeId || "");

  const selectedPropertyType = useAppSelector((state) => selectPropertyTypeById(state, propertyTypeId.toString()));

  const onChangeType = e => setPropertyTypeId(e.target.value);
  const onChangeStartDate = (date) => setStartDate(date);
  const onChangeEndDate = (date) => setEndDate(date);

  //si le champ de recherche est déjà rempli lors du render (genre après une 1ere recherche), on refetch pas l"API geo et on bloque pas la possibilité de rechercher à nouveau
  React.useEffect(() => {
    if (userInput.value) {
      setHasSelected(true);
    }
  }, []);

  const canSearch = () => {
    if (userInput.value.length && !hasSelected) {
      return false;
    }
    if ([dateStart].every(Boolean) && ![dateEnd].every(Boolean)) {
      return false;
    }
    if (![dateStart].every(Boolean) && [dateEnd].every(Boolean)) {
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    if (router.query.dateStart && router.query.dateStart.toString() !== undefined) {
      setStartDate(new Date(router.query.dateStart.toString()));
    }
    if (router.query.dateEnd && router.query.dateEnd.toString() !== undefined) {
      setEndDate(new Date(router.query.dateEnd.toString()));
    }
  }, []);

  const onSubmitSearch = () => {
    router.push({
      pathname: "/search/[pid]",
      query: {
        pid: userInput.value ? code : "France",
        name: userInput.value,
        dateStart: dateStart ? dayjs(dateStart).format("YYYY-MM-DD") : "",
        dateEnd: dateEnd ? dayjs(dateEnd).format("YYYY-MM-DD") : "",
        typeId: propertyTypeId
      }
    });
  };

  useEffect(() => {
    if (resultsSelection.selectedResult !== undefined) {
      userInput.onClick(resultsSelection.selectedResult.nom);
      setCode(resultsSelection.selectedResult.codesPostaux ? resultsSelection.selectedResult.codesPostaux[0] : resultsSelection.selectedResult.code);
      setHasSelected(true);
    }
  }, [resultsSelection.selectedResult]);

  const propertyTypesOtherThanCurrent = useAppSelector((state) => selectPropertyTypesOtherThanCurrent(state, selectedPropertyType?.id));

  return (
    <>
      <MyModal
        toggle={
          <Box className="small-container">
            <Box
              borderRadius="full"
              bg="brand.blue1"
              color="white"
              d="flex"
              alignItems="center"
              justifyContent="center"
              className="pointer"
              h="40px"
              mb="5"
              _hover={{ bg: "brand.blue2" }}
            >
              <SearchIcon mr="3" />
              <Box as="p" fontWeight="bold">Prêt à partir?</Box>
            </Box>
          </Box>
        }
        header="Que cherchez-vous?"
        body={
          <>
            <Stack direction="row" align="center">
              <Icon as={HomeIcon} />
              <Select
                onChange={onChangeType}
              >
                {propertyTypeId && (
                  <option value={propertyTypeId}>{selectedPropertyType?.type}</option>
                )}
                <option value="">Toutes catégories</option>
                {propertyTypesOtherThanCurrent?.map(propertyType => (
                  <OptionsPropertyType key={propertyType.id} propertyType={propertyType} />
                ))}
              </Select>
            </Stack>

            <Stack direction="row" align="center">
              <Icon as={LocationOnIcon} />
              <InputWithAutocomplete
                userInput={userInput}
                hasSelected={hasSelected}
                setHasSelected={setHasSelected}
                results={results}
                resultsSelection={resultsSelection}
              />
            </Stack>

            <Stack direction="row" align="center">
              <Icon as={DateRangeIcon} />
              <Stack w="100%">
                <DatePicker
                  className="datepickerInput"
                  dateFormat="dd / MM / yy"
                  minDate={addDays(new Date(), 1)}
                  placeholderText="Du..."
                  isClearable
                  selected={dateStart}
                  onChange={onChangeStartDate}
                />
              </Stack>
            </Stack>

            <Stack direction="row" align="center">
              <Icon as={DateRangeIcon} />
              <Stack w="100%">
                <DatePicker
                  className="datepickerInput"
                  dateFormat="dd / MM / yy"
                  placeholderText="Au..."
                  isClearable
                  minDate={addDays(dateStart, 1)}
                  selected={dateEnd}
                  onChange={onChangeEndDate}
                />
              </Stack>
            </Stack>

            <Button
              leftIcon={<SearchIcon />}
              aria-label="search"
              disabled={!canSearch()}
              isFullWidth
              mt="3"
              onClick={onSubmitSearch}
            >Rechercher
            </Button>

          </>
        }
      />
      <style jsx global>
        {searchStyle}
      </style>
    </>
  );
};


export default SearchBar;
