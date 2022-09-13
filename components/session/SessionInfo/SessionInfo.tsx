import { VStack } from "@chakra-ui/layout";
import { Speaker } from "../../../types";
import { SessionGeneral } from "../SessionGeneral";
import { SessionSpeakerList } from "../SessionSpeakerList";

interface InfoProps {
  date: string;
  speakers: Speaker[];
}

export const SessionInfo = ({ date, speakers }: InfoProps) => {
  return (
    <VStack>
      <SessionGeneral date={date} />
      <SessionSpeakerList speakers={speakers} />
    </VStack>
  );
};
