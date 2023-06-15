// Import Third-party Dependencies
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";

// Import Internal Dependencies
import { useAppDispatch } from "../../../../hooks/reduxHook";
import { editEquipement, IEquip } from "../../../../slices/equipementsSlice";
import {
  IconEdit,
  MyInput,
  MyModal
} from "../../../../components/styledComponent";
import HandleImageUpload from "../../../../components/uploader/HandleImages";
import adminService from "../../../../services/admin/admin-service";


const EditEquip = ({ equip }): JSX.Element => {
  const [base64, setBase64] = React.useState<string>();
  const [closeModal, setCloseModal] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEquip>();

  const dispatch = useAppDispatch();

  const handleEditEquip = async (data: IEquip) => {
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

    dispatch(editEquipement({ id: equip.id, changes: { ...data, ...formImage } }));
    setCloseModal(true);
    await adminService.updateEquip(equip.id, formData);
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
          <form onSubmit={handleSubmit(handleEditEquip)}>
            <MyInput value="label"
              type="string"
              id="label"
              label="Nom de l'équipement"
              placeholder="Nom de l'équipement"
              register={register}
              errors={errors}
              defaultValue={equip?.label}
            />
            <Button size="sm" isFullWidth type="submit">Valider</Button>
          </form>
        </>
      }
    />
  );
};

export default EditEquip;
