import { Dare, Question } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import {
  Center,
  Heading,
  Flex,
  Divider,
  Spacer,
  HStack,
  Box,
} from "@chakra-ui/layout";
import { Tag, TagLabel } from "@chakra-ui/tag";
import { useEffect, useRef, useState } from "react";
import { Roulette } from "../Roulette";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import Icon from "@chakra-ui/icon";
import useSWR from "swr";
import { fetcher } from "../../../lib/api";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/spinner";

interface AdminGameProps {
  players: {
    id: string;
    name: string;
    questions: Question[];
    dares: Dare[];
  }[];
}

interface Draw {
  dare: Dare;
  question: Question;
  playerId: string;
}

export const AdminGame = ({ players }: AdminGameProps) => {
  const router = useRouter();

  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [playerLocked, setPlayerLocked] = useState(false);
  const [singleLock, setSingleLock] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [questionText, setQuestionText] = useState("");

  const [spinQueue, setSpinQueue] = useState(0);

  const spin = async () => {
    let playerIdx = selectedPlayer;
    if (isLoading) return;
    if (!playerLocked && !singleLock) {
      playerIdx = (playerIdx + 1) % players.length;
      setSelectedPlayer(playerIdx);
    }

    setIsLoading(true);
    fetch(`/api/game/draw/${players[playerIdx].id}`)
      .then(async (r) => {
        if (!r.ok) {
          await router.push("/error");
          return;
        }

        const draw: Draw = await r.json();
        console.log(draw);
        setQuestionText(draw.question.text || "");

        setSpinQueue(spinQueue + 1);
        setIsLoading(false);
      })
      .catch(async (e) => {
        await router.push("/error");
      });

    setSingleLock(false);
  };

  return (
    <Flex flexGrow="1" px="100px" py="75px" direction="column">
      <HStack gap="15px">
        {players.map((p, i) => (
          <Tag
            key={i}
            size="lg"
            borderRadius="full"
            paddingX="20px"
            paddingY="10px"
            variant={selectedPlayer === i ? "subtle" : "outline"}
            cursor="pointer"
            onClick={() => {
              setSelectedPlayer(i);
              setSingleLock(true);
            }}
          >
            <TagLabel> {p.name.split(" ")[0]}</TagLabel>
          </Tag>
        ))}
        <Icon
          cursor="pointer"
          fontSize="xl"
          as={playerLocked ? AiFillLock : AiFillUnlock}
          color={playerLocked ? "white" : "whiteAlpha.300"}
          onClick={() => setPlayerLocked(!playerLocked)}
        />
      </HStack>
      <Center flexGrow="1" justifyContent="start" position="relative">
        {isLoading ? (
          <Box position="absolute" left="50%" transform="translateX(-50%)">
            <Spinner color="white" size="xl" />
          </Box>
        ) : (
          <Heading position="absolute">{questionText}</Heading>
        )}
      </Center>
      <Flex alignItems="center" gap="20px">
        <Divider />
        <Heading>or</Heading>
        <Divider />
      </Flex>
      <Flex flexGrow="1">
        <Roulette
          texts={players[selectedPlayer].dares.map((d) => d.text || "")}
          spinQueue={spinQueue}
        />
      </Flex>
      <Flex gap="15px" marginTop="80px">
        <Spacer />
        <Button
          paddingX="50px"
          paddingY="25px"
          onClick={spin}
          isDisabled={isLoading}
        >
          Spin
        </Button>
        <Spacer />
      </Flex>
    </Flex>
  );
};
