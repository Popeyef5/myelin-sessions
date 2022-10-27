import { Box, Flex, FlexProps } from "@chakra-ui/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = ({ children }: FlexProps) => {
  const { asPath, route, pathname } = useRouter();
  return (
    <Flex direction="column" minH="100vh" bg="#000f14">
      <Head>
        <title>Myelin Sessions</title>
        <meta
          name="description"
          content="Intimate encounters about the future with top founders and investors"
        />
        <meta property="og:title" content="Myelin Sessions" />
        <meta property="og:url" content="https://sessions.myelin.vc/" />
        <meta
          property="og:description"
          content="Intimate encounters about the future with top founders and investors"
        />
      </Head>
      <Box flexGrow="1" display="flex" flexDir="column">
        {asPath === "/" ? <></> : <Header />}
        {children}
      </Box>
    </Flex>
  );
};
