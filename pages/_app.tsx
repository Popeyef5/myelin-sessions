import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/common/Layout/Layout";

import type { ComponentStyleConfig } from "@chakra-ui/theme";
import { extendTheme } from "@chakra-ui/react";

const Text: ComponentStyleConfig = {
  baseStyle: {
    color: "white",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: "regular",
  },
};

const Heading: ComponentStyleConfig = {
  baseStyle: {
    color: "white",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: "bold",
  },
};

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

const theme = extendTheme({
  components: {
    Text,
    Heading
  },
  breakpoints
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
