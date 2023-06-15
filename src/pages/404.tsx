import {
  Flex,
  Stack,
  Heading,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from "next/head";
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Page introuvable</title>
      </Head>
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
          <Stack align={'center'} spacing={2}>
            <Heading
              fontSize={'3xl'}
              color={useColorModeValue('gray.800', 'gray.200')}>
              404 - Oops...Vous vous êtes égaré 👀
            </Heading>
          </Stack>
          <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
            <Button
              onClick={() => router.push("/")}
              rounded={'full'}
              flex={'1 0 auto'}
            >
              Retour à l'accueil
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
