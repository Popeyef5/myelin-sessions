import { StaticImageData } from "next/image";

export interface Institution {
  name: string;
  site: string;
}

export interface Speaker {
  name: string;
  role?: string;
  institution?: Institution;
  picture?: string;
}

export interface Session {
  id: number;
  speakers?: Speaker[];
  title: string;
  date: string;
  banner: string;
}

export interface Season {
  id: number;
  title: string;
  sessions?: Session[];
}