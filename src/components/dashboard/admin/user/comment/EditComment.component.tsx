// Import Third-party Dependencies
import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";

// Import Internal Dependencies
import { MyTextArea } from "../../../../../components/styledComponent";
import { useAppDispatch } from "../../../../../hooks/reduxHook";
import { adminEditComment, ICommentRate } from "../../../../../slices/propertiesSlice";
import adminService from "../../../../../services/admin/admin-service";

const EditComment = ({ review }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICommentRate>();

  const dispatch = useAppDispatch();

  const handleEditComment = async (data: ICommentRate) => {
    const formData = {
      historicalId: review?.historicalId,
      ...data,
    };

    dispatch(adminEditComment({ id: review?.historicalId, data: formData }));
    await adminService.updateComment(review?.commentary?.id, formData);
  };

  return (
    <form onSubmit={handleSubmit(handleEditComment)}>
      <Box d="flex" justifyContent="space-between">
      </Box>

      {review?.commentary  && (
        <MyTextArea value="content"
          type="text"
          id="content"
          defaultValue={review?.commentary?.content}
          required={true}
          displayStar={false}
          register={register}
          errors={errors}
        />
      )}

      <Button isFullWidth type="submit" size="xs">Valider</Button>
    </form>
  );
};


export default EditComment;
