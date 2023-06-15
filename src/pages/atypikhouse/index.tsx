import React from "react";
import { Box, Center, Stack } from "@chakra-ui/react";
import Head from "next/head";

const Atypikhouse = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Atypikhouse</title>
      </Head>
      <Center>
        <h1>Atypikhouse</h1>
      </Center>
      <Box className="form-container">
        <Box as="h2" mb="3"> L'origine de Atypikhouse</Box>
        <Stack direction="column">
          <p>Conçue par 3 amis d’enfance, AtypikHouse se voit comme l’avenir du logement
            insolite en France et en Europe.
          </p>
          <p> L’idée de développer le domaine des logements en dehors des logements classique est née d'une passion commune des
            voyages et de l’aventure : dormir à la belle étoile, se créer une cabane dans les
            bois...
          </p>
          <p>
            Avec l’arrivée du Covid et du ressenti grandissant des gens pour changer
            d’air, nous avont décidé de s’associer afin de proposer un service de location
            dépaysant, vous permetant de mettre vos bien en location ou d'en réserver une, via une application mobile ou depuis le site internet.
          </p>
        </Stack>
      </Box>
    </>
  )
}

export default Atypikhouse;
