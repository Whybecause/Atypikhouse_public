import React from "react";
import { ReactNode } from 'react';
import { Text } from "@chakra-ui/react";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

  export default ListHeader;
