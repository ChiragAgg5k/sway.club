"use client";

import { useState } from "react";
import { useToast } from "@/app/_components/ui/use-toast";

export default function SubscribeNewsletter() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) {
          toast({
            title: "Please enter an email",
            description: "You need to enter an email to subscribe",
          });
          return;
        }

        toast({
          title: "Subscribed",
          description: "You have successfully subscribed to our newsletter",
        });

        setEmail("");
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`input input-bordered w-full border-lime-500 bg-secondary text-sm text-foreground/70 focus:border-lime-500 active:border-lime-500`}
        placeholder="Email"
      />
    </form>
  );
}
