import React from "react";

import { DeleteSomething } from "../../../../../components/styledComponent";
import { useAppDispatch } from "../../../../../hooks/reduxHook";
import { adminRemoveComment } from "../../../../../slices/propertiesSlice";
import adminService from "../../../../../services/admin/admin-service";


const DeleteComment = ({ historicalId }): JSX.Element => {
  const dispatch = useAppDispatch();

  const adminDeleteComment = async (historicalId: number) => {
    dispatch(adminRemoveComment({ historicalId }));
    await adminService.deleteComment(historicalId);
  };

  return (
    <DeleteSomething
      id={historicalId}
      handleDelete={adminDeleteComment}
    />
  );
};


export default DeleteComment;
