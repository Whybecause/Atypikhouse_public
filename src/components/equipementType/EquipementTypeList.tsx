// Import Third-party Dependencies
import React from "react";
import { SimpleGrid } from "@chakra-ui/react";

// Import Internal Dependencies
import EquipementTypeExcerpt from "./EquipementTypeExcerpt";

interface IEquipementTypeList {
  equipementIds: any;
  isAdmin?: boolean;
}

const EquipementTypeList = ({ equipementIds, isAdmin }: IEquipementTypeList): JSX.Element => {
  return (
    <SimpleGrid p="3" align="center" columns={[2, 3, 8]} spacing="20px">
      {equipementIds?.map(equipementId => (
        <EquipementTypeExcerpt isAdmin={isAdmin} key={equipementId} equipementTypeId={equipementId} />
      ))}
    </SimpleGrid>
  );
};


export default EquipementTypeList;
