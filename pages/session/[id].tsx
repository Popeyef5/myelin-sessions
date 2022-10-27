import { Box, Flex, Spacer, VStack } from "@chakra-ui/layout";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { RequestSeatButton } from "../../components/ui/Buttons/RequestSeatButton";
import { BsArrowUpLeft } from "react-icons/bs";

import { SessionInfo } from "../../components/session/SessionInfo";
import { SessionTitle } from "../../components/session/SessionTitle";
import { SessionBanner } from "../../components/session/SessionBanner";
import Icon from "@chakra-ui/icon";
import { getAllSessionsPaths } from "../../lib/prismadb";

import Link from "next/link";
import { Application, Episode, PrismaClient, Speaker } from ".prisma/client";

import { useRouter } from "next/router";

interface SessionParams {
  session_id: number;
  season_id: number;
}

interface EpisodeProps {
  episode?: Episode & {speakers?: Speaker[]} & {applications?: Application[]};
}

export async function getStaticPaths() {
  const paths = await getAllSessionsPaths();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { props: { episode: null } };
  const prisma = new PrismaClient();
  let slug = Array.isArray(params.id) ? params.id[0] : params.id;
  const episode = await prisma.episode.findUnique({ where: { slug }, include: {applications: true, speakers: {include: {institution: true}}} });
  return {
    props: { episode },
  };
};

const Session: NextPage<EpisodeProps> = ({ episode }: EpisodeProps) => {
  const router = useRouter();
  if (!episode) {
    router.push("/seasons");
    return <></>;
  }

  return (
    <>
      <SessionBanner banner={episode.banner!} />
      <Flex
        flexGrow="1"
        flexDirection="column"
        align="flex-start"
        px={{ base: "20px", md: "100px" }}
        paddingTop={{ base: "0px", lg: "30px" }}
        paddingBottom="50px"
      >
        <Link href="/seasons">
          <Icon
            as={BsArrowUpLeft}
            color="white"
            fontSize="50"
            zIndex="5"
            cursor="pointer"
          />
        </Link>
        <SessionTitle title={episode.title} />
        <Spacer />
        <SessionInfo speakers={episode.speakers} date={episode.date} />
        <Spacer />
        <RequestSeatButton episode={episode} />
      </Flex>
    </>
  );
};

export default Session;
