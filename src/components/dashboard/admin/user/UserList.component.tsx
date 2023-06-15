// Import Third-party Dependencies
import React from "react";

// Import Internal Dependencies
import { useAppSelector } from "../../../../hooks/reduxHook";
import { selectUserIds } from "../../../../slices/adminUsersSlice";
import UserExcerpt from "../../../../components/dashboard/admin/user/UserExcerpt.component";
import UserTable from "./UserTable.component";
import { MySpinner } from "../../../../components/styledComponent";

const UserList = (): JSX.Element => {
  const userIds = useAppSelector(selectUserIds);
  const usersStatus = useAppSelector((state) => state.users?.status);

  return (
    <>
      {usersStatus === "loading"
        ? (<MySpinner size="xl" />)
        : (
          <UserTable>
            {userIds?.map((userId) => (
              <UserExcerpt key={userId} userId={userId} />
            ))}
          </UserTable>
        )
      }
    </>
  );
};


export default UserList;
