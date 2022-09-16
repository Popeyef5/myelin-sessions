import { Flex, Text } from "@chakra-ui/layout";
import { Myelin } from "../../icons/Myelin";

export const Header = () => {
  return (
    <Flex
      px={{ base: "40px", lg: "100px" }}
      py="20px"
      position={{ base: "absolute", lg: "relative" }}
      zIndex="10"
    >
      <Myelin />
      <Text>Myelin Sessions</Text>
    </Flex>
  );
};
