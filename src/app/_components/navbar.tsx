import Image from "next/legacy/image";
import { IoArrowForward, IoMenu } from "react-icons/io5";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "@/app/_components/theme-toggle";

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "Collections",
    options: [
      {
        name: "Streetwear Collection",
        path: "/collections/streetwear",
        available: true,
      },
      {
        name: "Plain Oversized",
        path: "/collections/plain-oversized",
        available: false,
      },
    ],
  },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Track Order", path: "/track-order" },
];

export default function Navbar() {
  return (
    <nav className={"flex items-center justify-between p-6"}>
      <Link href={"/"} className={`group`}>
        <h3 className={"flex items-center justify-center text-2xl font-bold"}>
          <Image
            src={"/logo.png"}
            className={`mr-2 group-hover:animate-pulse`}
            alt={"Sway Logo"}
            width={35}
            height={35}
          />
          Sway
        </h3>
      </Link>
      <ul className={"text-md hidden space-x-6 md:flex"}>
        {navItems.map((item, index) => (
          <li key={index}>
            {item.options ? (
              <div className="dropdown dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="text-md relative mb-4 block w-fit after:absolute after:block after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition after:duration-300 after:content-[''] after:hover:scale-x-100"
                >
                  {item.name}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] w-fit space-y-2 rounded border p-4"
                >
                  {item.options.map((option) => (
                    <li key={option.path}>
                      <Link
                        href={option.path}
                        className={
                          "text-md group flex items-center justify-start whitespace-nowrap hover:text-foreground/80"
                        }
                      >
                        {option.name}
                        <div
                          className={`ml-1 inline-block transform transition-transform ease-in-out group-hover:translate-x-1`}
                        >
                          <IoArrowForward />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                href={item.path}
                className={`text-md relative block w-fit after:absolute after:block after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition after:duration-300 after:content-[''] after:hover:scale-x-100`}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div className={"flex items-center"}>
        <ThemeToggle />
        <SignedOut>
          <SignInButton mode={`modal`}>
            <button
              className={
                "rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-background transition-colors ease-in-out hover:bg-foreground/80"
              }
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton userProfileMode={`modal`} />
        </SignedIn>
        <button
          className={
            "ml-2 rounded-xl border p-2 transition-colors ease-in-out hover:bg-gray-100 hover:text-black md:hidden"
          }
        >
          <IoMenu size={24} />
        </button>
      </div>
    </nav>
  );
}
