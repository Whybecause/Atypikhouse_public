import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Flex,
  Stack,
  Heading,
  Button,
  useColorModeValue,
  Image
} from '@chakra-ui/react';

import * as api from "../../../utils/helpers/api-helper";
import { showSuccessModal } from "../../../slices/error-successSlice";
import { store } from "../../../store";

const NewsletterUnsubscribe = () => {
  const router = useRouter();
  const mail = router.query.id || "";
  const [loading, setLoading] = React.useState<boolean>(false);

  const onUnsubscribe = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.default.put(`/newsletter/unsubscribe/${mail}`)
      store.dispatch(showSuccessModal("Vous ne recevrez plus la newsletter"))
    }
    catch (e) {
      console.log(e);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head><title>Se désabonner</title></Head>
      <Flex
        align={'center'}
        justify={'center'}
        py={12}>
        <Stack
          boxShadow={'2xl'}
          bg={useColorModeValue('gray.50', 'gray.700')}
          rounded={'xl'}
          p={10}
          spacing={8}
          align={'center'}>
          <Image src="/content/NewsletterBlock.png" alt="Newsletter" />
          <Stack align={'center'} spacing={2}>
            <Heading
              fontSize={'3xl'}
              color={useColorModeValue('gray.800', 'gray.200')}>
              Désolé de vous voir partir 😢
            </Heading>
          </Stack>
          <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
            <Button
              isLoading={loading}
              onClick={onUnsubscribe}
              rounded={'full'}
              flex={'1 0 auto'}
            >
              Je me désabonne
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  )
}

export default NewsletterUnsubscribe;