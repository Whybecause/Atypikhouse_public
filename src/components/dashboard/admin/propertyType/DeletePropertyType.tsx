// Import Third-party Dependencies
import React from "react";

// Import Internal Dependencies
import { DeleteSomething } from "../../../../components/styledComponent";
import { useAppDispatch } from "../../../../hooks/reduxHook";
import adminService from "../../../../services/admin/admin-service";
import { removePropertyType } from "../../../../slices/propertyTypesSlice";


const DeletePropertyType = ({ id }): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleDeletePropertyType = async (id: number) => {
    dispatch(removePropertyType(id));
    await adminService.deletePropertyType(id);
  };

  return (
    <DeleteSomething
      id={id}
      handleDelete={handleDeletePropertyType}
    />
  );
};


export default DeletePropertyType;
