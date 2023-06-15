// Import External Dependencies
import React from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

// Import Internal Dependencies
import SearchBar from "../components/search/searchbar.component";
import Jumbo from "../components/home/jumbo.component";
import CTABecomeHost from "../components/home/CTA-become-host";
import CTARent from "../components/home/CTA-rent";
import PropertyTypeList from "../components/dashboard/admin/propertyType/PropertyTypeList.component";
import { InfoMessage } from "../components/styledComponent";

const Index: React.FC = () => {

  return (
    <>
      <Head><title>Accueil</title></Head>
      <InfoMessage mb="5" message="Ce site est un projet d'école, il ne permet pas d'effectuer de vraies réservations." />
      <SearchBar />
      <Jumbo />
      <main className="page-container">
        <CTARent />
        <CTABecomeHost />
        <Box as="h2" mb="3">Trouvez l'inspiration</Box>
        <PropertyTypeList displayScroll={true} />
      </main>
    </>
  );
};


export default Index;
