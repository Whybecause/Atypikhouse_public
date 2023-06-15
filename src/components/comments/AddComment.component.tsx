// Import Third-party Dependencies
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Button,
  Box,
  useDisclosure,
  Text,
  useToast,
  Divider
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

// Import Internal Dependencies
import { useAppDispatch } from "../../hooks/reduxHook";
import { addCommentary } from "../../slices/propertiesSlice";
import PropertyRating from "../../components/property/PropertyRating.component";
import CommentMessage from "./CommentMessage";
import CommentContainer from "./CommentContainer";
import CommentInput from "./CommentInput";
import VoteContainer from "./VoteContainer";
import VoteInput from "./VoteInput";
import { MyModal } from "../../components/styledComponent";

const AddComment = ({ propertyId, historicalId, tenantFinishedReservation }) => {
  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const { onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(0);

  const dispatch = useAppDispatch();
  const toast = useToast();

  async function submitComment(data) {
    const canSubmit = [data.content].every(Boolean) || rate !== 0;

    if (canSubmit) {
      setLoading(true);
      const resultAction = await dispatch(addCommentary({ propertyId: propertyId, historicalId: historicalId, rate: rate, content: data.content }));
      unwrapResult(resultAction);
      onClose();
      reset();
      setLoading(false);
    } else {
      toast({
        position: "top",
        status: "error",
        title: "Veuillez ajouter une note ou un commentaire"
      });
      setLoading(false);
    }
  }

  return (
    <>
      <MyModal
        toggle={
          <Button colorScheme="teal" size="md" onClick={onOpen} variant="solid" leftIcon={<ChatIcon />}>Commenter</Button>
        }
        header={
          <>
            <Text color="tomato">
              Laissez vos impresions sur votre séjour
            </Text>
            <Divider />
          </>
        }
        body={
          <>
            <form onSubmit={handleSubmit(submitComment)}>

              <Box d="flex" alignItems="center" className="pointer">
                <VoteContainer>
                  {tenantFinishedReservation.vote !== undefined && tenantFinishedReservation?.vote?.length
                    ? (
                      <PropertyRating property={tenantFinishedReservation?.vote[0]} />
                    )
                    : (<VoteInput rate={rate} setRate={setRate} />)
                  }

                </VoteContainer>
              </Box>

              {tenantFinishedReservation.commentary !== undefined && tenantFinishedReservation?.commentary?.length
                ? (
                  <CommentContainer>
                    <CommentMessage tenantFinishedReservation={tenantFinishedReservation} />
                  </CommentContainer>
                )
                : (
                  <CommentContainer>
                    <CommentInput register={register} errors={errors} />
                  </CommentContainer>
                )}

              <Text size="sm" color="gray" mt="3">Vérifiez votre message ou note avant de valider, vous ne pourrez plus modifier.</Text>

              <Button mr="2" mt="3" type="submit" colorScheme="teal" variant="outline" isLoading={loading}>
                Envoyer
              </Button>

            </form>
          </>
        }
      />
    </>
  );
};

export default AddComment;
