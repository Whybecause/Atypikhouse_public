import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  Divider,
  Box,
  Button,
  Image,
  SimpleGrid
} from "@chakra-ui/react";

import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHook";
import {
  adminUpdateProperty,
  selectPropertiesById,
  updateProperty
} from "../../../slices/propertiesSlice";
import { selectUser } from "../../../slices/userSlice";
import { selectAdressById } from "../../../slices/adressesSlice";
import {
  ProtectedPage,
  ArrowBack,
  MyTextArea,
  MyInput,
  MySelect,
  IconDelete,
  ToggleShow
} from "../../../components/styledComponent";
import PropertiesStatus from "../../../components/property/PropertiesStatus.component";
import {
  EquipDefault,
  AdressInfo,
  EquipementsCheckboxList
} from "../../../components/property/CreateEditForm";
import { selectPropertyTypesOtherThanCurrent } from "../../../slices/propertyTypesSlice";
import HandleMultipleImagesUpload from "../../../components/uploader/HandleMultiplesImagesUpload";

const EditProperty = (): JSX.Element => {
  const router = useRouter();
  const propertyId = Number(router.query.id);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [imagesToAdd, setImagesToAdd] = useState([]);
  const [imagesToDel, setImagesToDel] = useState([]);

  const user = useAppSelector(selectUser);

  const property = useAppSelector((state) => selectPropertiesById(state, propertyId));
  const [propertyImages, setPropertyImages] = useState(property?.images);

  const selectedEquipementTypeIds = property?.equipementType.map(equip => equip.id);

  const propertyTypesOtherThanCurrent = useAppSelector((state) => selectPropertyTypesOtherThanCurrent(state, property?.propertyTypeId));

  const adress = useAppSelector((state) => selectAdressById(state, property?.adressId));

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    setPropertyImages(property?.images);
  }, [property]);

  const addImageToDel = (publicID) => {
    setPropertyImages(propertyImages["filter"](image => image.publicID !== publicID));
    setImagesToDel([...imagesToDel, publicID]);
  };

  const onPropertySubmit = async (data) => {
    const equipIdsWithoutFalse = data.equipementTypeIds.filter(equip => equip !== false);
    const equipementTypeIds = equipIdsWithoutFalse.map(equip => parseInt(equip));

    let formData = {};

    formData = {
      data: {
        ...data,
        price: parseInt(data.price),
        propertyTypeId: parseInt(data.propertyTypeId),
        equipementTypeIds: equipementTypeIds,
      }
    };

    if (imagesToAdd?.length) {
      formData = {
        ...formData,
        images: imagesToAdd.map(image => image.base64)
      };
    }
    if (imagesToDel?.length) {
      formData = {
        ...formData,
        imagesToDel
      };
    }
    setImagesToAdd([]);
    setImagesToDel([]);

    if (user?.role === "ADMIN") {
      await dispatch(adminUpdateProperty({ id: propertyId, ...formData }));
    }
    else {
      await dispatch(updateProperty({ id: propertyId, ...formData }));
    }
  };

  return (
    <>
    <Head><title>Modifier la propriété</title></Head>
    <PropertiesStatus property={property}>
      <ProtectedPage user={user} property={property}>
        <Box className="form-container" d="flex" mb="5">
          <Box flex="1"><ArrowBack url="/dashboard/host" /></Box>
          <Box as="h2">Modifier la propriété</Box>
          <Box flex="1"></Box>
        </Box>

        <Box className="form-container" mb="5">
          <HandleMultipleImagesUpload
            files={imagesToAdd}
            setFiles={setImagesToAdd}
          />

          <ToggleShow toggleMessage={`Images actuelles (${propertyImages?.["length"]})`} defaultState={true}>
            <SimpleGrid columns={[4]} spacing={10}>
              {propertyImages?.["map"](image => (
                <Box key={image.id} position="relative">
                  <Image src={image.uri} alt={image.alt} />
                  <IconDelete className="absolute-icon" size="xs"
                    onClick={() => addImageToDel(image.publicID)}
                  />
                </Box>
              ))}
            </SimpleGrid>
          </ToggleShow>

        </Box>

        <form
          className="form-container"
          onSubmit={handleSubmit(onPropertySubmit)}
        >
          <MySelect value="propertyTypeId"
            label="Catégorie"
            required={true}
            register={register}
            errors={errors}
            id="propertyTypeId"
          >
            <option value={property?.propertyType?.id}>{property?.propertyType?.type}</option>
            {propertyTypesOtherThanCurrent?.map(propertyType => (
              <option key={propertyType.id} value={propertyType.id}>{propertyType.type}</option>
            ))}

          </MySelect>
          <MyTextArea value="name"
            type="text"
            id="name"
            label="Titre de l'annonce"
            defaultValue={property?.name}
            required={true}
            register={register}
            errors={errors}
          />
          <MyTextArea value="description"
            type="text"
            id="description"
            label="Description"
            defaultValue={property?.description}
            required={true}
            register={register}
            errors={errors}
          />

          <EquipDefault
            register={register}
            setValue={setValue}
            errors={errors}
            equipInputs={property?.equipments["input"]}
          />
          <Divider mt="5" />

          <EquipementsCheckboxList
            propertyEquipementIds={selectedEquipementTypeIds}
            register={register}
          />

          <Divider mt="5" />

          <Box maxW="200px" mt="5">
            <MyInput value="price"
              type="number"
              id="price"
              label="Prix"
              defaultValue={property?.price}
              required={true}
              register={register}
              errors={errors}
            />
          </Box>

          <Divider mt="5" />

          <AdressInfo adress={adress} />

          <Button
            type="submit"
            isFullWidth
            mt="4"
            mb="1"
            isLoading={isSubmitting}
          >
            Valider
          </Button>
        </form>
      </ProtectedPage>
    </PropertiesStatus>
    </>
  );
};

export default EditProperty;
