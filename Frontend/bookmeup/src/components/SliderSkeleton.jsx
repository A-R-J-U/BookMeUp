import React from "react";

const SliderSkeleton = () => {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="skeleton w-60 h-75 md:w-80 flex-shrink-0"></div>
      ))}
    </>
  );
};

export default SliderSkeleton;
