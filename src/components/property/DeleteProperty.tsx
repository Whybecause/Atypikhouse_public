// Import External dependencies
import React from "react";

// Import Internal dependencies
import { DeleteSomething } from "../styledComponent";
import { useAppDispatch } from "../../hooks/reduxHook";
import { removeProperty } from "../../slices/propertiesSlice";
import * as propertyService from "../../services/properties/properties-service";

const DeleteProperty = ({ propertyId }): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleDeleteProperty = async (id) => {
    await dispatch(removeProperty(id));
    await propertyService.default.deleteProperty(id);
  };

  return (
    <DeleteSomething
      id={propertyId}
      handleDelete={handleDeleteProperty}
      size="md"
    />
  );
};


export default DeleteProperty;
