import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function useAvatar() {
  const { data: session, update } = useSession();
  const [avatarUrl, setAvatarUrl] = useState(session?.user?.avatarUrl);

  useEffect(() => {
    setAvatarUrl(session?.user?.avatarUrl);
  }, [session?.user?.avatarUrl]);

  const updateAvatar = async (newAvatarUrl: string) => {
    try {
      console.log("updateAvatar", newAvatarUrl);
      await update({ avatarUrl: newAvatarUrl });
      // Update the local state
      setAvatarUrl(newAvatarUrl);
    } catch (error) {
      console.error("Failed to update avatar:", error);
      throw error;
    }
  };

  return { avatarUrl, updateAvatar };
}
