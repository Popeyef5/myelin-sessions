import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Myelin } from "../../icons/Myelin";

import Link from "next/link";
import { useRouter } from "next/router";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { useBreakpointValue } from "@chakra-ui/media-query";

export const Header = () => {
  const { asPath, pathname, route } = useRouter();
  const { data: session, status } = useSession();

  const bp = useBreakpointValue({ base: "base", lg: "lg" });

  return (
    <Flex
      px={{ base: "40px", lg: "100px" }}
      py="20px"
      position={{ base: "absolute", lg: "relative" }}
      zIndex="10"
      width="100%"
    >
      {bp === "lg" ? <Myelin /> : <></>}
      <Link href="/">
        <Text cursor="pointer" fontSize={{ base: "12px", lg: "16px" }}>
          Myelin Sessions
        </Text>
      </Link>
      <Spacer />
      {status === "loading" ? (
        <Spinner color="white" />
      ) : !session ? (
        <Link href="/login">
          <Button size={{base: "xs", lg: "md"}} >Sign up / Login</Button>
        </Link>
      ) : asPath === "/profile" ? (
        <></>
      ) : (
        <Flex>
          <Link href="/profile">
            <Text
              cursor="pointer"
              fontWeight="bold"
              fontSize={{ base: "12px", lg: "16px" }}
            >
              Profile
            </Text>
          </Link>
          <Text fontSize={{ base: "12px", lg: "16px" }}>&nbsp;/&nbsp;</Text>
          <Text
            cursor="pointer"
            fontWeight="bold"
            onClick={() => signOut()}
            fontSize={{ base: "12px", lg: "16px" }}
          >
            Sign out
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
