"use client";

import { Fade, Slide } from "react-awesome-reveal";

export default function Hero() {
  return (
    <>
      <Slide
        triggerOnce={true}
        className={`mb-2 whitespace-nowrap text-6xl font-extrabold md:text-7xl`}
      >
        <h1>SLAY WITH</h1>
      </Slide>
      <Fade
        triggerOnce={true}
        delay={750}
        className={`mb-6 text-6xl font-extrabold text-lime-500 md:text-7xl`}
      >
        <h1 className={`duration-[10000] animate-pulse`}>SWAY</h1>
      </Fade>
    </>
  );
}
