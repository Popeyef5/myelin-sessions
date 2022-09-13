import { Center, Flex, FlexProps, Link, Spacer, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import { FiTwitter } from "react-icons/fi";
import NextLink from "next/link";

export const Footer = (props: FlexProps) => {
  return (
    <Flex align="flex-end" px="20px" py="10px">
      <Spacer />
      <Center px="25px">
        <NextLink href="https://twitter.com/myelinvc" passHref target="_blank">
          <Link target="_blank">
            <Icon as={FiTwitter} color="white" />
          </Link>
        </NextLink>
      </Center>
      <Text fontSize="sm">© Myelin 2022</Text>
    </Flex>
  );
};
