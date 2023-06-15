// Import Third-party Dependencies
import React from "react";
import {
  Box,
  Table,
  Tbody,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";


const PropertyTable = ({ children }): JSX.Element => {

  return (
    <Box overflowX="auto">
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Prix</Th>
            <Th>Réservations</Th>
            <Th>Note</Th>
            <Th>Commentaires</Th>
            <Th>Ville</Th>
            <Th>Description</Th>
            <Th>Supprimer</Th>
          </Tr>
        </Thead>
        <Tbody>
          {children}
        </Tbody>
      </Table>
    </Box>
  );
};


export default PropertyTable;
