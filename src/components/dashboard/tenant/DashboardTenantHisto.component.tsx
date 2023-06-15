// Import Third-party Dependencies
import React from "react";
import Link from "next/link";
import {
  Tr,
  Text,
  Td,
  Button,
  Stack
} from "@chakra-ui/react";

// Import Internal Dependencies
import { useAppSelector } from "../../../hooks/reduxHook";
import { selectPropertiesById } from "../../../slices/propertiesSlice";
import { getRangeOfDates, dateLang } from "../../../utils/helpers/dates-helper";
import { MyModal } from "../../../components/styledComponent";
import AddComment from "../../../components/comments/AddComment.component";
import ReservationsTable from "../ReservationsTable.component";
import PropertyRating from "../../../components/property/PropertyRating.component";
import CommentContainer from "../../../components/comments/CommentContainer";
import CommentMessage from "../../../components/comments/CommentMessage";
import VoteContainer from "../../../components/comments/VoteContainer";
import { selectPropertyTypeById } from "../../../slices/propertyTypesSlice";

const TenantHistorical = ({ propertyId, tenantFinishedReservation }): JSX.Element => {
  const property = useAppSelector(
    (state) => selectPropertiesById(state, propertyId)
  );
  const propertyType = useAppSelector((state) => selectPropertyTypeById(state, property?.propertyTypeId))

  return (
    <Tr>
      <Td>
        <Text isTruncated>
          <Link href={`/property/${property?.id}`}>
            {`${propertyType?.type} - ${property.adress.city}`}
          </Link>
        </Text>
      </Td>
      <Td>{dateLang(tenantFinishedReservation?.dateStart, "DD MMM YYYY")} </Td>
      <Td>{dateLang(tenantFinishedReservation?.dateEnd, "DD MMM YYYY")} </Td>
      <Td>{getRangeOfDates(tenantFinishedReservation?.dateStart, tenantFinishedReservation?.dateEnd).length - 1}</Td>
      <Td>{tenantFinishedReservation.price}€</Td>
      <Td>
        {tenantFinishedReservation?.commentary?.length && tenantFinishedReservation?.vote?.length ? (
          <MyModal
            toggle={<Button variant="light">Vous avez évalué</Button>}
            size="md"
            header="Votre évaluation"
            body={<Stack>
              <VoteContainer>
                {tenantFinishedReservation?.vote !== undefined ? (
                  <PropertyRating property={tenantFinishedReservation?.vote[0]} />
                ) : (null)}
              </VoteContainer>
              <CommentContainer>
                <CommentMessage tenantFinishedReservation={tenantFinishedReservation} />
              </CommentContainer>
            </Stack>
            }
          />
        ) : (
          <AddComment propertyId={tenantFinishedReservation?.propertyId} historicalId={tenantFinishedReservation?.id} tenantFinishedReservation={tenantFinishedReservation} />
        )}
      </Td>
    </Tr>
  );
};

const DashboardTenantHisto = ({ tenantFinishedReservations }): JSX.Element => {
  return (
    <ReservationsTable th1="Logement" th2="Commentaire">
      {tenantFinishedReservations.map((tenantFinishedReservation) => (
        <TenantHistorical
          key={tenantFinishedReservation.id}
          propertyId={tenantFinishedReservation.propertyId}
          tenantFinishedReservation={tenantFinishedReservation}
        />
      ))}
    </ReservationsTable>
  );
};

export default DashboardTenantHisto;
