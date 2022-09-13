import { Flex, Heading, Spacer, Text } from "@chakra-ui/layout";
import { RequestSeatButton } from "../../ui/Buttons/RequestSeatButton";

interface DescriptionProps {
  title: string;
  description: string;
}

export const SessionDescription = ({
  title,
  description,
}: DescriptionProps) => {
  return (
    <Flex direction="column" align="flex-start">
      <Heading>{title}</Heading>
      <Spacer />
      <Text py="15px">{description}</Text>
      <Spacer />
      <RequestSeatButton />
    </Flex>
  );
};
