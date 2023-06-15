// Import Third-party Dependencies
import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Text,
  Avatar,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  useColorModeValue,
  useDisclosure,
  FormControl,
  Select
} from "@chakra-ui/react";

// Import Internal Dependencies
import adminService from "../../../../../services/admin/admin-service";
import { Label, MyInput } from "../../../../../components/styledComponent";
import { useAppDispatch } from "../../../../../hooks/reduxHook";
import { adminUpdateUser } from "../../../../../slices/adminUsersSlice";
import { IUser } from "../../../../../slices/userSlice";
import HandleImageUpload from "../../../../../components/uploader/HandleImages";
import UseIsGoogle from "../../../../../hooks/useIsGoogle";
import useUserImage from "../../../../../hooks/useUserImage";

const EditUser = ({ user }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUser>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [base64, setBase64] = React.useState<string>(undefined);

  const roleOptions = ["USER", "ADMIN"];
  const { isGoogle } = UseIsGoogle(user?.id);
  const { userImage } = useUserImage(user, base64);

  const modalColor = useColorModeValue("brand.dark", "white");

  const dispatch = useAppDispatch();

  const handleUpdateUser = async (data: IUser) => {
    let formData = {};
    let formImage;

    if (data.name !== user?.name) {
      formData = { ...formData, name: data.name };
    }
    if (data.email && data.email !== user?.email) {
      formData = { ...formData, email: data.email };
    }
    if (data.role !== user?.role) {
      formData = { ...formData, role: data.role };
    }
    if (base64) {
      formImage = [base64];
    }

    dispatch(adminUpdateUser({
      id: user?.id,
      changes: {
        ...formData,
        customImage: {
          uri: base64
        }
      }
    }));


    onClose();
    await adminService.updateUser(user.id, { data: formData, image: formImage });
    setBase64(undefined);
  };

  const MyTd = ({ children }) => {
    return (
      <Td
        onClick={onOpen}
        _hover={{ color: "brand.input", cursor: "pointer" }}
      >
        {children}
      </Td>
    );
  };

  return (
    <>
      <Td>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent color={modalColor}>
            <ModalCloseButton />
            <ModalHeader>Modifier l'utilisateur</ModalHeader>
            <ModalBody>
              <HandleImageUpload
                base64={base64}
                setBase64={setBase64}
                loadBtn={true}
                displayPreview={true}
              />
              <form onSubmit={handleSubmit(handleUpdateUser)}>

                <MyInput
                  value="name"
                  type="string"
                  id="name"
                  label="Nom"
                  defaultValue={user.name}
                  register={register}
                  errors={errors}
                  required={true}
                />
                {isGoogle ? (
                  <>
                    <Label label="Email" />
                    <Text p="2">{user.email}</Text>
                  </>
                ) : (
                  <MyInput
                    value="email"
                    type="email"
                    id="email"
                    label="Email"
                    defaultValue={user.email}
                    register={register}
                    errors={errors}
                    required={true}
                  />
                )}
                <FormControl id="role" mb="5">
                  <Label label="Role" htmlFor="role" isRequired={true} />
                  <Select
                    name="role"
                    {...register("role")}
                  >
                    <option defaultValue={user.role}>{user.role}</option>
                    {roleOptions
                      .filter(role => role !== user.role)
                      .map(role => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <Button size="sm" type="submit" isFullWidth isLoading={isSubmitting}>Valider</Button>
              </form>
            </ModalBody>
          </ModalContent>
          <ModalFooter>
            <Button>Valider</Button>
          </ModalFooter>
        </Modal>
        <strong>{user.id}</strong>
      </Td>

      <MyTd><Avatar size="xs" alt="profil" src={userImage} /></MyTd>
      <MyTd>{user?.name}</MyTd>
      <MyTd>{user?.email}</MyTd>
      <MyTd>{user?.role}</MyTd>

    </>
  );
};


export default EditUser;
