import seasons from "../json/seasons.json";

export function getAllSessionsPaths() {
  return seasons[0].sessions.map((session) => {
    return {
      params: {
        id: session.id.toString(),
      },
    };
  });
}
