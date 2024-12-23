import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for redirection
import { toast } from 'react-toastify'; // for error handling

const Marathons = () => {
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios(`${import.meta.env.VITE_API_URL}/marathons`);
                setMarathons(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching marathons:", error);
                setLoading(false);
                toast.error("Error fetching marathons. Please try again later.");
            }
        };
        getData();
    }, []);

    const handleDetailsClick = (id) => {
        navigate(`/marathons/${id}`); // Redirect to Marathon Details page
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {marathons.map((marathon) => (
                <div key={marathon._id} className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img
                        src={marathon.marathonImage} // Corrected field name
                        alt={marathon.marathonTitle} // Corrected field name
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="font-bold text-lg">{marathon.marathonTitle}</h2> {/* Corrected field name */}
                        <p>{marathon.location}</p>
                        <p>{`Start Date: ${new Date(marathon.registrationStartDate).toLocaleDateString()}`}</p> {/* Corrected field name */}
                        <p>{`End Date: ${new Date(marathon.registrationEndDate).toLocaleDateString()}`}</p> {/* Corrected field name */}
                        <button 
                            onClick={() => handleDetailsClick(marathon._id)} 
                            className="mt-2 text-blue-500 hover:text-blue-700"
                        >
                            See Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Marathons;
