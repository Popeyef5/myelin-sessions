import { Text } from "@chakra-ui/layout";
import { Speaker } from "../../../types";
import { SessionSpeakerList } from "../SessionSpeakerList";

interface InfoProps {
  date: string;
  speakers: Speaker[];
}

export const SessionInfo = ({ date, speakers }: InfoProps) => {
  return (
    <>
      <Text fontWeight="100" fontSize={{base: "12", lg: "20"}} zIndex="10">
        {date}
      </Text>
      <SessionSpeakerList speakers={speakers} />
    </>
  );
};
