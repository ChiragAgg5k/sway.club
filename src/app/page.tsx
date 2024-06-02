import Image from "next/image";

export default async function Home() {
  return (
    <main className={`flex flex-1 flex-row items-center justify-center`}>
      <div className={`flex w-full flex-col items-center justify-center p-8`}>
        <div>
          <h1 className={`mb-4 text-7xl font-extrabold`}>
            SLAY WITH
            <br /> SWAY
          </h1>
          <p className={`text-md mb-6 line-clamp-3 font-light`}>
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
      <div className={`w-full`}>
        <div className={`space-y-4`}>
          <div className={`grid grid-cols-3 space-x-4 pl-4`}>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
          </div>
          <div className={`grid grid-cols-3 space-x-4 pr-4`}>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
          </div>
          <div className={`grid grid-cols-3 space-x-4 pl-4`}>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
            <div className={`h-28 w-40 rounded-3xl bg-gray-300`}></div>
          </div>
        </div>
      </div>
    </main>
  );
}
