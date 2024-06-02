import Image from "next/image";

export default async function Home() {
  return (
    <main
      className={`flex flex-1 flex-col items-center justify-center sm:flex-row`}
    >
      <div
        className={`flex w-full flex-col items-center justify-center p-8 md:ml-16 md:p-0`}
      >
        <div>
          <h1 className={`mb-4 text-6xl font-extrabold md:text-7xl`}>
            SLAY WITH
            <br /> SWAY
          </h1>
          <p className={`text-md mb-6 font-light`}>
            Sway is a cool and comfy clothing brand. Our styles mix modern
            trends with classic vibes for a vintage yet stylish look. We ensure
            the quality of the fabric and comfortability of the product.
          </p>
          <div>
            <button
              className={
                "rounded-xl bg-lime-400 px-5 py-3 font-semibold text-black transition-colors ease-in-out hover:bg-lime-500"
              }
            >
              Get Started {"->"}
            </button>
            <button></button>
          </div>
        </div>
      </div>
      <div className={`hidden w-full items-center justify-center md:flex`}>
        <div className={`w-fit space-y-4`}>
          <div className={`ml-8 grid grid-cols-3 gap-4`}>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300 `}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300 `}></div>
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
