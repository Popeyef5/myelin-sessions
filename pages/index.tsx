import { Button } from "@chakra-ui/button";
import { Center, Heading, Text, VStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Myelin } from "../components/icons/Myelin";
import NextLink from "next/link";

const Home: NextPage = () => {
  return (
    <Center minW="100%" minH="100vh" position="absolute" top="0">
      <VStack gap="30px" padding="25px">
        <Myelin size="sm" />
        <Heading
          fontSize={{ base: "40", md: "60" }}
          textAlign={{ base: "center", md: "left" }}
        >
          Myelin Sessions
        </Heading>
        <Text
          fontSize={{ base: "15", md: "20" }}
          fontWeight="100"
          align="center"
        >
          Myelin Sessions are exclusive, intimate, online encounters with top
          founders and investors.
          <br /> A space to share all those things that you won&apos;t hear about
          anywhere else.
        </Text>
        <NextLink href="/session">
          <Button px="40px" py="25px">
            Join
          </Button>
        </NextLink>
      </VStack>
    </Center>
  );
};

export default Home;
