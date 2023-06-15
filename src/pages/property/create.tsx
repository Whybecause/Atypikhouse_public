import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";
import { unwrapResult } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { MySelect, WithAuthPage } from "../../components/styledComponent";
import { ArrowBack, MyInput, MyTextArea } from "../../components/styledComponent/index";
import { EquipDefault, AdressWrapper, EquipementsCheckboxList } from "../../components/property/CreateEditForm";
import equipments from "../../components/equipments.json";
import { selectAllPropertyTypes } from "../../slices/propertyTypesSlice";
import { addNewProperty } from "../../slices/propertiesSlice";
import { adressAddOne } from "../../slices/adressesSlice";
import HandleMultipleImagesUpload from "../../components/uploader/HandleMultiplesImagesUpload";
import { showErrorModal } from "../../slices/error-successSlice";

interface IInputNumbers {
  id: number,
  label: string
}
interface IEquipsDefault {
  inputNumbers: Array<IInputNumbers>
}
interface IProps {
  equipments: IEquipsDefault
}

const AddProperty: React.FC<IProps> = () => {
  const [files, setFiles] = React.useState([]);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, setValue, handleSubmit, formState: { errors }, } = useForm();

  const dispatch = useAppDispatch();

  const propertyTypes = useAppSelector(selectAllPropertyTypes);

  const addProperty = async (data) => {
    const equipIdsWithoutFalse = data.equipementTypeIds.filter(equip => equip !== false);
    const equipementTypeIds = equipIdsWithoutFalse.map(equip => parseInt(equip));

    const formData = {
      ...data,
      equipementTypeIds: equipementTypeIds,
      price: parseInt(data.price),
      propertyTypeId: parseInt(data.propertyTypeId),
      images: files.map(file => file.base64)
    };

    if (!files.length) {
      return dispatch(showErrorModal("Veuillez ajouter des images."));
    }

    try {
      setLoading(true);
      const resultAction = await dispatch(addNewProperty({ ...formData }));
      unwrapResult(resultAction);
      dispatch(adressAddOne(resultAction.payload.result.adress));
      router.push("/dashboard/host");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head><title>Créer une annonce</title></Head>
      <WithAuthPage>
        <Box className="form-container" d="flex" mb="5">
          <Box flex="1"><ArrowBack url="/dashboard/host" /></Box>
          <Box as="h2">Créer une annonce</Box>
          <Box flex="1"></Box>
        </Box>
        <Box className="form-container" mb="5">
          <HandleMultipleImagesUpload
            files={files}
            setFiles={setFiles}
          />
        </Box>
        <form onSubmit={handleSubmit(addProperty)} className="form-container">

          <MySelect value="propertyTypeId"
            label="Choisissez une catégorie"
            required={true}
            register={register}
            errors={errors}
            id="propertyTypeId"
          >
            <option value="">Choisissez une catégorie</option>
            {propertyTypes?.map(propertyType => (
              <option key={propertyType?.id} value={propertyType?.id}>{propertyType.type}</option>
            ))}
          </MySelect>

          <MyTextArea value="name"
            type="text"
            id="name"
            label="Titre de l'annonce"
            placeholder="Entrez un titre"
            required={true}
            maxLength={80}
            register={register}
            errors={errors}
          />

          <MyTextArea value="description"
            type="text"
            id="description"
            label="Description de l'annonce"
            placeholder="Entrez une description"
            required={true}
            register={register}
            errors={errors}
          />

          <AdressWrapper register={register} setValue={setValue} errors={errors} />

          <EquipDefault
            register={register}
            setValue={setValue}
            errors={errors}
            equipInputs={equipments.inputNumbers}
          />

          <EquipementsCheckboxList
            propertyEquipementIds={null}
            register={register}
          />

          <MyInput value="price"
            type="number"
            id="price"
            label="Prix / nuit"
            placeholder="Entrez votre prix"
            required={true}
            register={register}
            errors={errors}
          />

          <Button
            type="submit"
            isLoading={loading}
            isFullWidth
            mt="4"
            mb="1"
          >
            Valider
          </Button>
        </form>
      </WithAuthPage>
    </>
  );
};

export default AddProperty;
