import React from "react";
import { checkRole } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  return <div>{children}</div>;
}
