// Import Third-party Dependencies
import React from "react";
import { useSession } from "next-auth/client";
import {
  Box,
  SimpleGrid,
  Center
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

// Import Internal Dependencies
import CheckoutModal from "../stripe/checkoutModal";

const PropertyReserveForm = (props): JSX.Element => {
  const [session] = useSession();

  return (
    <>
      <Box p='5' color="white" bg='brand.blue2' className="gradient1-shadow" borderWidth="1px" borderRadius="lg">
        <Center><h3>Choisissez vos dates : {props.price}€ /nuit</h3></Center>
        <Box mt='2' d="flex" justifyContent="center" alignItems="center" >
          {session
            ? (
              <SimpleGrid columns={[1, 3, 3]} spacing={2}>
                <Box>
                  <DatePicker
                    className="datepickerInput"
                    dateFormat="dd / MM / yy"
                    selected={props.dateStart}
                    onChange={(date) => props.setStartDate(date)}
                    minDate={addDays(new Date(), 1)}
                    placeholderText="Date de début"
                    excludeDates={props.searchedPropertyUnavailableDates}
                  />
                </Box>
                <Box>
                  <DatePicker
                    className="datepickerInput"
                    dateFormat="dd / MM / yy"
                    selected={props.dateEnd}
                    onChange={(date) => props.setEndDate(date)}
                    minDate={props.dateStart ? addDays(props.dateStart, 1) : new Date()}
                    placeholderText="Date de fin"
                    excludeDates={props.searchedPropertyUnavailableDates}
                  />
                </Box>
                <CheckoutModal {...props} />
              </SimpleGrid>
            ) : (<p>Connectez-vous pour réserver</p>)}
        </Box>


      </Box>
    </>
  );
};


export default PropertyReserveForm;
