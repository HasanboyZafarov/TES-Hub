import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import type User from "../../types/user";
import axiosInstance from "../api/apiClient";

export function useUser(id: string) {
  const { user: auth } = useAuthStore();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id === "me") return;

    axiosInstance
      .get<User>(`/profile/${id}`)
      .then((res) => setUser(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (id === "me") {
    return {
      user: auth, 
      loading: auth ? false : true,
    };
  }

  return {
    user,
    loading,
  };
}
