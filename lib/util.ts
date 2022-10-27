import { User } from ".prisma/client";

export function isProfileEmpty(user: Partial<User>) {
  return (
    !(user.company && user.role) &&
    !user.twitter &&
    !user.github &&
    !user.linkedin &&
    !user.other
  );
}
