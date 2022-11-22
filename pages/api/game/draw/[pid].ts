import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]";
import prisma from "../../../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;

  //   const session = await unstable_getServerSession(req, res, authOptions);

  //   if (!(session && session.user.email?.endsWith("myelin.vc"))) {
  //     res.status(401).end();
  //   }

  console.log("In draw", method);

  switch (method) {
    case "GET":
      const playerId = Array.isArray(query.pid) ? query.pid[0] : query.pid;

      if (playerId === undefined) {
        console.log("Bad request");
        res.status(400).end();
        return;
      }

      const gameTimeLB = new Date();
      gameTimeLB.setHours(gameTimeLB.getHours() - 2);
      const gameTimeUB = new Date();
      gameTimeUB.setHours(gameTimeUB.getHours() + 2);

      console.log("Query:", query);

      const player = await prisma.speaker.findFirstOrThrow({
        where: {
          id: playerId,
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
            include: { upvotes: true },
            where: {
              draws: {
                none: {
                  speakerId: playerId,
                  datetime: { gt: gameTimeLB, lt: gameTimeUB },
                },
              },
            },
          },
          dares: {
            where: {
              draws: {
                none: {
                  speakerId: playerId,
                  datetime: { gt: gameTimeLB, lt: gameTimeUB },
                },
              },
            },
          },
        },
      });

      const questions = player.questions.map(({ upvotes, ...q }) => ({
        votes: upvotes.filter((u) => u.speakerId === player.id).length,
        ...q,
      }));

      if (!questions.length || !player.dares.length) {
        res.status(400).end();
        return;
      }

      const question = questions.reduce((pq, cq) =>
        pq.votes >= cq.votes ? pq : cq
      );

      const dare =
        player.dares[Math.floor(Math.random() * player.dares.length)];

      const episode = await prisma.episode.findFirstOrThrow({
        where: { date: { gt: gameTimeLB, lt: gameTimeUB } },
      });

      res.status(200).json({ playerId: player.id, dare, question });

      const datetime = new Date();

      await prisma.questionDraw.create({
        data: {
          episodeId: episode.id,
          questionId: question.id,
          speakerId: player.id,
          datetime,
        },
      });

      await prisma.dareDraw.create({
        data: {
          episodeId: episode.id,
          dareId: dare.id,
          speakerId: player.id,
          datetime,
        },
      });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
