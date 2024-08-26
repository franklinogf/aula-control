"use client";
import { logOutUser } from "@/actions/users";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function LogOutButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        logOutUser();
        router.refresh();
      }}
      variant="destructive"
      className="hover:bg-red-600"
    >
      Cerrar sesion
    </Button>
  );
}
