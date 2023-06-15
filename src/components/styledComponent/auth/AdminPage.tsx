// Import Third-party Dependencies
import React from "react";

import { store } from "../../../store";
import { useAppSelector } from "../../../hooks/reduxHook";
import { selectUser } from "../../../slices/userSlice";
import { adminFetchUsers } from "../../../slices/adminUsersSlice";
import InfoMessage from "../Infos/InfoMessage";
import WithAuthPage from "./WithAuthPage";

const AdminPage = ({ children }): JSX.Element => {
  const user = useAppSelector(selectUser);
  const isAdmin = user?.role === "ADMIN";

  const usersStatus = useAppSelector((state) => state?.users?.status);

  React.useEffect(() => {
    if (isAdmin && usersStatus === "idle") {
      store.dispatch(adminFetchUsers());
    }
  }, [user]);

  return (
    <WithAuthPage>
      {user && user.role && !isAdmin && (
        <InfoMessage message="Vous n'êtes pas autorisé à accéder à ce contenu." />
      )}
      {isAdmin && (children)}
    </WithAuthPage>
  );
};


export default AdminPage;
