// Import Third-party Dependencies
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Tr,
  Th,
  Td,
  Box,
  Icon,
  Button,
  Textarea,
  Center,
  Text
} from "@chakra-ui/react";
import { CloseIcon, ChatIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";

// Import Internal Dependencies
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { getRangeOfDates, dateLang } from "../../../utils/helpers/dates-helper";
import ReservationsTable from "../ReservationsTable.component";
import { MyModal } from "../../../components/styledComponent/index";
import * as emailService from "../../../services/email/email.service";
import { selectUser } from "../../../slices/userSlice";
import { deleteReservation, selectPropertiesById } from "../../../slices/propertiesSlice";
import { isFilled } from "../../../utils/helpers/input-helper";
import historicalService from "../../../services/historical/historical.service";

const ResaHistoExcerpt = ({ histo, propertyId }): JSX.Element => {
  const [message, setMessage] = useState<string>();

  const { email: hostEmail } = useAppSelector(selectUser);
  const property = useAppSelector((state) => selectPropertiesById(state, propertyId));

  const dispatch = useAppDispatch();
  const router = useRouter();
  const onChangeEmail = (e) => setMessage(e.target.value);

  const canSubmit = isFilled(message);

  const onDeleteHistoAndSendEmail = async (e) => {
    e.preventDefault();
    const emailData = {
      emailTo: histo.user.email,
      emailFrom: hostEmail,
      subject: "Annulation de votre réservation sur Atypikhouse",
      message: message,
      city: property?.adress?.city,
      dateStart: dateLang(histo?.dateStart, "DD MMM YYYY"),
      dateEnd: dateLang(histo?.dateEnd, "DD MMM YYYY")
    };
    try {
      dispatch(deleteReservation(histo?.id));
      const resMail = await emailService.default.onHostDeleteTenantResa(emailData);
      if (resMail) {
        await historicalService.deleteReservation(histo?.id);
      }
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <Tr>
      <Th>{property?.adress?.street} {property?.adress?.city}</Th>
      <Td>{dateLang(histo?.dateStart, "DD MMM YYYY")} </Td>
      <Td>{dateLang(histo?.dateEnd, "DD MMM YYYY")} </Td>
      <Td>{getRangeOfDates(histo?.dateStart, histo?.dateEnd).length - 1}</Td>
      <Td>{histo?.price}€</Td>
      <Td>
        <Box as="button"
          d="flex"
          alignItems="center"
          color="blue.500"
          onClick={() => router.push({
            pathname: "/messages/[id]",
            query: { id: histo?.userId, name: histo?.user?.name }
          })}
        >
          <Icon as={ChatIcon} mr="1" />
          <p>{histo?.user?.name}</p>
        </Box>
        {dayjs(histo?.dateStart) > dayjs().startOf("day")
          ? (
            <MyModal
              size="xl"
              toggle={
                <Button
                  mt="3"
                  size="xs"
                  leftIcon={<CloseIcon />}
                  variant="danger">
                  Annuler
                </Button>}
              header="Indiquez au locataire les raisons de votre annulation"
              body={
                <Textarea
                  type="email"
                  id="content"
                  name="mail"
                  focusBorderColor="brand.input"
                  autoFocus
                  onChange={onChangeEmail}
                  required
                />
              }
              displayFooter={true}
              confirm={
                <Button
                  type="submit"
                  onClick={onDeleteHistoAndSendEmail}
                  disabled={!canSubmit}
                >
                  Annuler la réservation
                </Button>}
            />
          ) :
          (null)
        }
      </Td>
    </Tr>
  );
};

const DashboardResaHisto = ({ historical }): JSX.Element => {
  return (
    <>
      {historical?.length ? (
        <ReservationsTable th1="Propriété" th2="Actions">
          {historical?.map((histo) => (
            <ResaHistoExcerpt key={histo?.id} histo={histo} propertyId={histo?.propertyId} />
          ))}
        </ReservationsTable>
      ) : (
        <Center><Text fontWeight="bold">Pas de réservations</Text></Center>
      )}
    </>
  );
};


export default DashboardResaHisto;
