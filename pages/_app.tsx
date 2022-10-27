import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/common/Layout/Layout";

import type { ComponentStyleConfig } from "@chakra-ui/theme";
import { extendTheme } from "@chakra-ui/react";

import { SessionProvider } from "next-auth/react";
import React, { useEffect, useState } from "react";

import useSWR from "swr";
import { Application } from ".prisma/client";
import Script from "next/script";

export const AppContext = React.createContext<{
  applications: Application[];
  setApplications: (value: Application[]) => void;
}>({ applications: [], setApplications: (value: Application[]) => {} });

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

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
      width: "200px",
    },
  },
};

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
    Button,
  },
  breakpoints,
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const { data } = useSWR<{ result: Application[] }>(
    "/api/application",
    fetcher
  );
  useEffect(() => {
    if (data) {
      setApplications(data.result);
    }
  }, [data]);

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-47T4Q5FSDJ"
      />
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-47T4Q5FSDJ');
      `,
        }}
      />
      <AppContext.Provider value={{ applications, setApplications }}>
        <SessionProvider session={session}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </SessionProvider>
      </AppContext.Provider>
    </>
  );
}

export default MyApp;
