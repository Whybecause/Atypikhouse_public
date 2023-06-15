import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Text, Box, Button, AspectRatio } from "@chakra-ui/react";

import { useAppSelector } from "../../hooks/reduxHook";
import { selectSearchedProperties } from "../../slices/propertiesSlice";
import SearchBar from "../../components/search/searchbar.component";
import PropertiesStatus from "../../components/property/PropertiesStatus.component";
import PropertyExcerptSearched from "../../components/property/PropertyExcerptSearched";
import PropertySearchedListContainer from "../../components/property/PropertyListContainer.component";
import SortBy from "../../components/search/SortBy";
import MoreFilters from "../../components/search/MoreFilters";
import MapOnSearch from "../../components/MapOnSearch";

//Can search cities or departments directly from URL if = /search/${ZIPcode} (i.e 77600 for city or 77 for department)
const Search = (): JSX.Element => {
  const router = useRouter();

  const [displayMap, setDisplayMap] = React.useState<boolean>(false);

  const { pid = "", name = "", dateStart = "", dateEnd = "", typeId = "" } = router.query;
  const query = { pid, name, dateStart, dateEnd, typeId };

  const searchResults = useAppSelector((state) => selectSearchedProperties(state, query));
  let filteredResults = searchResults;

  const [filters, setFilters] = React.useState({});
  const [checkedEquipementsIds, setCheckedEquipementsIds] = React.useState([]);
  const [maxPrice, setMaxPrice] = React.useState<number>(0);
  const [guests, setGuests] = React.useState<number>(0);
  const [bedrooms, setBedrooms] = React.useState<number>(0);
  const [beds, setBeds] = React.useState<number>(0);
  const [bathrooms, setBathrooms] = React.useState<number>(0);

  const handleSubmitFilters = e => {
    e.preventDefault();
    const data = {
      checkedEquipementsIds: checkedEquipementsIds,
      maxPrice: maxPrice,
      guests: guests,
      bedrooms: bedrooms,
      beds: beds,
      bathrooms: bathrooms,
    }
    setFilters(data)
  }

  if (filters["checkedEquipementsIds"]?.length) {
    filteredResults = filteredResults
      .filter(result => filters["checkedEquipementsIds"]
        .every(value => result.equipementType
          .some(equipementType => equipementType.id === value)))
  }

  if (filters["maxPrice"] && filters["maxPrice"] !== 0) {
    filteredResults = filteredResults.filter(result => result?.price < filters["maxPrice"])
  }
  if (filters["guests"] && filters["guests"] !== 0) {
    filteredResults = filteredResults.filter(result => result?.equipments?.input?.[0]?.value === filters["guests"])
  }
  if (filters["bedrooms"] && filters["bedrooms"] !== 0) {
    filteredResults = filteredResults.filter(result => result?.equipments?.input?.[1]?.value === filters["bedrooms"])
  }
  if (filters["beds"] && filters["beds"] !== 0) {
    filteredResults = filteredResults.filter(result => result?.equipments?.input?.[2]?.value === filters["beds"])
  }
  if (filters["bathrooms"] && filters["bathrooms"] !== 0) {
    filteredResults = filteredResults.filter(result => result?.equipments?.input?.[3]?.value === filters["bathrooms"])
  }

  const [sortBy, setSortBy] = React.useState<string>();

  if (sortBy === "Ascending Price") {
    filteredResults = filteredResults.sort(function (a, b) { return a.price - b.price })
  }
  if (sortBy === "Descending Price") {
    filteredResults = filteredResults.sort(function (a, b) { return b.price - a.price })
  }
  if (sortBy === "Best Review") {
    filteredResults = filteredResults.sort(function (a, b) { return b.rate - a.rate })
  }

  return (
    <>
      <Head><title>Recherche d'annonces</title></Head>
      <SearchBar />
      <PropertiesStatus property={null}>

        <Box d="flex" flexDir={["column", "row"]} alignItems="center" justifyContent="space-between" pr="2">
          <Text fontWeight="bold" color="gray" p="6">
            {name ? name : "Tous les résultats"} ({filteredResults?.length})
          </Text>
          <Button
            variant="orange"
            onClick={() => setDisplayMap(!displayMap)}
          >
            {displayMap ? "Afficher les logements" : "Afficher la carte"}
          </Button>
          <Box d="flex" alignItems="center">
            <MoreFilters
              checkedEquipementsIds={checkedEquipementsIds}
              setCheckedEquipementsIds={setCheckedEquipementsIds}
              maxPrice={maxPrice}
              guests={guests}
              bedrooms={bedrooms}
              beds={beds}
              bathrooms={bathrooms}
              setGuests={setGuests}
              setMaxPrice={setMaxPrice}
              setBedrooms={setBedrooms}
              setBeds={setBeds}
              setBathrooms={setBathrooms}
              handleSubmitFilters={handleSubmitFilters}
            />
            <SortBy setSortBy={setSortBy} />
          </Box>
        </Box>

        {displayMap
          ? (
            <AspectRatio ratio={16 / 9} h="100vh">
              <MapOnSearch properties={filteredResults} searchedLocation={query.pid} />
            </AspectRatio>
          ) : (
            <PropertySearchedListContainer >
              {filteredResults?.map(property => (
                <PropertyExcerptSearched key={property?.id} propertyId={property?.id} />
              ))}
            </PropertySearchedListContainer>
          )}
      </PropertiesStatus>
    </>
  );
};


export default Search;
