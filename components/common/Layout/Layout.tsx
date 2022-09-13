import { Box, Flex, FlexProps } from "@chakra-ui/layout";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = ({ children }: FlexProps) => {
  return (
    <Flex direction="column" minH="100vh" bg="black">
      <Header />
      <Box flexGrow="1">
        <main>{children}</main>
      </Box>
      <Footer />
    </Flex>
  );
};
