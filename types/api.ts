import {
  Application,
  Dare,
  Episode,
  Question,
  Season,
  User,
} from ".prisma/client";

export type FullApplication = Application & {
  userName: string;
  userCompany: string;
  userRole: string;
  seasonTitle: string;
  episodeTitle: string;
};

export type FullUser = User & {
  applications: {
    status: boolean;
    episode: { title: string; season: { title: string } };
  }[];
};

export type FullSeason = Season & {
  episodes: Episode[];
};

export type FullQuestion = Question & {
  upvoted: boolean;
  votes: number;
  drawn: boolean;
};

export type Player = {
  id: string;
  name: string;
  questions: FullQuestion[];
  dares: Dare[];
};
