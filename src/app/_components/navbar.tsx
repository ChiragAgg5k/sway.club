import Image from "next/image";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Streetwear", path: "/streetwear" },
  { name: "About Us", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
  { name: "Track Order", path: "/track-order" },
];

export default function Navbar() {
  return (
    <nav className={"flex items-center justify-between p-6"}>
      <h1 className={"flex items-center justify-center text-2xl font-bold"}>
        <Image
          src={"/logo.png"}
          className={`mr-2`}
          alt={"Sway Logo"}
          width={40}
          height={40}
        />
        Sway
      </h1>
      <ul className={"text-md flex space-x-6"}>
        {navItems.map((item) => (
          <li key={item.path}>
            <a href={item.path}>{item.name}</a>
          </li>
        ))}
      </ul>
      <button
        className={
          "rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition-colors ease-in-out hover:bg-gray-100"
        }
      >
        Get Started
      </button>
    </nav>
  );
}
