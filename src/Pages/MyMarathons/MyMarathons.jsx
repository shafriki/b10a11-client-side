import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';

const MyMarathons = () => {
  const { user } = useContext(AuthContext);
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Marathons | প্রতিদৌড়";
  }, []);

  useEffect(() => {
    if (user) {
      getMarathons();
    }
  }, [user]);

  const getMarathons = async () => {
    try {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/marathons/${user?.email}`, { withCredentials: true });
      setMarathons(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching marathons:", error);
      setLoading(false);
      toast.error("Error fetching marathons. Please try again later.");
    }
  };

  const handleDeleteMarathon = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/marathon/${id}`, { withCredentials: true });
        toast.success('Marathon deleted successfully!');
        // Refresh UI
        getMarathons();
      }
    } catch (err) {
      console.log("Error deleting marathon:", err.message);
      toast.error("Error deleting marathon. Please try again later.");
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-4xl text-center mt-8 font-bold">My Marathon List</h2>
      <div className="overflow-x-auto px-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table bg-green-50 mt-5">
            <thead>
              <tr className="font-bold text-black text-xs md:text-lg">
                <th>Index No.</th>
                <th>Marathon Title</th>
                <th>Start Date</th>
                <th>Location</th>
                <th>Distance</th>
                <th>Registrations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {marathons.length > 0 ? (
                marathons.map((marathon, index) => (
                  <tr key={marathon._id} className="text-xs md:text-base">
                    <th>{index + 1}</th>
                    <td>{marathon.marathonTitle}</td>
                    <td>{new Date(marathon.marathonStartDate).toLocaleDateString()}</td>
                    <td>{marathon.location}</td>
                    <td>{marathon.runningDistance}</td>
                    <td>{marathon.totalRegistrationCount}</td>
                    <td>
                      <button className="btn text-xs md:text-base bg-green-500 text-white mr-2">
                        <MdEdit size={20} />
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteMarathon(marathon._id)}
                        className="btn btn-error text-xs md:text-base text-white"
                      >
                        <MdDelete size={20} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">No marathons found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyMarathons;
