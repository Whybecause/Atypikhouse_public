// Import Third-party Dependencies
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";

// Import Internal Dependencies
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import { createEquipType, IEquip } from "../../../../slices/equipementsSlice";
import { AddButton, MyInput, MyModal } from "../../../../components/styledComponent";
import { selectHostIds } from "../../../../slices/propertiesSlice";
import { addMessage } from "../../../../slices/messagesSlice";
import * as api from "../../../../utils/helpers/api-helper";
import { capitalizeFirstLetter } from "../../../../utils/helpers/string.helper";
import HandleImageUpload from "../../../../components/uploader/HandleImages";


const CreateEquipForm = (): JSX.Element => {
  const [base64, setBase64] = React.useState<string>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IEquip>();

  const [closeModal, setCloseModal] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const hostIds = useAppSelector(selectHostIds);

  async function sendMsgToHosts(hostId) {
    const res = await dispatch(addMessage({
      id: hostId,
      content: "Information : De nouveaux équipements sont disponibles pour vos propriétés"
    }));

    await api.default.post("/pusher", { ...res.payload.result, channel: `${hostId}` });
  }

  const canSubmit = [base64].every(Boolean);

  const handleCreateEquipType = async (data: IEquip) => {
    const formData = {
      label: capitalizeFirstLetter(data.label)
    };

    await dispatch(createEquipType({ data: formData, image: [base64] }));

    hostIds.map(hostId => sendMsgToHosts(hostId));
    reset();
    setBase64(undefined);
    setCloseModal(true);
    setCloseModal(false);
  };

  return (
    <MyModal
      closeModal={closeModal}
      toggle={
        <AddButton
          variant="blue"
          size="sm"
          content="Équipement"
          mb="5"
        />
      }
      body={
        <>
          <HandleImageUpload
            base64={base64}
            setBase64={setBase64}
            loadBtn={true}
            displayPreview={true}
          />
          <form onSubmit={handleSubmit(handleCreateEquipType)}>
            <MyInput value="label"
              type="string"
              id="label"
              label="Nom de l'équipement"
              placeholder="Nom de l'équipement"
              register={register}
              errors={errors}
              required={true}
              maxLength={14}
            />
            <Button
              disabled={!canSubmit}
              isLoading={isSubmitting}
              type="submit"
              size="sm"
              isFullWidth
            >
              Valider
            </Button>
          </form >
        </>
      }
    />
  );
};


export default CreateEquipForm;
