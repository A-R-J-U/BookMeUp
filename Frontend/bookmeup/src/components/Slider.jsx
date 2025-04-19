import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Slider = (props) => {
  const scrollRef = useRef(null);

  const scroll = (
    direction,
    distance = window.innerWidth * 0.4,
    duration = 300
  ) => {
    const target = scrollRef.current;
    if (!target) return;

    const start = target.scrollLeft;
    const end = direction === "right" ? start + distance : start - distance;
    const startTime = performance.now();

    //Animatyion function
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress);
      target.scrollLeft = start + (end - start) * ease; //Actual scrolling

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="container relative">
          <button
            className=" absolute z-10 -left-7 md:-left-9 top-1/3 bg-white p-3 md:p-5  rounded-full cursor-pointer hover:bg-[#FF8C09] transition-all duration-300 ease-in-out"
            onClick={() => {
              scroll("left");
            }}
          >
            <FaChevronLeft className="text-black text-xl " />
          </button>

          <div
            className="flex justify-baseline items-center gap-3 overflow-x-auto no-scrollbar"
            ref={scrollRef}
          >
            {props.children}
          </div>

          <button
            className="absolute z-10 -right-7 md:-right-9 top-1/3 bg-white p-3 md:p-5 rounded-full cursor-pointer hover:bg-[#FF8C09] transition-all duration-300 ease-in-out"
            onClick={() => {
              scroll("right");
            }}
          >
            <FaChevronRight className="text-black text-xl " />
          </button>
        </div>
      </div>
    </>
  );
};

export default Slider;
