import { QuestionUpvote } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { filter } from "../../../lib/filter";
import { FullQuestion, Player } from "../../../types/api";

interface QuestionListProps {
  filters?: string[];
  player: Player;
}

export const QuestionList = ({ filters, player }: QuestionListProps) => {
  const router = useRouter();

  filters = filters || [];
  const filteredQuestions = useMemo<FullQuestion[]>(
    () => filter(player.questions, filters!!),
    [player, filters]
  );

  const [isSending, setIsSending] = useState("");

  const { data: session, status } = useSession();

  const upsertUpvote = async (question: FullQuestion) => {
    if (!session) return;
    try {
      const body = {
        userId: session.user.id,
        speakerId: player.id,
        questionId: question.id,
        deleteIf: question.upvoted ? true : false,
      };
      setIsSending(question.id);
      const response = await fetch("/api/game/upvote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        await router.push("/error");
      }

      const newUpvote: QuestionUpvote = await response.json();
      newUpvote.datetime = new Date(newUpvote.datetime);
      newUpvote.deleted = new Date(newUpvote.deleted);
      question.votes += newUpvote.deleted.getFullYear() < 1980 ? 1 : -1;
      question.upvoted = newUpvote.deleted.getFullYear() < 1980 ? true : false;

      setIsSending("");
    } catch (error) {
      console.log(error);
      await router.push("/error");
    }
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>
              <Text>#</Text>
            </Th>
            <Th>
              <Text>Question</Text>
            </Th>
            <Th>
              <Text>Votes</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredQuestions.map((q, i) => (
            <Tr
              key={q.id}
              filter={q.upvoted ? "invert(1)" : "invert(0)"}
              bg={q.upvoted ? "black" : ""}
            >
              <Td>
                <Text>{i + 1}</Text>
              </Td>
              <Td>
                <Text>{q.text || "-"}</Text>
              </Td>
              <Td>
                <Text>{q.votes || "-"}</Text>
              </Td>
              <Td>
                <Button
                  minW="110px"
                  onClick={() => upsertUpvote(q)}
                  disabled={isSending !== "" && isSending !== q.id}
                  isLoading={isSending === q.id}
                >
                  {q.drawn ? "Asked" : q.upvoted ? "Downvote" : "Upvote"}
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
