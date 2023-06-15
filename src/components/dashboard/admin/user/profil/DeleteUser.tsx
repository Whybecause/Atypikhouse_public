// Import Third-party Dependencies
import React from "react";

// Import Internal Dependencies
import { DeleteSomething } from "../../../../../components/styledComponent";
import { useAppDispatch } from "../../../../../hooks/reduxHook";
import { adminDeleteUser } from "../../../../../slices/adminUsersSlice";
import adminService from "../../../../../services/admin/admin-service";

const DeleteUser = ({ user }): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleDeleteUser = async (id: number) => {
    dispatch(adminDeleteUser(id));
    await adminService.deleteUser(id);
  };

  React.useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <DeleteSomething
      id={user.id}
      handleDelete={handleDeleteUser}
      loading={loading}
    />
  );
};


export default DeleteUser;
