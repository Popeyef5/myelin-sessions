import { Button } from "@chakra-ui/button";
import { Center, Heading, Text, VStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Myelin } from "../components/icons/Myelin";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

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
          <br /> A space to share all those things that you won&apos;t hear
          about anywhere else.
        </Text>
        <Button
          px="40px"
          py="25px"
          onClick={() => {
            router.push("/seasons");
          }}
        >
          Join
        </Button>
      </VStack>
    </Center>
  );
};

export default Home;
