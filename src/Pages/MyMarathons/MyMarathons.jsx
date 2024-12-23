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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Marathons</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Distance</th>
              <th className="py-2 px-4 border-b">Registrations</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {marathons.length > 0 ? (
              marathons.map((marathon) => (
                <tr key={marathon._id}>
                  <td className="py-2 px-4 border-b">{marathon.marathonTitle}</td>
                  <td className="py-2 px-4 border-b">{new Date(marathon.marathonStartDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{marathon.location}</td>
                  <td className="py-2 px-4 border-b">{marathon.runningDistance}</td>
                  <td className="py-2 px-4 border-b">{marathon.totalRegistrationCount}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="mr-2 text-blue-500">
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteMarathon(marathon._id)}
                      className="text-red-500"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No marathons found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyMarathons;
