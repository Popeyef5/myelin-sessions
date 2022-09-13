import { Avatar } from "@chakra-ui/avatar";
import { HStack, Text, VStack } from "@chakra-ui/layout";
import { Speaker } from "../../../types";

interface SpeakerBulletProps {
  s: Speaker;
}

const SpeakerBullet = ({ s }: SpeakerBulletProps) => {
  return (
    <HStack>
      <Avatar src={s.picture ? s.picture : ""} />
      <Text>
        {s.name}
        {s.role ? ", " + s.role : ""}
        {s.institution ? " @ " + s.institution.name : ""}
      </Text>
    </HStack>
  );
};

interface SpeakerListProps {
  speakers: Speaker[];
}

export const SessionSpeakerList = ({ speakers }: SpeakerListProps) => {
  return (
    <VStack align="flex-start" pt="15px" gap="15px">
      {speakers.map((s, i) => {
        return <SpeakerBullet s={s} key={i} />;
      })}
    </VStack>
  );
};
