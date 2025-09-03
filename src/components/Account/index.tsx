"use client";

import { useUser } from "@/hooks/useUser";
import Profile from "./Profile.account";

export default function Account() {
  const { user } = useUser();

  if (!user) {
    return null;
  }
  return (
    <>
      <Profile user={user} />
    </>
  );
}
