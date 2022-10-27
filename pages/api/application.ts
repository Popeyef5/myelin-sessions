import { Application } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  const userId = Array.isArray(body.userId) ? body.userId[0] : body.userId;
  const episodeId = Array.isArray(body.episodeId)
    ? body.episodeId[0]
    : body.episodeId;

  if (!userId || !episodeId) {
    res
      .status(400)
      .end(
        "Missing data in request. Both user ID and episode ID must be present."
      );
    return;
  }

  switch (method) {
    case "POST":
      const application: Application = await prisma.application.upsert({
        where: {
          userId_episodeId: {
            userId,
            episodeId,
          },
        },
        create: {
          userId,
          episodeId,
        },
        update: {},
      });

      res.status(200).json({ ...application });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
