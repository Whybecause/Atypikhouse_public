// Import Third-party Dependencies
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Box
} from "@chakra-ui/react";

const ReservationsTable = ({ th1, th2, children }): JSX.Element => {
  return (
    <Box overflowX = "auto">
      <Table>
        <Thead>
          <Tr>
            <Th>{th1}</Th>
            <Th>Début</Th>
            <Th>Fin</Th>
            <Th>Jours</Th>
            <Th>Prix</Th>
            <Th>{th2}</Th>
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </Box>
  );
};


export default ReservationsTable;
