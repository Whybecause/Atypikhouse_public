import React from "react";
import {
  Stack,
  Input,
  useColorModeValue,
  IconButton
} from '@chakra-ui/react';
import { BiMailSend } from 'react-icons/bi';
import ListHeader from '../footer/ListHeader';

import { store } from "../../store";
import * as api from "../../utils/helpers/api-helper";
import { showSuccessModal } from "../../slices/error-successSlice";

const Newsletter: React.FC = (): JSX.Element => {
  const [mail, setMail] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const onChangeMail = e => setMail(e.target.value)

  const onSubscribe = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.default.post("/newsletter/subscribe", { mail });
      store.dispatch(showSuccessModal("Vous êtes inscris à la newsletter !"));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack align={'flex-start'}>
      <ListHeader>Restez connecté</ListHeader>
      <Stack direction={'row'}>
        <Input
          onChange={onChangeMail}
          placeholder={'Votre adresse email'}
          bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
          border={0}
          _focus={{
            bg: 'whiteAlpha.300',
          }}
        />
        <IconButton
          isLoading={loading}
          onClick={onSubscribe}
          bg={useColorModeValue("brand.blue2", "brand.blue1")}
          color="white"
          _hover={{
            bg: useColorModeValue('brand.blue1', "brand.blue2")
          }}
          aria-label="Subscribe"
          icon={<BiMailSend />}
        />
      </Stack>
    </Stack>
  );
}

export default Newsletter;