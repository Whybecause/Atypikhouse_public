// Import Third-party Dependencies
import React from "react";
import {
  Box,
  Divider,
  Stack,
  Avatar,
  Text
} from "@chakra-ui/react";

// Import Internal Dependencies
import { dateLang } from "../../utils/helpers/dates-helper";
import { useAppSelector } from "../../hooks/reduxHook";
import { selectUser } from "../../slices/userSlice";
import DeleteComment from "../../components/dashboard/admin/user/comment/DeleteComment";
import EditComment from "../../components/dashboard/admin/user/comment/EditComment.component";
import PropertyRating from "../../components/property/PropertyRating.component";

const CommentExcerpt = ({ review }): JSX.Element => {
  const user = useAppSelector(selectUser);
  const isAdmin = user?.role === "ADMIN";

  return (
    <Box as="article" mt="5">
      <Divider mb="5" />

      <Box d="flex" justifyContent="space-between">

        <Stack direction="row" align="center">
          <Avatar size="xs" src={review?.userImage} alt="User image" />
          <Text fontWeight="bold">{review?.userName}</Text>
        </Stack>

        {isAdmin && (
          <>
            <a href={`/property/${review?.propertyId}`}>
              (Propriété {review?.propertyId})
            </a>
            <DeleteComment historicalId={review?.historicalId} />
          </>
        )}

      </Box>

      <Stack>
        <Text size="xs" color="gray">{dateLang(review?.commentary?.createdAt, "MM/YYYY")}</Text>
        {review?.vote && (
          <PropertyRating property={review?.vote} />
        )}
        {isAdmin ? (
          <EditComment review={review} />
        ) : (
          <Box>
            <Text mt="2">{review?.commentary?.content}</Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default CommentExcerpt;
