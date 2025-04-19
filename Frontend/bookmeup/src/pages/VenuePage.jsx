import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";

const VenuePage = () => {
  const goTo = (event) => {
    event.preventDefault();

    const btn = event.currentTarget;

    // You can customize this to use a more specific selector if needed
    const carousel = btn.parentElement.parentElement.parentElement;

    const href = btn.getAttribute("href");
    const target = carousel.querySelector(href);

    if (target) {
      const left = target.offsetLeft;
      carousel.scrollTo({ left: left });
    }
  };

  const navigate = useNavigate();
  const { id } = useParams();

  const [venue, setVenue] = useState(null);
  const [blockedDates, setBlockedDates] = useState([]);

  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await axios.get(`${api}/venues/${id}`, {
          withCredentials: true,
        });
        setVenue(res.data);
        const bookings = await axios.get(`${api}/booking/${id}`, {
          withCredentials: true,
        });
        const blockedDates = bookings.data.Bookings?.map(
          (b) => new Date(b.booking_date)
        );
        setBlockedDates(blockedDates);
      } catch (err) {
        if (err.response?.status === 404) navigate("/notfound");
        console.error(err);
      }
    };

    if (id) {
      fetchVenue();
    }
  }, [id]);

  const handlebooking = async () => {
    try {
      const res = await axios.post(
        `${api}/booking`,
        { venue_id: id, booking_date: selectedDate },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err.message);
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handledate = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setSelectedDate(formattedDate);
    console.log(formattedDate);
  };

  return (
    <>
      <div className="wrpper bg-gradient-to-l from-[#ff8c0933] to-black border border-1px-solid-white mt-3 p-3 w-full h-auto rounded-3xl flex flex-wrap justify-between items-start">
        <div className="caro h-50  md:w-1/2 md:h-96 lg:h-[500px]">
          <div className="carousel w-full h-full rounded-2xl">
            {venue?.images.map((image, key) => (
              <div
                id={`slide${key}`}
                key={key}
                className="carousel-item relative w-full"
              >
                <img
                  src={image}
                  className="w-full object-cover"
                  alt={`Slide ${key}`}
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a
                    onClick={goTo}
                    href={`#slide${
                      (key - 1 + venue.images.length) % venue.images.length
                    }`}
                    className="btn btn-circle hover:bg-[#FF8C09] hover:text-white"
                  >
                    ❮
                  </a>
                  <a
                    onClick={goTo}
                    href={`#slide${(key + 1) % venue.images.length}`}
                    className="btn btn-circle hover:bg-[#FF8C09] hover:text-white"
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="info p-4 pl-4 md:pl-6 flex flex-wrap md:flex-nowrap md:flex-col md:w-1/2 justify-between">
          <div className="details p-2">
            <h1 className="text-5xl md:text-7xl">{venue?.name}</h1>
            <div className="flex items-center text-gray-300 pt-2">
              <CiLocationOn className="text-2xl md:text-3xl" />
              <h1 className="text-xl md:text-3xl">{venue?.location}</h1>
            </div>
            <h1 className="lg:text-3xl mt-3">Size: {venue?.size}</h1>
            <h1 className="lg:text-3xl">Capacity: {venue?.capacity}</h1>
            <h1 className="lg:text-lg mt-2 text-gray-400">
              {" "}
              Description: {venue?.features}
            </h1>
          </div>

          <div className="booking p-3 mt-3">
            <div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  handledate(date);
                }}
                excludeDates={blockedDates}
                minDate={new Date()}
                placeholderText="Select a date"
                className="input input-bordered w-60 bg-white text-black"
              />
            </div>
            <button
              onClick={() => {
                selectedDate
                  ? document.getElementById("my_modal_5").showModal()
                  : toast.error("Please select a date first");
              }}
              className="bg-[#FF8C09] px-1 py-2 w-40 mt-3 rounded-md text-center text-2xl font-semibold hover:scale-110 cursor-pointer transition ease-in-out duration-300 "
            >
              Book Now
            </button>

            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Book This Venue?</h3>
                <p className="py-4">
                  Are you sure you want to book this venue on {selectedDate}
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                      className="btn hover:bg-[#FF8C09]"
                      onClick={() => handlebooking()}
                    >
                      Yes
                    </button>
                    <button className="btn hover:bg-[#FF8C09]">No</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenuePage;
