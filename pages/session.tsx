import { Box, VStack } from "@chakra-ui/layout";
import type { GetStaticProps, NextPage } from "next";
import { RequestSeatButton } from "../components/ui/Buttons/RequestSeatButton";
import { BsArrowUpLeft } from "react-icons/bs";

import sessions from "../json/sessions.json";
import { Session } from "../types";
import { SessionInfo } from "../components/session/SessionInfo";
import { SessionTitle } from "../components/session/SessionTitle";
import { SessionBanner } from "../components/session/SessionBanner";
import { Header } from "../components/common/Header";

interface SessionProps {
  session: Session;
}

export const getStaticProps: GetStaticProps = () => {
  const session: Session = sessions[0];
  return {
    props: { session },
  };
};

const Session: NextPage<SessionProps> = ({ session }: SessionProps) => {
  return (
    <>
      <Header />
      <SessionBanner banner={session.banner} />
      <VStack
        align="flex-start"
        px={{ base: "20px", md: "100px" }}
        paddingTop={{ base: "0px", lg: "50px" }}
        paddingBottom="50px"
        gap={{ base: "10px", lg: "30px" }}
      >
        {/* <Icon as={BsArrowUpLeft} color="white" fontSize="70" /> */}
        <SessionTitle title={session.title} />
        <SessionInfo speakers={session.speakers} date={session.date} />
        <RequestSeatButton />
      </VStack>
    </>
  );
};

export default Session;
