import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  useColorModeValue,
  Image
} from '@chakra-ui/react';

export default function Newsletter() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      py={12}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        boxShadow={'2xl'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        p={10}
        spacing={8}
        align={'center'}>
        <Image src = "/content/NewsletterBlock.png" w="100px" h="80px"/>
        <Stack align={'center'} spacing={2}>
          <Heading
            textTransform={'uppercase'}
            fontSize={'3xl'}
            color={useColorModeValue('gray.800', 'gray.200')}>
            Inscription
          </Heading>
          <Text fontSize={'lg'} color={'gray.500'}>
            Inscrivez vous a la Newsletter pour ne rien rater
          </Text>
        </Stack>
        <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
          <Input
            type={'text'}
            placeholder={'john@doe.net'}
            color={useColorModeValue('gray.800', 'gray.200')}
            bg={useColorModeValue('gray.100', 'gray.600')}
            rounded={'full'}
            border={0}
            _focus={{
              bg: useColorModeValue('gray.200', 'gray.800'),
              outline: 'none',
            }}
          />
          <Button
            bg={'blue.400'}
            rounded={'full'}
            color={'white'}
            flex={'1 0 auto'}
            _hover={{ bg: 'blue.500' }}
            _focus={{ bg: 'blue.500' }}>
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}