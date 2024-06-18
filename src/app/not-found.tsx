import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className={`flex h-[85vh] flex-col items-center justify-center text-center`}
    >
      <h1 className={"mb-4 text-4xl font-extrabold text-lime-500 md:text-5xl"}>
        Uh oh!
      </h1>
      <p className={"mb-4 text-lg font-light text-foreground/70 md:text-xl"}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href={"/"}>
        <Button>Go back home</Button>
      </Link>
    </div>
  );
}
