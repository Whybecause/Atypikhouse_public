// Import Third-party Dependencies
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  useDisclosure,
  Center,
  Flex,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import dayjs from "dayjs";

// Import Internal Dependencies
import * as config from "../../config/index";
import {
  OpenCheckoutSession,
  CheckoutSessionPayload,
} from "../../services/stripe/stripe.service";
import { formatAmountForDisplay } from "../../utils/helpers/amount-helpers";
import { dateLang, getRangeOfDates } from "../../utils/helpers/dates-helper";
import { getDatesBetweenDates } from "../../utils/helpers/dates-helper";
import { findCommon } from "../../utils/helpers/array-helper";
import { MyModal } from "../styledComponent";

export type CheckoutProps = {
  dateStart: Date;
  dateEnd: Date;
  days: number;
  guests: number;
  price: number;
};

const CheckoutModal = (props): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const { onOpen } = useDisclosure();
  const router = useRouter();
  const propertyId = Number(router.query.id);

  const numberOfDays = getRangeOfDates(props.dateStart, props.dateEnd).length - 1;
  const finalPrice = props.price * numberOfDays;
  const checkoutSessionPayload: CheckoutSessionPayload = {
    amount: finalPrice,
    propertyId: propertyId,
    dateStart: props.dateStart,
    dateEnd: props.dateEnd,
    price: finalPrice
  };


  const proposedDates = getDatesBetweenDates(new Date(props.dateStart), new Date(props.dateEnd));
  const formatedProposedDates = proposedDates.map(date => dayjs(date).format("DD MM YYYY"));
  const formatedUnavailableDates = props.searchedPropertyUnavailableDates.map(date => dayjs(date).format("DD MM YYYY"));

  const canReserve = props.dateStart !== null && props.dateEnd !== null && props.dateStart < props.dateEnd && !findCommon(formatedProposedDates, formatedUnavailableDates);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    await OpenCheckoutSession(checkoutSessionPayload);
  };

  return (
    <MyModal
      toggle={
        <Button variant="orange" onClick={onOpen} disabled={!canReserve}>
          Réserver
        </Button>
      }
      header={<Center>Récapitulatif et paiement</Center>}
      body={
        <>
          <Flex>
            <p>Dates</p>
            <Spacer />
            <p><strong>Du {dateLang(props.dateStart, "DD MMM YYYY")} au {dateLang(props.dateEnd, "DD MMM YYYY")}</strong></p>
          </Flex>
          <Divider mt="2" mb="2" />
          <Flex>
            <p>Durée</p>
            <Spacer />
            <p><strong>{numberOfDays} jours</strong></p>
          </Flex>
          <Divider mt="2" mb="2" />
          <Flex>
            <p>Prix TTC</p>
            <Spacer />
            <p><strong>{formatAmountForDisplay(finalPrice, config.CURRENCY)}</strong></p>
          </Flex>
        </>
      }
      displayFooter={true}
      confirm={
        <>
          <form onSubmit={handleSubmit}>
            <Button
              type="submit"
              onClick={() => handleSubmit}
              isLoading={loading}
            >
              Payer {formatAmountForDisplay(finalPrice, config.CURRENCY)}
            </Button>
          </form>
        </>
      }
    />
  );
};

export default CheckoutModal;