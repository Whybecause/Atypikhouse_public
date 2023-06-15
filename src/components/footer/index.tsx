import React from "react";
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Avatar
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

import { MyModal } from "../styledComponent";
import MentionsLegales from "./MentionsLegales";
import CGS from "./CGS";
import SocialButton from "./SocialButton";
import Newsletter from "./Newsletter";
import ListHeader from "./ListHeader";

const Footer = () => {

  return (
    <Box as="footer"
      bg={useColorModeValue("brand.blue1", "brand.blue2")}
      color="white"
      position="absolute"
      bottom="0"
      w="100%">
      <Container as={Stack} maxW={'6xl'} py={10}
        height={["38rem", "25rem", "15rem"]}
      >
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Avatar
                src="/icons/icons-512x512.png"
                alt="logo"
                width="60px"
                height="60px"
                className="pointer"
              />
            </Box>
            <Text fontSize={'sm'}>
              © 2021 Atypikhouse. Tous droits réservés
            </Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Entreprise</ListHeader>
            <Link href={'/atypikhouse'}>A propos</Link>
            <MyModal
              toggle="Nous contacter"
              header="Nous contacter"
              body="atypikhouse.contact@gmail.com"
            />
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <MyModal
              size="full"
              toggle={
                <Box
                  as="a"
                  color="brand.light">
                  Mentions légales
                </Box>
              }
              body={<MentionsLegales />}
            />
            <MyModal
              size="full"
              toggle={
                <Box
                  as="a"
                  color="brand.light">
                  Conditions générales de service
                </Box>
              }
              body={<CGS />}
            />
          </Stack>
          <Newsletter />
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Footer;
