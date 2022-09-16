import {
  HStack,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/layout";
import { Speaker } from "../../../types";
import NextLink from "next/link";
import { Avatar } from "@chakra-ui/avatar";

interface SpeakerBulletProps {
  s: Speaker;
}

const SpeakerBullet = ({ s }: SpeakerBulletProps) => {
  return (
    <HStack>
      <Avatar src={s.picture ? s.picture : ""} size={{base: "sm", lg: "md"}}/>
      <Text zIndex="10">
        {s.name}
        {s.role ? ", " + s.role : ""}
        {s.institution ? " @ " : ""}
        {s.institution ? (
          <NextLink href={s.institution.site} passHref target="_blank">
            <Link
              target="_blank"
              rel="noreferrer nooprener"
              borderBottom="solid 1px white"
              _hover={{
                textDecorationLine: false,
              }}
            >
              {s.institution.name}
            </Link>
          </NextLink>
        ) : (
          <></>
        )}
      </Text>
    </HStack>
  );
};

interface SpeakerListProps {
  speakers: Speaker[];
}

export const SessionSpeakerList = ({ speakers }: SpeakerListProps) => {
  return (
    <VStack
      align="flex-start"
      paddingTop={{ base: "5px", lg: "15px" }}
      gap="5px"
    >
      <Text fontWeight="400" fontSize={{ base: "20", lg: "25" }} zIndex="10">
        {" "}
        Speakers:{" "}
      </Text>
      <VStack align="flex-start" pt="15px" gap="15px">
        {speakers.map((s, i) => {
          return <SpeakerBullet s={s} key={i} />;
        })}
      </VStack>
      {/* <UnorderedList paddingLeft={{ base: "5", lg: "20" }} spacing="5">
        {speakers.map((s, i) => {
          return (
            <ListItem
              key={i}
              color="white"
              fontWeight="300"
              fontFamily="'JetBrains Mono', monospace"
              fontSize={{ base: "15", lg: "20" }}
            >
              {s.name}
              {s.role ? " - " + s.role : ""}
              {s.institution ? " @ " : ""}
              {s.institution ? (
                <NextLink href={s.institution.site} passHref target="_blank">
                  <Link
                    target="_blank"
                    rel="noreferrer nooprener"
                    borderBottom="solid 1px white"
                    _hover={{
                      textDecorationLine: false,
                    }}
                  >
                    {s.institution.name}
                  </Link>
                </NextLink>
              ) : (
                <></>
              )}
            </ListItem>
          );
        })}
      </UnorderedList> */}
    </VStack>
  );
};
