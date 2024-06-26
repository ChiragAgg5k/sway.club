"use client";

import Image from "next/legacy/image";
import { IoMenu } from "react-icons/io5";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "@/app/_components/theme-toggle";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "Collections",
    path: "/collections",
  },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Track Order", path: "/track-order" },
];

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const mobileMenuVariant = {
    opened: {
      y: "0%",
      transition: {
        delay: 0.15,
        duration: 1,
        ease: [0.74, 0, 0.19, 1.02],
      },
    },
    closed: {
      y: "-100%",
      transition: {
        delay: 0.35,
        duration: 0.63,
        ease: [0.74, 0, 0.19, 1.02],
      },
    },
  };

  return (
    <motion.nav
      initial={"closed"}
      animate={mobileNavOpen ? "opened" : "closed"}
      className={"flex items-center justify-between p-6"}
    >
      <Link href={"/"} className={`group`}>
        <h3 className={"flex items-center justify-center text-2xl font-bold"}>
          <Image
            src={"/logo.png"}
            className={`group-hover:animate-pulse`}
            alt={"Sway Logo"}
            width={35}
            height={35}
          />
          <p className={`ml-2`}>Sway</p>
        </h3>
      </Link>
      <ul className={"text-md hidden space-x-6 md:flex"}>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.path}
              className={`text-md relative block w-fit after:absolute after:block after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition after:duration-300 after:content-[''] after:hover:scale-x-100`}
            >
              {item.name}
            </Link>
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
            "z-50 ml-2 rounded-xl border p-2 transition-colors ease-in-out hover:bg-gray-100 hover:text-black md:hidden"
          }
          onClick={() => {
            setMobileNavOpen(!mobileNavOpen);
          }}
        >
          {mobileNavOpen ? <IoIosClose size={24} /> : <IoMenu size={24} />}
        </button>
      </div>

      <motion.div
        variants={mobileMenuVariant}
        className={
          "fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-background p-6"
        }
      >
        <ul className={"space-y-6 text-2xl"}>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={`relative block w-fit after:absolute after:block after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition after:duration-300 after:content-[''] after:hover:scale-x-100`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
}
