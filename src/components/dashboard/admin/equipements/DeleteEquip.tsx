// Import Third-party Dependencies
import React from "react";

// Import Internal Dependencies
import adminService from "../../../../services/admin/admin-service";
import { useAppDispatch } from "../../../../hooks/reduxHook";
import { DeleteSomething } from "../../../../components/styledComponent";
import { removeEquipement } from "../../../../slices/equipementsSlice";

const DeleteEquip = ({ id }): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleDeleteEquipType = async (id: number) => {
    dispatch(removeEquipement(id));
    await adminService.deleteEquipType(id);
  };

  return (
    <DeleteSomething
      id={id}
      handleDelete={handleDeleteEquipType}
    />
  );
};


export default DeleteEquip;
