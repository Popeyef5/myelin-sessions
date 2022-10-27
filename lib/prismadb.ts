import { PrismaClient } from "@prisma/client"
import { Episode } from ".prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client

export async function getAllSessionsPaths() {
  const episodes: Episode[] = await client.episode.findMany();
  const paths = episodes.map((episode) => {
    return {
      params: {
        id: episode.slug,
      },
    };
  });

  return paths;
}