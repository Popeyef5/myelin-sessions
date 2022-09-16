import { Box, Flex, FlexProps } from "@chakra-ui/layout";
import Head from "next/head";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = ({ children }: FlexProps) => {
  return (
    <Flex direction="column" minH="100vh" bg="black">
      <Head>
        <title>Myelin Sessions</title>
        <meta name="description" content="Intimate encounters about the future with top founders and investors" />
        <meta property="og:title" content="short title of your website/webpage" />
        <meta property="og:url" content="https://sessions.myelin.vc/" />
        <meta property="og:description" content="Intimate encounters about the future with top founders and investors" />
      </Head>
      <Box flexGrow="1">
        <main>{children}</main>
      </Box>
    </Flex>
  );
};
