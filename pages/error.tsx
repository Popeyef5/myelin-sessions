import { Center, Heading, Text } from "@chakra-ui/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Error = () => {
  return (
    <Center flexGrow="1" padding="150px">
      <Heading>
        Something unexpected happened. If this persists please reach out at
        sessions@myelin.vc
      </Heading>
    </Center>
  );
};

export default Error;
