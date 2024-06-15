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
        toast.message("Subscribed to newsletter successfully!");
      }}
    >
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className={`input input-bordered w-full border-lime-500 bg-secondary text-sm text-foreground/70 focus:border-lime-500 active:border-lime-500`}
        placeholder="Email"
      />
    </form>
  );
}
