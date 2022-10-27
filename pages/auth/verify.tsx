import { Center, Heading, Text } from "@chakra-ui/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Verify = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
    return <></>;
  }

  return (
    <Center flexGrow="1">
      <Heading>Check you email.</Heading>
    </Center>
  );
};

export default Verify;
