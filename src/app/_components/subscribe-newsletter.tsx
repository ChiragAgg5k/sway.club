"use client";

import { toast } from "sonner";
import { useState } from "react";

export default function SubscribeNewsletter() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) {
          return toast.message("Email is required!");
        }
        toast("Subscribed to newsletter successfully!", {
          description: "You will receive the latest updates on our products.",
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
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
