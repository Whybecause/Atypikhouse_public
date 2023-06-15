// Import Third-party Dependencies
import React, { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  IconButton,
  AlertDialog,
  HStack,
  Input,
  Button,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCloseButton,
  useColorModeValue
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { fr } from "date-fns/locale";

// Import Internal Dependencies
import CalendarStyle from "./Calendar.style";
import { dateLang } from "../../../utils/helpers/dates-helper";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHook";
import {
  selectHostHistoricalByPropertyId,
  addUnavailableDates,
  deleteReservation
} from "../../../slices/propertiesSlice";
import { MyModal } from "../../../components/styledComponent";
import historicalService from "../../../services/historical/historical.service";

const locales = {
  "fr": fr
};

const localizer = dateFnsLocalizer({
  format, parse, startOfWeek, getDay, locales
});

const CalendarByProperty = ({ propertyId }): JSX.Element => {
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [historicalId, setHistoricalId] = useState<number>();
  const [eventTitle, setEventTitle] = useState<string>();

  const [showAddUnavailableDates, setShowAddUnavailableDates] = useState(false);
  const [showRemoveUnavailableDates, setShowRemoveUnavailbleDates] = useState(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const historical = useAppSelector((state) => selectHostHistoricalByPropertyId(state, propertyId));

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const modalColor = useColorModeValue("brand.dark", "white");


  const handleSelectSlot = ({ start, end }) => {
    setShowAddUnavailableDates(true);
    setShowRemoveUnavailbleDates(false);
    setDateStart(start);
    setDateEnd(end);
  };

  const handleSelectEvent = (event, e) => {
    if (event.title == "Indisponible") {
      setShowRemoveUnavailbleDates(true);
      setHistoricalId(event.id);
    }
    else {
      setIsOpen(true);
      setEventTitle(event.title);
    }
  };

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.hexColor,
      color: "white",
    };
    return {
      style: style
    };
  };

  const submitUnavailablesDates = async e => {
    e.preventDefault();
    setIsAdding(true);
    const data = {
      dateStart: dateStart,
      dateEnd: dateEnd,
      price: 0
    };
    const resultAction = await dispatch(addUnavailableDates({ id: propertyId, ...data }));
    unwrapResult(resultAction);
    setShowAddUnavailableDates(false);
    setIsAdding(false);
  };

  const removeUnavailableDates = async e => {
    e.preventDefault();

    dispatch(deleteReservation(historicalId));
    setShowRemoveUnavailbleDates(false);

    await historicalService.deleteReservation(historicalId);
  };

  return (
    <>
      <MyModal
        size="full"
        toggle={<IconButton aria-label="Calendar" icon={<CalendarIcon />} />}
        header="Gestion des disponibilités"
        body={
          <>
            {showAddUnavailableDates && (
              <HStack p="2" mb="5">
                <Input borderColor="brand.input" type="text" readOnly value={dateLang(dateStart, "DD MMM YYYY")} maxW="150px" />
                <Input borderColor="brand.input" type="text" readOnly value={dateLang(dateEnd, "DD MMM YYYY")} maxW="150px" />
                <Button onClick={submitUnavailablesDates} isLoading={isAdding} variant="danger">
                  Rendre indisponible
                </Button>
              </HStack>
            )}
            {showRemoveUnavailableDates && (
              <Button onClick={removeUnavailableDates} mb="5">
                Rendre disponible</Button>
            )}
            <Calendar
              selectable
              views={["month", "agenda"]}
              localizer={localizer}
              culture={"fr"}
              events={historical}
              startAccessor="start"
              endAccessor="end"
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={eventStyleGetter}
              style={{ height: "85vh" }}
            />
          </>
        }
      />
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader color={modalColor}>{eventTitle}</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogFooter><Button variant="light" ref={cancelRef} onClick={onClose}>Fermer</Button></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <style jsx global>
        {CalendarStyle}
      </style>
    </>
  );
};

export default CalendarByProperty;
