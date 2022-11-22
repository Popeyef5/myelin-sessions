import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prismadb";

interface UpvoteBody {
  speakerId: string;
  userId: string;
  questionId: string;
  deleteIf: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = <{ body: UpvoteBody; method: string }>req;

  switch (method) {
    case "POST":
      const { speakerId, userId, questionId, deleteIf } = body;

      if (!userId || !questionId) {
        res
          .status(400)
          .end(
            "Missing data in request. Both user ID and question ID must be present."
          );
        return;
      }

      const upvote = await prisma.questionUpvote.upsert({
        where: {
          questionId_userId_speakerId_deleted: {
            questionId,
            userId,
            speakerId,
            deleted: "1970-01-01T00:00:00.000Z",
          },
        },
        update: { deleted: deleteIf ? new Date() : "1970-01-01T00:00:00.000Z" },
        create: {
          questionId,
          userId,
          speakerId,
          datetime: new Date(),
        },
      });

      res.status(200).json(upvote);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
