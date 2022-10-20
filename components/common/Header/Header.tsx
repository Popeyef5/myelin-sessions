import { Flex, Spacer, Text } from "@chakra-ui/layout";
import { Myelin } from "../../icons/Myelin";

import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const { asPath, pathname, route } = useRouter();

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
      {asPath === "/profile" ? (
        <></>
      ) : (
        <Link href="/profile">
          <Text cursor="pointer" fontWeight="bold">Profile</Text>
        </Link>
      )}
    </Flex>
  );
};
