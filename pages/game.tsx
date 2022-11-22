import { Button } from "@chakra-ui/button";
import { Center, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect } from "react";
import useSWR from "swr";
import { AdminGame } from "../components/game/AdminGame";
import { UserGame } from "../components/game/UserGame";
import { useAdmin } from "../hooks/admin";
import { fetcher } from "../lib/api";
import { Player } from "../types/api";
import Link from "next/link";

const Game = () => {
  const { data: session, status, isAdmin } = useAdmin();

  const { data: players, error } = useSWR<Player[]>(
    !session ? null : `/api/game/${session.user.id}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    console.log(players);
  }, [players]);

  return !session || players === undefined ? (
    <Center flexGrow="1">
      <Spinner color="white" size="xl" />
    </Center>
  ) : !players.length ? (
    <Center flexGrow="1">
      <VStack gap="35px">
        <Heading> No current game is being played. </Heading>
        <Link href="/seasons">
          <Button paddingX="25px" paddingY="30px">
            Back to seasons
          </Button>
        </Link>
      </VStack>
    </Center>
  ) : isAdmin ? (
    <AdminGame players={players} />
  ) : (
    <UserGame players={players} />
  );
};

export default Game;
