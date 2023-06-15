import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  SimpleGrid,
  Divider,
  Center,
  Box,
  Button,
  AspectRatio,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

import { TruncateText } from "../../components/styledComponent/index";
import { useAppSelector } from "../../hooks/reduxHook";
import MyCarousel from "../../components/carousel/carousel.component";
import PropertyRating from "../../components/property/PropertyRating.component";
import PropertyEquipmentsInput from "../../components/property/PropertyEquipmentsInput.component";
import PropertyReserveForm from "../../components/property/PropertyReserveForm.component";
import MyMapComponent from "../../components/MyMap.component";
import {
  selectPropertiesById,
  selectReviewByProperty,
  selectUnavailableDatesByPropertyId
} from "../../slices/propertiesSlice";
import PropertyComments from "../../components/property/PropertyComments";
import EquipementTypeList from "../../components/equipementType/EquipementTypeList";

const SinglePageProperty = (): JSX.Element => {
  const [dateStart, setStartDate] = useState(null);
  const [dateEnd, setEndDate] = useState(null);

  const router = useRouter();
  const propertyId = Number(router.query.id);

  const property = useAppSelector((state) => selectPropertiesById(state, propertyId));
  const reviews = useAppSelector((state) => selectReviewByProperty(state, propertyId));

  const unavailableDates = useAppSelector((state) => selectUnavailableDatesByPropertyId(state, propertyId));
  const images = property?.images["map"](image => image.uri);

  return (
    <>
    <Head><title>Annonce de logement</title></Head>
    <div className="page-container">
      <SimpleGrid columns={[1, 1, 2]} spacing="20px" p="6">
        <MyCarousel images={images} height={["300px", "500px"]}  />
        <div>
          <Box minH="450px">
            <Box as="h3"><Center>{property?.name}</Center></Box>
            <Box mt="2" mb="2" d="flex" justifyContent="space-between">
              <PropertyRating property={property} />
              <PropertyComments reviews={reviews} />
            </Box>
            <PropertyEquipmentsInput property={property} />
            <Box pt="5" textAlign="center">
            <TruncateText content={property?.description} />
            </Box>
          </Box>

          <Button
            verticalAlign="bottom"
            variant="light"
            onClick={() => router.push(`/messages/${property.userId}`)}
            mt="2"
            leftIcon={<ChatIcon />}
          >
            Contacter le propriétaire
          </Button>
        </div>
      </SimpleGrid>

      <Divider />
      <EquipementTypeList equipementIds={property?.equipementType?.map(equip => equip.id)} />

      <Divider />

      <Box p="2">
        <PropertyReserveForm
          dateStart={dateStart}
          dateEnd={dateEnd}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          price={property?.price}
          searchedPropertyUnavailableDates={unavailableDates}
        />
      </Box>
      <Box p='2'>
        <AspectRatio ration={16 / 9} height='500px'>
          <MyMapComponent />
        </AspectRatio>
      </Box>
    </div>
    </>
  );
};


export default SinglePageProperty;
