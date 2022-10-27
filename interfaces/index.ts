export interface Institution {
  id: string;
  name: string;
  site: string;
}

export interface Speaker {
  id: string;
  name: string;
  role?: string;
  institution?: Institution;
  picture?: string;
}

export interface Episode {
  id: string;
  speakers: Speaker[];
  title: string;
  date: string;
  banner: string;
  thumbnail: string;
}

export interface Season {
  id: string;
  title: string;
  episodes: Episode[];
}
