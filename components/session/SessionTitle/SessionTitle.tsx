import { Center, Heading } from "@chakra-ui/layout";

interface TitleProps {
  title: string;
}

export const SessionTitle = ({ title }: TitleProps) => {
  return (
    <Center minW={{ base: "100%", lg: "0" }} minH={{base: "100vw", lg: "0"}}>
      <Heading
        maxW={{ base: "85%", md: "90%", lg: "100%" }}
        fontSize={{ base: "38", sm: "50", md: "90", lg: "105", xl: "125", '2xl': "150" }}
        fontWeight="800"
        letterSpacing={{ sm: "-0.25rem", lg: "-0.5rem" }}
        zIndex="3"
      >
        {title}
      </Heading>
    </Center>
  );
};
