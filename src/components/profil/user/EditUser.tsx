// Import External dependencies
import React, { useState } from "react";
import {
  Center,
  Box,
  Avatar,
  Input,
  Button,
  Stack
} from "@chakra-ui/react";

// Import Internal dependencies
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { selectUser, updateUser } from "../../../slices/userSlice";
import { AdressesOptions } from "../adresses/AdressesOptions.component";
import HandleImageUpload from "../../uploader/HandleImages";
import userService from "../../../services/user/user.service";
import UseIsGoogle from "../../../hooks/useIsGoogle";
import useUserImage from "../../../hooks/useUserImage";

const EditUser = (): JSX.Element => {
  const [base64, setBase64] = useState<string>(undefined);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [mainAdressId, setMainAdressId] = useState<number>();

  const user = useAppSelector(selectUser);

  const { isGoogle } = UseIsGoogle(user?.id);
  const { userImage } = useUserImage(user, base64);

  const onChangeEmail = e => setEmail(e.target.value);
  const onChangeName = e => setName(e.target.value);

  const dispatch = useAppDispatch();

  const handleUpdateUser = async () => {
    let formData = {};
    let formImage;

    if (name) {
      formData = { ...formData, name };
    }
    if (email) {
      formData = { ...formData, email };
    }
    if (mainAdressId) {
      formData = { ...formData, mainAdressId };
    }
    if (base64) {
      formImage = [base64];
    }

    dispatch(updateUser({ data: formData, image: formImage }));
    await userService.updateCurrentUser({ data: formData, image: formImage });
    setBase64(undefined);
  };

  return (
    <>
      <Center>
        <div className="relative-container">
          <Avatar alt="Image de profil" size="xl" src={userImage} />
          <HandleImageUpload
            base64={base64}
            setBase64={setBase64}
            loadAbsoluteBtn={true}
          />
        </div>
      </Center>

      <Stack p="6" className="small-container">
        <Input
          focusBorderColor="brand.input"
          id="name"
          name="name"
          defaultValue={user?.name}
          onChange={onChangeName}
          required
        />
        {isGoogle
          ? (<p>{user.email}</p>)
          : (
            <Input
              focusBorderColor="brand.input"
              id="email"
              type="email"
              name="email"
              defaultValue={user.email}
              onChange={onChangeEmail}
              required
            />
          )}
      </Stack>

      <Box>
        <AdressesOptions setMainAdressId={setMainAdressId} />
        <Stack>
          <Button onClick={handleUpdateUser} mt="5">Enregistrer le profil</Button>
        </Stack>
      </Box>
    </>
  );
};


export default EditUser;
