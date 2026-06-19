import { useEffect, useState } from "react";
import axiosInstance from "../api/apiClient";
import type User from "../../types/user";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axiosInstance
      .get<User>("/profile/me")
      .then((res) => setUser(res.data))
      .catch(console.error);
  }, []);

  return user;
};

export default useAuth;
