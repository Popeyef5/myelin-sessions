import { Dare, Question } from ".prisma/client";
import { Input } from "@chakra-ui/input";
import { HStack, VStack } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FullQuestion } from "../../../types/api";
import { QuestionList } from "../QuestionList";

interface UserGameProps {
  players: {
    id: string;
    name: string;
    questions: FullQuestion[];
    dares: Dare[];
  }[];
}

export const UserGame = ({ players }: UserGameProps) => {
  const [newFilter, setNewFilter] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <VStack gap="20px" align="start" px="100px" py="50">
      <HStack gap="10px">
        <Input
          width="250px"
          variant="outline"
          placeholder="Filter..."
          value={newFilter}
          onChange={(e) => {
            e.preventDefault();
            setNewFilter(e.target.value);
          }}
          onKeyUp={(e) => {
            e.preventDefault();
            if (e.key === "Enter") {
              setFilters([...filters, newFilter]);
              setNewFilter("");
            }
          }}
        />
        <>
          {filters.map((f) => {
            return (
              <Tag
                size="lg"
                key={f}
                borderRadius="full"
                variant="solid"
                colorScheme="whiteAlpha"
              >
                <TagLabel>{f}</TagLabel>
                <TagCloseButton
                  onClick={() => {
                    setFilters(
                      filters.filter((_f) => {
                        return _f !== f;
                      })
                    );
                  }}
                />
              </Tag>
            );
          })}
        </>
      </HStack>
      <Tabs variant="solid-rounded" colorScheme="whiteAlpha" width="100%">
        <TabList>
          {players.map((p) => (
            <Tab key={p.id}>
              {p.name}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {players.map((p) => (
            <TabPanel key={p.id} px="0">
              <QuestionList
                filters={[...filters, newFilter]}
                player={p}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
