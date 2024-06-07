import { IoArrowForward } from "react-icons/io5";
import Hero from "@/app/_components/hero";
import Footer from "@/app/_components/footer";
import { NewArrivals } from "@/app/_components/new-arrivals";
import { api } from "@/trpc/server";
import { type Product } from "@/types";

export default async function Home() {
  const newArrivals = await api.product.fetchLatestProducts();

  return (
    <main>
      <div
        className={`my-12 flex flex-1 flex-col items-center justify-center md:flex-row`}
      >
        <div
          className={`flex w-1/3 flex-col items-center justify-center p-8 md:ml-16 md:p-0`}
        >
          <div>
            <Hero />
            <p className={`text-md mb-6 font-light`}>
              Sway is a cool and comfy clothing brand. Our styles mix modern
              trends with classic vibes for a vintage yet stylish look. We
              ensure the quality of the fabric and comfortability of the
              product.
            </p>
            <div>
              <button
                className={
                  "group flex items-center justify-center rounded-xl bg-lime-400 px-5 py-3 font-semibold text-black transition-colors ease-in-out hover:bg-lime-500"
                }
              >
                Get Started{" "}
                <div
                  className={`ml-1 inline-block transform transition-transform ease-in-out group-hover:translate-x-1`}
                >
                  <IoArrowForward />
                </div>
              </button>
              <button></button>
            </div>
          </div>
        </div>
        <div
          className={`mx-6 flex items-center justify-center md:mx-0 md:w-2/3`}
        >
          <div className={`w-fit space-y-6`}>
            <div className={`mr-16 grid grid-cols-2 gap-6`}>
              <video
                className={`h-full max-h-80 w-auto rounded-3xl`}
                autoPlay
                loop
                muted
                src={"/vid1.mp4"}
              />
              <video
                className={`h-full max-h-80 w-auto rounded-3xl`}
                autoPlay
                loop
                muted
                src={"/vid2.mp4"}
              />
            </div>
            <div className={`ml-16 grid grid-cols-2 gap-4`}>
              <video
                className={`h-full max-h-80 w-auto rounded-3xl`}
                autoPlay
                loop
                muted
                src={"/vid3.mp4"}
              />
              <video
                className={`h-full max-h-80 w-auto rounded-3xl`}
                autoPlay
                loop
                muted
                src={"/vid4.mp4"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`flex flex-col items-center justify-center py-12`}>
        <h2 className={`mb-6 text-3xl font-semibold`}>New Arrivals</h2>
        <NewArrivals products={newArrivals as Product[]} />
      </div>
      <Footer />
    </main>
  );
}
