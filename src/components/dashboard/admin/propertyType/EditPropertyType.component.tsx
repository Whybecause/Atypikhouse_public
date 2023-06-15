import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";

import { useAppDispatch } from "../../../../hooks/reduxHook";
import {
  IconEdit,
  MyInput,
  MyModal,
  MyTextArea } from "../../../../components/styledComponent";
import { editPropertyType, IPropertyType } from "../../../../slices/propertyTypesSlice";
import HandleImageUpload from "../../../../components/uploader/HandleImages";
import adminService from "../../../../services/admin/admin-service";

const EditPropertyType = ({ propertyType }): JSX.Element => {
  const [base64, setBase64] = React.useState<string>(undefined);
  const [closeModal, setCloseModal] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IPropertyType>();

  const dispatch = useAppDispatch();

  const handlePropertyType = async (data: IPropertyType) => {
    let formData;
    let formImage;

    formData = { data };

    if (base64) {
      formData = {
        ...formData,
        image: [base64]
      };
      formImage = {
        image: [
          {
            uri: base64
          }
        ]
      };
    }


    dispatch(editPropertyType({ id: propertyType?.id, changes: { ...data, ...formImage } }));
    setCloseModal(true);
    setCloseModal(false);
    setBase64(undefined);

    await adminService.updatePropertyType(propertyType?.id, formData);
  };

  return (
    <MyModal
      closeModal={closeModal}
      toggle={<IconEdit size="xs" />}
      body={
        <>
          <HandleImageUpload
            base64={base64}
            setBase64={setBase64}
            loadBtn={true}
            displayPreview={true}
          />
          <form onSubmit={handleSubmit(handlePropertyType)}>
            <MyInput value="type"
              type="string"
              id="type"
              label="Nom de l'équipement"
              placeholder="Nom de l'équipement"
              register={register}
              errors={errors}
              defaultValue={propertyType.type}
            />
            <MyTextArea value="description"
              type="string"
              id="description"
              label="Description"
              placeholder="Description du type de logement"
              register={register}
              errors={errors}
              defaultValue={propertyType.description}
            />
            <Button isFullWidth size="sm" type="submit" isLoading={isSubmitting}>Valider</Button>
          </form>
        </>
      }
    />
  );
};


export default EditPropertyType;
