import React from "react";
import {
  Box, Icon, Center, Checkbox, Button, SimpleGrid, Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react"
import FilterListIcon from '@material-ui/icons/FilterList';

import { MyModal } from "../styledComponent";
import { useAppSelector } from "../../hooks/reduxHook";
import { selectAllEquipements } from "../../slices/equipementsSlice";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

const MoreFilters = ({
  checkedEquipementsIds,
  maxPrice,
  guests,
  bedrooms,
  beds,
  bathrooms,
  setCheckedEquipementsIds,
  setGuests,
  setMaxPrice,
  setBedrooms,
  setBeds,
  setBathrooms,
  handleSubmitFilters
}) => {
  const equipements = useAppSelector(selectAllEquipements);
  const [closeModal, setCloseModal] = React.useState<boolean>(false);

  const onChangePrice = (maxPrice) => setMaxPrice(maxPrice)

  React.useEffect(() => {
    setCloseModal(false);
  }, [closeModal]);

  const resetFilters = () => {
    setGuests(0);
    setMaxPrice(0);
    setBedrooms(0);
    setBeds(0);
    setBathrooms(0);
    setCheckedEquipementsIds([])
  }

  return (
    <MyModal
      closeModal={closeModal}
      size="lg"
      header={<Center>Filtres</Center>}
      toggle={
        <Box d="flex" p="5" className="pointer">
          <Icon as={FilterListIcon} />
          <p>Filtres</p>
        </Box>
      }
      body={
        <form onSubmit={handleSubmitFilters} style={{ overflow: "hidden" }}>

          <Box as="section" overflow="auto" h="50vh" className="custom-scrollbar">
            <Box as="h2" mb="5">Équipements</Box>

            <SimpleGrid columns={[2, 3, 4, 4]} spacingY="10px">
              {equipements?.map((equipement, index) => (
                <Box d="flex" key={equipement.id}>
                  <Checkbox
                    isChecked={
                      checkedEquipementsIds.includes(equipement.id)
                    }
                    onChange={(e) => {
                      e.stopPropagation();
                      const i = checkedEquipementsIds.indexOf(equipement.id);
                      if (i > -1) {
                        setCheckedEquipementsIds([
                          ...checkedEquipementsIds.slice(0, i),
                          ...checkedEquipementsIds.slice(index + 1)
                        ]);
                      } else {
                        setCheckedEquipementsIds([
                          ...checkedEquipementsIds,
                          equipement.id
                        ]);
                      }
                    }}
                    mr="2"
                  />
                  <p>{equipement.label}</p>
                </Box>
              ))}
            </SimpleGrid>

            <Divider mt="5" mb="5" />

            <Box as="h2" mb="5">Prix maximum</Box>
            <Box pl="3" pr="3">
              <Slider
                aria-label="price-slider"
                max={500}
                value={maxPrice}
                onChange={onChangePrice}
                focusThumbOnChange={false}
              >
                <SliderTrack bg="red.100">
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize="32px" fontSize="sm" color="brand.dark" children={maxPrice}
                />
              </Slider>
            </Box>

            <Divider mt="5" mb="5" />

            <Box as="h2" mb="5">Capacité d'accueil</Box>

            <Box d="flex" alignItems="center" justifyContent="space-between">
              <h5>Voyageurs</h5>
              <NumberInput
                size="lg" min={0} w="100px" value={guests} onChange={(guests) => setGuests(parseInt(guests))}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>

            <Box d="flex" alignItems="center" justifyContent="space-between">
              <h5>Lits</h5>
              <NumberInput size="lg" min={0} w="100px" value={beds} onChange={(beds) => setBeds(parseInt(beds))}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>

            <Box d="flex" alignItems="center" justifyContent="space-between">
              <h5>Chambres</h5>
              <NumberInput size="lg" min={0} w="100px" value={bedrooms} onChange={(bedrooms) => setBedrooms(parseInt(bedrooms))}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>

            <Box d="flex" alignItems="center" justifyContent="space-between">
              <h5>Salles de bains</h5>
              <NumberInput size="lg" min={0} w="100px" value={bathrooms} onChange={(bathrooms) => setBathrooms(parseInt(bathrooms))}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>

          </Box>

          <Box
            as="footer"
            d="flex"
            justifyContent="space-between"
            mt="5"
          >
            <Button
              type="submit"
              onClick={() => { setCloseModal(true); resetFilters() }}
              leftIcon={<CloseIcon />}
              variant="light"
            >
              Réinitialiser
            </Button>
            <Button
              type="submit"
              leftIcon={<SearchIcon />}
              onClick={() => setCloseModal(true)}
            >
              Rechercher
            </Button>
          </Box>
        </form>
      }
    />
  )
}

export default MoreFilters;
