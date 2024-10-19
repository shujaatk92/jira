"use client";

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current"
import { useLogout } from "@/features/auth/api/use-logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data, isLoading } = useCurrent();
  const { mutate } = useLogout();
  const router = useRouter();

  useEffect( () => {
    if(!data && !isLoading){
      router.push("/sign-in")
    }
  }, [data, isLoading]);

  return (
   <div className="">
    Only visible to online users!
    <Button onClick={() => mutate()}>
      Logout
    </Button>
   </div>
  );
}
