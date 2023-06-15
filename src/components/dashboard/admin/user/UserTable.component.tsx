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


const UserTable = ({ children }): JSX.Element => {

  return (
    <Box overflowX="auto">
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Image</Th>
            <Th>Nom</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Propriétés</Th>
            <Th>Commentaires</Th>
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


export default UserTable;
