// Import Third-party Dependencies
import React from "react";

// Import Internal Dependencies
import { DeleteSomething } from "../../../../../components/styledComponent";
import { useAppDispatch } from "../../../../../hooks/reduxHook";
import adminService from "../../../../../services/admin/admin-service";
import { removeProperty } from "../../../../../slices/propertiesSlice";


const DeleteProperty = ({ id }): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleDeleteProperty = async (id: number) => {
    dispatch(removeProperty(id));
    await adminService.deleteProperty(id);
  };

  return (
    <DeleteSomething
      id={id}
      handleDelete={handleDeleteProperty}
    />
  );
};


export default DeleteProperty;
