import "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Or string
    company: string;
    role: string;
    twitter: string;
    github: string;
    linkedin: string;
    other: string;
  }

  interface Session {
    user: {
      id: string;
      name: string?;
      company: string?;
      role: string?;
      twitter: string?;
      github: string?;
      linkedin: string?;
      other: string?;
    };
  }
}
