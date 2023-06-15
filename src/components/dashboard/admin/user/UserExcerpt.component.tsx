// Import Third-party Dependencies
import React from "react";
import {
  Box,
  Td,
  Tr
} from "@chakra-ui/react";

// Import Internal Dependencies
import { useAppSelector } from "../../../../hooks/reduxHook";
import { selectHostProperties, selectReviewByUser } from "../../../../slices/propertiesSlice";
import { selectUserById } from "../../../../slices/adminUsersSlice";
import TdEditUserModal from "../../../../components/dashboard/admin/user/profil/EditUser";
import DeleteUser from "./profil/DeleteUser";
import PropertyList from "./property/PropertyList.component";
import { MyModal } from "../../../../components/styledComponent";
import CommentList from "../../../../components/comments/CommentList.component";
import { prettifyIf0 } from "../../../../utils/helpers/string.helper";

const UserExcerpt = ({ userId }): JSX.Element => {
  const user = useAppSelector((state) => selectUserById(state, userId));
  const userProperties = useAppSelector((state) => selectHostProperties(state, userId));
  const reviews = useAppSelector((state) => selectReviewByUser(state, userId));

  const isAdmin = user?.role === "ADMIN";
  const hasProperties = Boolean(userProperties?.length);
  const hasComments = Boolean(reviews?.length);

  const TdSelectable = ({ children, isSelectable }) => {
    return (
      <>
        {isSelectable ? (
          <Td _hover={{ color: "brand.input", cursor: "pointer" }}>
            {children}
          </Td>
        ) : (
          <Td>{children}</Td>
        )}
      </>
    );
  };

  return (
    <Tr color={isAdmin && "tomato"}>
      <TdEditUserModal user={user} />
      <TdSelectable isSelectable={hasProperties}>
        <PropertyList user={user} userProperties={userProperties} />
      </TdSelectable>
      <TdSelectable isSelectable={hasComments}>
        <MyModal
          toggle={<Box>{prettifyIf0(reviews?.length)}</Box>}
          header={`Commentaires de ${user.name}`}
          body={<CommentList reviews={reviews} />}
        >
        </MyModal>
      </TdSelectable>
      <Td>
        <DeleteUser user={user} />
      </Td>
    </Tr>
  );
};


export default UserExcerpt;
