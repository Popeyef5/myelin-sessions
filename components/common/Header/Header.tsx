import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Myelin } from "../../icons/Myelin";

import Link from "next/link";
import { useRouter } from "next/router";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";

export const Header = () => {
  const { asPath, pathname, route } = useRouter();
  const { data: session, status } = useSession();

  return (
    <Flex
      px={{ base: "40px", lg: "100px" }}
      py="20px"
      position={{ base: "absolute", lg: "relative" }}
      zIndex="10"
    >
      <Myelin />
      <Link href="/">
        <Text cursor="pointer">Myelin Sessions</Text>
      </Link>
      <Spacer />
      {status === "loading" ? (
        <Spinner color="white" />
      ) : !session ? (
        <Link href="/login">
          <Button>Sign up / Login</Button>
        </Link>
      ) : asPath === "/profile" ? (
        <></>
      ) : (
        <Flex>
          <Link href="/profile">
            <Text cursor="pointer" fontWeight="bold">
              Profile
            </Text>
          </Link>
          <Text>&nbsp;/&nbsp;</Text>
          <Text cursor="pointer" fontWeight="bold" onClick={() => signOut()}>
            Sign out
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
