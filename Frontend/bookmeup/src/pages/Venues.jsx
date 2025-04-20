import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import Card from "../components/Card";
import SliderSkeleton from "../components/SliderSkeleton";

const Venues = () => {
 

  const [loading, setLoading] = useState(true);
  const [capacity, setCapacity] = useState(50);
  const [size, setSize] = useState("null");
  const [name, setName] = useState("null");
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await axios.get(
          `api/venues/search?name=${
            name ? name : "null"
          }&size=${size}&capacity=${capacity}`,
          { withCredentials: true }
        );
        setSearch(items?.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [name, size, capacity]);

  return (
    <>
      <div className="">
        <div className="search mt-3 md:p-4">
          <form action="">
            <input
              type="text"
              placeholder="Search for venues"
              className="bg-white text-black px-4 py-2 w-40 md:w-96 rounded-lg"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="dropdown dropdown-bottom dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn ml-1 mb-1 px-2 md:px-4 py-6 hover:bg-[#FF8C09] text-md md:text-lg rounded-xl"
              >
                Filters
                <IoIosArrowDown className=" mt-1" />
              </div>
              <div
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-77 md:w-96 p-5 shadow-sm"
              >
                <div className="wrapper flex justify-between">
                  <div className="size">
                    <input
                      type="radio"
                      id="small"
                      name="size"
                      value="small"
                      checked={size === "small"}
                      className="scale-150 accent-[#FF8C09]"
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                    />
                    <label htmlFor="small" className="text-lg p-2">
                      Small
                    </label>
                    <br />
                    <input
                      type="radio"
                      id="medium"
                      name="size"
                      value="medium"
                      checked={size === "medium"}
                      className="scale-150 accent-[#FF8C09]"
                      onChange={(e) => setSize(e.target.value)}
                    />
                    <label htmlFor="medium" className="text-lg p-2">
                      Medium
                    </label>
                    <br />
                    <input
                      type="radio"
                      id="large"
                      name="size"
                      value="large"
                      checked={size === "large"}
                      className="scale-150 accent-[#FF8C09]"
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                    />
                    <label htmlFor="large" className="text-lg p-2">
                      Large
                    </label>
                    <br />
                  </div>
                  <div className="cap">
                    <h1 className="text-white text-lg p-1">
                      Min Capacity: {capacity}
                    </h1>
                    <input
                      type="range"
                      name="capacity"
                      min={50}
                      max={1000}
                      value={capacity || 50}
                      onChange={(e) => setCapacity(e.target.value)}
                      className="range [--range-bg:#FF8C09]"
                    />
                  </div>
                </div>

                <button
                  className="bg-[#FF8C09] w-40 mx-auto mt-4 px-3 py-2 rounded-lg text-xl font-semibold cursor-pointer hover:scale-105 transition-all duration-300 easi-in-out"
                  onClick={(e) => {
                    e.preventDefault();
                    setCapacity(50);
                    setSize("null");
                  }}
                >
                  RESET
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="results md:p-4 mt-4 md:mt-1 flex flex-wrap gap-5 justify-center md:justify-start items-center">
          {loading ? (
            <SliderSkeleton />
          ) : search.message === "No Venues Found" ? (
            <h1 className="text-xl md:text-3xl text-center mt-10">
              No Venues Found
            </h1>
          ) : (
            search.map((item, key) => (
              <Card
                name={item.name}
                desc={item.features}
                img={item.images[0]}
                id={item.venue_id}
                key={key}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Venues;
