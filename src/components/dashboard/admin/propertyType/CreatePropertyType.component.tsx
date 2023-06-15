// Import Third-party Dependencies
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";

// Import Internal Dependencies
import { createPropertyType, IPropertyType } from "../../../../slices/propertyTypesSlice";
import {
  AddButton,
  MyInput,
  MyModal
} from "../../../../components/styledComponent";
import { useAppDispatch } from "../../../../hooks/reduxHook";
import HandleImageUpload from "../../../../components/uploader/HandleImages";
import { capitalizeFirstLetter } from "../../../../utils/helpers/string.helper";


const CreatePropertyType = (): JSX.Element => {
  const [base64, setBase64] = React.useState<string>(undefined);
  const [closeModal, setCloseModal] = React.useState<boolean>(false);
  const canSubmit = [base64].every(Boolean);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IPropertyType>();

  const dispatch = useAppDispatch();

  const handleCreatePropertyType = async (data: IPropertyType) => {
    const formatedData = {
      ...data,
      type: capitalizeFirstLetter(data.type)
    };
    const formData = {
      data: formatedData,
      image: [base64]
    };
    await dispatch(createPropertyType(formData));
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
          content="Catégorie"
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

          <form onSubmit={handleSubmit(handleCreatePropertyType)}>
            <MyInput value="type"
              type="string"
              id="type"
              label="Nom"
              placeholder="Nom de la catégorie"
              register={register}
              errors={errors}
              required={true}
              maxLength={25}
            />
            <MyInput value="description"
              type="string"
              id="description"
              label="Description"
              placeholder="Description du type de logement"
              register={register}
              errors={errors}
              required={true}
            />
            <Button
              disabled={!canSubmit}
              isLoading={isSubmitting}
              isFullWidth
              size="sm"
              type="submit">
              Valider
            </Button>
          </form>
        </>
      }
    />
  );
};


export default CreatePropertyType;
