import { IoArrowForward } from "react-icons/io5";

export default async function Home() {
  return (
    <main
      className={`flex flex-1 flex-col items-center justify-center sm:flex-row`}
    >
      <div
        className={`flex w-1/3 flex-col items-center justify-center p-8 md:ml-16 md:p-0`}
      >
        <div>
          <div className="mb-2 w-max">
            <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-white pr-4 text-6xl font-bold md:text-7xl">
              SLAY WITH
            </h1>
          </div>
          <div className="mb-6 w-max">
            <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-white pr-4 text-6xl font-bold text-lime-500 md:text-7xl">
              SWAY
            </h1>
          </div>
          <p className={`text-md mb-6 font-light`}>
            Sway is a cool and comfy clothing brand. Our styles mix modern
            trends with classic vibes for a vintage yet stylish look. We ensure
            the quality of the fabric and comfortability of the product.
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
      <div className={`hidden w-2/3 items-center justify-center md:flex`}>
        <div className={`w-fit space-y-6`}>
          <div className={`ml-8 grid grid-cols-3 gap-6`}>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300 `}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300 `}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
          </div>
          <div className={`mr-8 grid grid-cols-3 gap-4`}>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300 `}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300 `}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
          </div>
          <div className={`ml-8 grid grid-cols-3 gap-4`}>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300 `}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
          </div>
        </div>
      </div>
    </main>
  );
}
