import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ team, refresh }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const statusStyles = {
    "To Do": "bg-gray-100 text-gray-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "Completed": "bg-green-100 text-green-700",
    "Blocked": "bg-red-100 text-red-700",
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const url = team
          ? `${apiUrl}/tasks?team=${encodeURIComponent(team)}`
          : `${apiUrl}/tasks`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Failed to fetch tasks");
          return;
        }

        setTasks(data.tasks || []);
      } catch (error) {
        console.error(error);
        toast.error("Error in task data fetching!");
      }
    };

    fetchTasks();
  }, [apiUrl, team, refresh]);

  return (
    <div className="p-4">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            onClick={() => navigate(`/projectDetails/${task._id}`)}
            className="
              bg-white border border-gray-100 rounded-xl p-5
              shadow-md hover:shadow-lg transition
              cursor-pointer
              flex flex-col items-start text-left
            "
          >
            {/* Status – LEFT on mobile */}
            <span
              className={`px-3 py-1 text-xs sm:text-sm rounded-md font-medium mb-2 ${
                statusStyles[task.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {task.status || "To Do"}
            </span>

            {/* Title */}
            <h2 className="font-bold text-base sm:text-lg text-black">
              {task.name}
            </h2>

            {/* Owners */}
            <p className="text-sm text-gray-600 mt-2">
              {task.owners?.length
                ? task.owners.map(o => o.name).join(", ")
                : "No owner assigned"}
            </p>

            {/* Created Date */}
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Created on{" "}
              <span className="font-medium text-gray-700">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {tasks.length === 0 && (
        <p className="text-left text-gray-500 mt-10">
          No tasks found
        </p>
      )}
    </div>
  );
};

export default TaskCard;
