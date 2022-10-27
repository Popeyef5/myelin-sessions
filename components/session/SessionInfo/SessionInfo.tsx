import { Institution, Speaker } from ".prisma/client";
import { Text } from "@chakra-ui/layout";
import { SessionSpeakerList } from "../SessionSpeakerList";

interface InfoProps {
  date: Date | null;
  speakers?: (Speaker & {institution?: Institution})[];
}

export const SessionInfo = ({ date, speakers }: InfoProps) => {
  return (
    <>
      <Text fontWeight="100" fontSize={{base: "12", lg: "20"}} zIndex="10">
        {date ? date.toString() : "Date: TBD"}
      </Text>
      <SessionSpeakerList speakers={speakers} />
    </>
  );
};
