import React from "react";
import { useNavigate } from "react-router-dom";
const bgColors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-indigo-400",
];

const Card = ({ projects }) => {
  const navigate = useNavigate();
  return (
    <>
      {projects.map((project, index) => {
        const bgColor = bgColors[index % bgColors.length];
        return (
          <div
            key={project._id || index}
            className={`${bgColor} p-6 rounded-xl cursor-pointer shadow-lg text-white hover:scale-105 transform transition duration-300`}
            onClick={() => navigate(`/projectDetails/${project._id}`)}          >
            <h2 className="text-xl font-bold mb-2">{project.name}</h2>
            <p className="text-sm">{project.description}</p>
            <p className="text-sm">{new Date(project.createdAt).toLocaleString()}</p>
          </div>
        );
      })}
    </>
  );
};

export default Card;
