"use client";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.css"

export default function Home() {
  const router = useRouter();

  const { data: user } = useSWR("/auth/users/me", fetcher);

  const { logout, removeTokens } = AuthActions();

  const handleLogout = () => {
    logout()
      .res(() => {
        removeTokens();

        router.push("/");
      })
      .catch(() => {
        removeTokens();
        router.push("/");
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
        <h1 className="text-gray-500 text-2xl font-bold mb-4">Hi, {user?.username}!</h1>
        <p className={styles.p}>Detalhes da sua conta:</p>
        <ul className="mb-4 text-gray-500">
          <li>Usuário: {user?.username}</li>
          <li>Emais: {user?.email}</li>
        </ul>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}