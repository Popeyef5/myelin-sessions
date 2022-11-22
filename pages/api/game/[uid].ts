import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]";
import prisma from "../../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;

  //   const session = await unstable_getServerSession(req, res, authOptions);

  //   if (!(session && session.user.email?.endsWith("myelin.vc"))) {
  //     res.status(401).end();
  //   }

  switch (method) {
    case "GET":
      const userId = Array.isArray(query.uid) ? query.uid[0] : query.uid;

      const gameTimeLB = new Date();
      gameTimeLB.setHours(gameTimeLB.getHours() - 2);
      const gameTimeUB = new Date();
      gameTimeUB.setHours(gameTimeUB.getHours() + 2);

      const players = await prisma.speaker.findMany({
        where: {
          episodes: {
            some: {
              date: {
                gt: gameTimeLB,
                lt: gameTimeUB,
              },
            },
          },
        },
        include: {
          questions: {
            include: {
              upvotes: {
                where: {
                  deleted: { equals: "1970-01-01T00:00:00.000Z" },
                  datetime: { gt: gameTimeLB, lt: gameTimeUB },
                },
              },
              draws: {
                where: {
                  datetime: { gt: gameTimeLB, lt: gameTimeUB },
                },
              },
            },
          },
          dares: {
            where: {
              draws: { none: { datetime: { gt: gameTimeLB, lt: gameTimeUB } } },
            },
          },
        },
      });

      for (const player of players) {
        for (const question of player.questions) {
          question.upvotes = question.upvotes.filter(
            (u) => u.speakerId === player.id
          );
          question.draws = question.draws.filter(
            (d) => d.speakerId === player.id
          );
        }
      }

      const response = players.map(({ questions: fullQ, ...player }) => ({
        questions: fullQ.map(({ upvotes, draws, ...q }) => ({
          votes: upvotes.length,
          upvoted: upvotes.map((u) => u.userId).includes(userId || ""),
          drawn: draws.length ? true : false,
          ...q,
        })),
        ...player,
      }));

      res.status(200).json(response);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
