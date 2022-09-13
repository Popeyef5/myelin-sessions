import { Flex, Text } from "@chakra-ui/layout";
import { Myelin } from "../../icons/Myelin";

export const Header = () => {
  return (
    <Flex px="30px" py="20px">
      <Myelin />
      <Text>sessions</Text>
    </Flex>
  );
};
