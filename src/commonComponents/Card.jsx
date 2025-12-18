import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Card = ({ refresh }) => {
  const [projects, setProjects] = useState([]);

  const statusStyles = {
    "To Do": "bg-gray-100 text-gray-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "Completed": "bg-green-100 text-green-700",
    "Blocked": "bg-red-100 text-red-700",
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${apiUrl}/projects`);
        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Failed to fetch projects");
          return;
        }
        setProjects(data.projectData || []);
      } catch (error) {
        toast.error("Error in data fetching!");
      }
    };

    fetchProjects();
  }, [apiUrl, refresh]);

  return (
    <div className="p-4">
      {/* ✅ Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-5 border border-gray-100"
          >
            {/* Status */}
            <span
              className={`inline-block px-3 py-1 text-xs sm:text-sm rounded-md font-medium ${statusStyles[project.status]}`}
            >
              {project.status}
            </span>

            {/* Title */}
            <h2 className="font-bold text-base sm:text-lg text-black mt-3">
              {project.name}
            </h2>

            {/* Due Date */}
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Due on:{" "}
              <span className="font-medium text-gray-700">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </p>

            {/* Description */}
            <p className="text-gray-500 text-sm mt-2 line-clamp-3">
              {project.description}
            </p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No projects found
        </p>
      )}
    </div>
  );
};

export default Card;
