import { Box, Flex, VStack } from "@chakra-ui/layout";
import type { GetStaticProps, NextPage } from "next";
import { SessionBanner } from "../components/session/SessionBanner";
import { SessionDescription } from "../components/session/SessionDescription";
import { SessionInfo } from "../components/session/SessionInfo";

import sessions from "../json/sessions.json";
import { Session } from "../types";

interface SessionProps {
  session: Session;
}

export const getStaticProps: GetStaticProps = () => {
  const session: Session = sessions[0];
  return {
    props: { session },
  };
};

const Home: NextPage<SessionProps> = ({ session }: SessionProps) => {
  return (
    <VStack align="center">
      <SessionBanner banner={session.banner} />
      <Flex
        direction={["column", "row"]}
        px="15%"
        py={["25px", "75px"]}
        gap={["50px", "15%"]}
      >
        <SessionDescription
          title={session.title}
          description={session.description}
        />  
        <Box flexShrink="0">
          <SessionInfo date={session.date} speakers={session.speakers} />
        </Box>
      </Flex>
    </VStack>
  );
};

export default Home;
