import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  const sliceLen =
    window.innerWidth > 1024 ? 100 : window.innerWidth > 768 ? 50 : 30;

  return (
    <>
      <div className="card bg-base-100 w-60 h-75 md:w-80 flex-shrink-0 shadow-sm">
        <figure>
          <img
            className="object-cover h-50 w-full"
            src={props.img}
            alt="Shoes"
          />
        </figure>
        <div className="card-body h-1/2 md:h-2/3 p-4 pt-3">
          <h2 className="card-title">{props.name}</h2>
          <p>{`${props.desc.slice(0, sliceLen)}...`}</p>
          <div className="card-actions justify-end focus:bg-[#FF8C09]">
            <button
              className="btn bg-[#FF8C09] hover:bg-[#ff7c09] -mt-6 md:-mt-6"
              onClick={() => navigate(`/venue/${props.id}`)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
