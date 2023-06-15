// Import External dependencies
import React, { useState } from "react";
import {
  useToast,
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

// Import Internal dependencies
import { useAppSelector } from "../../../hooks/reduxHook";
import { selectUser } from "../../../slices/userSlice";
import * as authService from "../../../services/auth/auth.service";
import { Label, MyModal } from "../../styledComponent";

const DeleteUser: React.FC<any> = () => {
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const user = useAppSelector(selectUser);

  const handleDeleteAccount = async () => {
    setLoading(true);
    if (confirmEmail === user.email) {
      await authService.default.deleteUserAccount();
    }
    else {
      toast({
        position: "top",
        title: "L'email est erronné",
        status: "error",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <MyModal
        toggle={
          <Button isFullWidth mb="2" variant="danger" leftIcon={<WarningIcon />}>Supprimer mon compte</Button>
        }
        header="Êtes-vous sur de vouloir supprimer votre compte ?"
        body={
          <FormControl>
            <Label label="Confirmez votre email" htmlFor="email" isRequired={true} />
            <Input
              focusBorderColor="brand.input"
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              name="email"
              isRequired={true}
              placeholder="Email"
            />
          </FormControl>}
        displayFooter={true}
        cancel={<Button>Non</Button>}
        confirm={
          <Button
            size="sm"
            ml="2"
            onClick={() => handleDeleteAccount()}
            isLoading={loading}
            variant="danger"
          >
            Oui
          </Button>}
      />
    </>
  );
};


export default DeleteUser;
