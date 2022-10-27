import { Application } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  const userId = Array.isArray(body.user) ? body.user[0] : body.user;
  const name = Array.isArray(body.name) ? body.name[0] : body.name;
  const company = Array.isArray(body.company) ? body.company[0] : body.company;
  const role = Array.isArray(body.role) ? body.role[0] : body.role;
  const twitter = Array.isArray(body.twitter) ? body.twitter[0] : body.twitter;
  const github = Array.isArray(body.github) ? body.github[0] : body.github;
  const linkedin = Array.isArray(body.linkedin)
    ? body.linkedin[0]
    : body.linkedin;
  const other = Array.isArray(body.other) ? body.other[0] : body.other;

  if (!userId) {
    res.status(400).end("Missing data in request. User ID must be present.");
    return;
  }

  switch (method) {
    case "PUT":
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          company,
          role,
          twitter,
          github,
          linkedin,
          other,
        },
      });

      res.status(200).send({ message: "User updated correctly" });
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
