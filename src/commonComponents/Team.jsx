import React, { useEffect,useState } from "react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../commonComponents/Sidebar";
import toast from "react-hot-toast";
import CreateNewTeam from "./CreateNewTeam";

const Team = () => {

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [teams, setTeams] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchTeams = async()=>{
        try{
            const response = await fetch(`${apiUrl}/team`);
            console.log(response);

            const data = await response.json();
            setTeams(data.response);

            // toast.success("Data fetchd successfully!");

        }catch(error){
            toast.error("Failed to fetch team data!");
        }
    }

  useEffect(()=>{
    fetchTeams();
  },[]);


  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-2xl text-black">Teams</h1>
          <button
          onClick={()=>setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg">
            + New Team
          </button>
          <CreateNewTeam
          isOpen={isModalOpen}
          onClose={()=> setIsModalOpen(false)}
          onSuccess={fetchTeams}
          />
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team._id}
              className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {team.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {team.description}
              </p>

              <div className="mt-4 flex justify-between items-center">


                <Link
                 to={`/teams/${team._id}/owners`}
                className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">
                    View
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Team;
