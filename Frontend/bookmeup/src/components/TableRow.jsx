import React from "react";
import { format } from "date-fns";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const badge = {
  pending: "warning",
  approved: "success",
  rejected: "error",
};

const TableRow = (props) => {
  const api = import.meta.env.VITE_API_URL;

  const handleDelete = async () => {
    try {
      const result = await axios.delete(`${api}/booking/${props.id}`, {
        withCredentials: true,
      });
      toast.success(result?.data.message);
      window.location.reload();
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-900 transition-all duration-300 ease-in-out">
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={props.img} alt="Img" />
              </div>
            </div>
          </div>
        </td>
        <td>{props.name}</td>
        <td>{format(new Date(props.bd), "PPP")}</td>
        <td>
          <div
            className={`badge p-4 badge-outline badge-${badge[props.status]}`}
          >
            {props.status}
          </div>
        </td>
        <th>
          <button
            className="text-lg mx-10 hover:cursor-pointer hover:text-red-600 transition-all duration-300 ease-in-out"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <FaTrash />
          </button>

          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete Booking?</h3>
              <p className="py-4">
                Are you sure you want to delete this booking? This action cannot
                be undone.
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    className="btn hover:bg-[#FF8C09]"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </button>
                  <button className="btn hover:bg-[#FF8C09]">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </th>
      </tr>
    </>
  );
};

export default TableRow;
