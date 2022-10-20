import { Box, Flex, Spacer, VStack } from "@chakra-ui/layout";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { RequestSeatButton } from "../../components/ui/Buttons/RequestSeatButton";
import { BsArrowUpLeft } from "react-icons/bs";

import seasons from "../../json/seasons.json";
import { Session } from "../../types";
import { SessionInfo } from "../../components/session/SessionInfo";
import { SessionTitle } from "../../components/session/SessionTitle";
import { SessionBanner } from "../../components/session/SessionBanner";
import { Header } from "../../components/common/Header";
import Icon from "@chakra-ui/icon";
import { getAllSessionsPaths } from "../../lib/util";

import Link from "next/link";

interface SessionParams {
  session_id: number;
  season_id: number;
}

interface SessionProps {
  session: Session;
}

export async function getStaticPaths() {
  const paths = getAllSessionsPaths();
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  const session: Session = seasons[0].sessions[params.id]; //TODO: replace by appropriate findSessionByID function
  return {
    props: { session },
  };
};

const Session: NextPage<SessionProps> = ({ session }: SessionProps) => {
  return (
    <>
      <SessionBanner banner={session.banner} />
      <Flex
        flexGrow="1"
        flexDirection="column"
        align="flex-start"
        px={{ base: "20px", md: "100px" }}
        paddingTop={{ base: "0px", lg: "30px" }}
        paddingBottom="50px"
      >
        <Link href="/seasons">
          <Icon as={BsArrowUpLeft} color="white" fontSize="50" zIndex="5" cursor="pointer"/>
        </Link>
        <SessionTitle title={session.title} />
        <Spacer />
        <SessionInfo speakers={session.speakers} date={session.date} />
        <Spacer />
        <RequestSeatButton />
      </Flex>
    </>
  );
};

export default Session;
