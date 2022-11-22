import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useAdmin = () => {
  const { data, status } = useSession();

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState<Session | null>(null);
  useEffect(() => {
    if (data) {
      setIsAdmin(data && data.user.email?.endsWith("myelin.vc") ? true : false);
      setAdminData(data)
    }
  }, [data, status]);

  return { data: adminData, status, isAdmin };
};
