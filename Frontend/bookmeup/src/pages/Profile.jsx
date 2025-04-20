import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import TableRow from "../components/TableRow.jsx";
import axios from "axios";

const skeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <tr key={i}>
          <td>
            <div className="skeleton mask mask-squircle h-12 w-12"></div>
          </td>
          <td>
            <div className="skeleton w-50 h-5"></div>
          </td>
          <td>
            <div className="skeleton w-25 h-5"></div>
          </td>
          <td>
            <div className="skeleton w-25 h-5"></div>
          </td>
          <th>
            <div className="skeleton w-5 h-5"></div>
          </th>
        </tr>
      ))}
    </>
  );
};

const Profile = () => {
  const [load, setLoading] = useState(true);

  const { user, loading } = useAuth();
  console.log(user);
  const [bookings, setBookings] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await axios.get(`api/booking/user`, {
          withCredentials: true,
        });
        setBookings(result.data.Bookings);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <>
      <div className="profile">
        <h1 className="text-3xl md:text-5xl mt-5">Profile</h1>
        {loading || !user ? (
          <span className="loading loading-spinner text-warning p-6 mt-3"></span>
        ) : (
          <div className="profile-info mt-2 md:mt-5">
            <p className="text-xl md:text-3xl">Name: {user?.name}</p>
            <p className="text-xl md:text-3xl">Email: {user?.email}</p>
            <p className="text-xl md:text-3xl">Role : {user?.role}</p>
            <p className="text-s text-gray-300 mt-2">
              Member since: {user?.created_at.split("T")[0]}
            </p>
          </div>
        )}

        <h1 className="text-3xl md:text-3xl mt-12">Bookings</h1>
        <div className="tbl mt-3 overflow-x-auto md:mx-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Booked Date</th>
                <th>Status</th>
                <th>Cancel Booking</th>
              </tr>
            </thead>
            <tbody>
              {load
                ? skeleton()
                : bookings?.map((item, key) => (
                    <TableRow
                      img={item.images[0]}
                      name={item.name}
                      bd={item.booking_date}
                      key={key}
                      status={item.status}
                      id={item.booking_id}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Profile;
