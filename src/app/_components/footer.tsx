import Link from "next/link";
import SubscribeNewsletter from "@/app/_components/subscribe-newsletter";

const about_links = [
  { name: "About Us", path: "/about" },
  { name: "Our Story", path: "/about/our-story" },
  { name: "Careers", path: "/about/careers" },
  { name: "Press", path: "/about/press" },
  { name: "Affiliates", path: "/about/affiliates" },
];

const help_links = [
  { name: "Contact Us", path: "/contact" },
  { name: "Track Order", path: "/track-order" },
  { name: "My Account", path: "/my-account" },
  { name: "Terms & Conditions", path: "/terms" },
  { name: "Refund & Returns Policy", path: "/refund" },
  { name: "Shipping Policy", path: "/shipping" },
];

export default function Footer() {
  return (
    <footer className={`w-full bg-secondary`}>
      <div
        className={`grid grid-cols-1 place-items-start space-y-8 px-12 py-20 md:grid-cols-3 md:place-items-center md:space-y-0`}
      >
        <div>
          <h3 className={`mb-2 text-4xl font-semibold text-lime-500`}>
            Join our club
          </h3>
          <p className={`mb-4 text-sm font-light text-foreground/70`}>
            Subscribe to our newsletter to get the latest updates on our
            products and promotions.
          </p>
          <SubscribeNewsletter />
        </div>
        <div>
          <h2 className={`text-lg text-lime-500`}>About Sway</h2>
          <ul className={`mt-4 space-y-2`}>
            {about_links.map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  className={`text-sm font-light text-foreground/70 hover:text-lime-500`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={`text-lg text-lime-500`}>Help & Support</h2>
          <ul className={`mt-4 space-y-2`}>
            {help_links.map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  className={`text-sm font-light text-foreground/70 hover:text-lime-500`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr className={`border-foreground/50`} />
      <div className={`flex items-center justify-end px-8 py-4`}>
        <p className={`text-center text-sm font-light text-foreground/70`}>
          Copyright © 2024 Sway | Developed by{" "}
          <Link
            href={"https://chirag.is-a.dev/"}
            target={"_blank"}
            rel={"noopener noreferrer"}
            className={`text-lime-500 hover:underline`}
          >
            Chirag Aggarwal
          </Link>
        </p>
      </div>
    </footer>
  );
}
