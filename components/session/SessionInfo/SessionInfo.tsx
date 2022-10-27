import { Institution, Speaker } from ".prisma/client";
import { Text } from "@chakra-ui/layout";
import { formatDate } from "../../../lib/dates";
import { SessionSpeakerList } from "../SessionSpeakerList";

interface InfoProps {
  date: string | undefined;
  speakers?: (Speaker & { institution?: Institution })[];
}

export const SessionInfo = ({ date, speakers }: InfoProps) => {
  const trueDate = new Date(date || "");
  return (
    <>
      <Text fontWeight="100" fontSize={{ base: "12", lg: "20" }} zIndex="10">
        {date ? formatDate(trueDate) : "Date: TBD"}
      </Text>
      <SessionSpeakerList speakers={speakers} />
    </>
  );
};
