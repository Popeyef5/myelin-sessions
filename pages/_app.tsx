import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/common/Layout/Layout";

import type { ComponentStyleConfig } from "@chakra-ui/theme";
import { extendTheme } from "@chakra-ui/react";

import { SessionProvider } from "next-auth/react";

const Text: ComponentStyleConfig = {
  baseStyle: {
    color: "white",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: "regular",
  },
  variants: {
    profile: {
      fontSize: "20px",
      fontWeight: "regular",
    },
  },
};

const Heading: ComponentStyleConfig = {
  baseStyle: {
    color: "white",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: "bold",
  },
};

const Input: ComponentStyleConfig = {
  baseStyle: {
    field: {
      color: "white",
      fontFamily: "'JetBrains Mono', monospace",
    },
  },
};

const Textarea: ComponentStyleConfig = {
  baseStyle: {
    color: "white",
    fontFamily: "'JetBrains Mono', monospace",
  },
};

const Button: ComponentStyleConfig = {
  variants: {
    login: {
      width: "200px"
    }
  }
}

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const theme = extendTheme({
  components: {
    Text,
    Heading,
    Input,
    Textarea,
    Button
  },
  breakpoints,
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
