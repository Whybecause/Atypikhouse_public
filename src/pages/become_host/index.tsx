import React from "react";
import { Box, Center, Stack } from "@chakra-ui/react";
import Head from 'next/head'

const BecomeHost = () => {
  return (
    <>
      <Head>
        <title>Devenir hôte</title>
      </Head>
      <Center>
        <h1>Devenir hôte</h1>
      </Center>
      <Box className="form-container">
        <Box as="h2" mb="3">Comment devenir hôte</Box>
        <Stack direction="column">
        <p>Rien de plus simple, il vous suffit de créer un compte 😊.</p>
        <p>Rendez-vous ensuite dans l'espace propriétaire, et créez votre première annonce !</p>
        <p>Sachez qu'avec ce compte vous pourrez également effectuer des réservations et partir à la découverte de logements atypiques.</p>
        </Stack>

      </Box>
    </>
  )

}
export default BecomeHost;
