import Icon from "@chakra-ui/icon";
import { Center, HStack, Text } from "@chakra-ui/layout";
import { FiPlay } from "react-icons/fi";

interface GeneralProps {
  date: string;
}

export const SessionGeneral = ({ date }: GeneralProps) => {
  return (
    <Center w="100%" h="75px" bg="#1d1d1d" borderRadius="10px" padding="25px">
      <HStack>
        <Icon as={FiPlay} color="#8f8f8f" />
        <Text color="#8f8f8f">Premieres: {date}</Text>
      </HStack>
    </Center>
  );
};
