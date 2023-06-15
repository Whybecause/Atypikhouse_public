// Import External Dependencies
import React from "react";
import "@fontsource/quicksand/300.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/700.css";
import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import Head from "next/head";

// Import Internal Dependencies
import { store } from "../store";
import Interceptor from "../config/axios-interceptors";
import overrides from "../theme/overrides/index";
import Layout from "../components/layout/layout.component";
import layoutStyle from "../theme/layout";
import { useLoading } from "../hooks/useLoading";

Interceptor.interceptor(store);

function App({ Component, pageProps }: AppProps): JSX.Element {
  const { loading } = useLoading();

  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={overrides}>
        <Head>
          <meta name="application-name" content="Atypik House" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='Atypik House' />
          <meta name='description' content='Location de bien atypique' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#000000' />

          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='apple-touch-icon' href='/icons/icons-144x144.png' />

          {/* Meta for Google Auth */}
          <meta name="google-site-verification"
            content="NC3qFO91GwV-jk_hVY_HgbNRuD_O5JmTAKAeS5-nEoo"
          />
        </Head>
        <Layout>
          {loading
            ? (
              <Box
                h="70vh"
                d="flex"
                alignItems="center"
                justifyContent="center"
                margin="auto"
              >
                <Spinner thickness="4px" size="xl" color="brand.orange1" />
              </Box>
            )
            : (<Component {...pageProps} />)
          }
        </Layout>
        <style jsx global>{layoutStyle}</style>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
