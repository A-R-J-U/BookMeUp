import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { TbChartBarPopular } from "react-icons/tb";
import { ImEnlarge2 } from "react-icons/im";
import Slider from "../components/Slider.jsx";
import SliderSkeleton from "../components/SliderSkeleton.jsx";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [largeVenues, setLargeVenues] = useState([]);
  const [popularVenues, setPopularVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const [resLarge, resPopular] = await Promise.all([
          axios.get(`api/venues/search?size=large&capacity=50&name=null`, {
            withCredentials: true,
          }),
          axios.get(`api/venues/popular`, {
            withCredentials: true,
          }),
        ]);

        setLargeVenues(resLarge.data);
        setPopularVenues(resPopular.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching venues:", err);
      }
    };

    fetchVenues();
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="pop">
          <h1 className="py-3 text-2xl md:text-3xl md:py-5 flex gap-3 items-center">
            Most popular Venues <TbChartBarPopular className="mt-1" />
          </h1>

          <Slider>
            {loading ? (
              <SliderSkeleton />
            ) : (
              popularVenues?.map((item, key) => (
                <Card
                  name={item.name}
                  desc={item.features}
                  img={item.images[0]}
                  key={key}
                  id={item.venue_id}
                />
              ))
            )}
          </Slider>
        </div>

        <div className="large mt-10">
          <h1 className="py-3 text-2xl md:text-3xl md:py-5 flex gap-3 items-center">
            Large Venues <ImEnlarge2 className="mt-1 ml-1 text-2xl" />
          </h1>

          <Slider>
            {loading ? (
              <SliderSkeleton />
            ) : (
              largeVenues?.map((item, key) => (
                <Card
                  name={item.name}
                  desc={item.features}
                  img={item.images[0]}
                  key={key}
                  id={item.venue_id}
                />
              ))
            )}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Home;
