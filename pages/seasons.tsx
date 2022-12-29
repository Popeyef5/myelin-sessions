import Icon from "@chakra-ui/icon";
import { Grid, HStack, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { GetStaticProps } from "next";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { SessionCard } from "../components/seasons/SessionCard";
import prisma from "../lib/prismadb";

import { Episode, Season } from ".prisma/client";

interface SeasonsProps {
  seasons: (Season & { episodes: (Episode & { date: string })[] })[];
}

export const getStaticProps: GetStaticProps = async () => {
  const seasons = await prisma.season.findMany({
    include: {
      episodes: { include: { speakers: { include: { institution: true } } } },
    },
  });
  return {
    props: { seasons: JSON.parse(JSON.stringify(seasons)) },
  };
};

const Seasons = ({ seasons }: SeasonsProps) => {
  const [season, setSeason] = useState(seasons[0]);

  return (
    <VStack
      align="left"
      px={{ base: "40px", lg: "100px" }}
      gap={{ base: "36px", lg: "100px" }}
      py={{ base: "75px", lg: "50px" }}
    >
      <Text fontSize={{ base: "20px", lg: "30px" }}>
        Season:{" "}
        <Menu isLazy autoSelect={false}>
          <MenuButton>
            {season.title} <Icon as={FiChevronDown} fontSize="22px" />
          </MenuButton>
          <MenuList bg="#000f14">
            {seasons.map((season) => (
              <MenuItem
                key={season.id}
                isDisabled={season.episodes === undefined}
                _focus={{ bg: "#000f14" }}
                _active={{ bg: "#000f14" }}
              >
                {season.title}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Text>
      <Grid
        templateColumns={{
          base: `1fr`,
          lg: `repeat(2, 1fr)`,
          xl: `repeat(4, 1fr)`,
        }}
        gap="50px"
      >
        {season.episodes
          ?.sort((e1, e2) => {
            const firstDate = new Date(e1.date);
            const secondDate = new Date(e2.date);
            if (firstDate > secondDate) return 1;
            return -1;
          })
          .map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
      </Grid>
    </VStack>
  );
};

export default Seasons;
