import React from "react";
import { Select } from "@chakra-ui/react";

const SortBy = ({ setSortBy }) => {
  const onChangeSort = e => {
    setSortBy(e.target.value);
  }

  return (
    <Select onChange={onChangeSort}>
      <option value="">Trier par</option>
      <option value="Ascending Price">Prix croissant</option>
      <option value="Descending Price">Prix décroissant</option>
      <option value="Best Review">Meilleures notes</option>
    </Select>
  )
}

export default SortBy;

