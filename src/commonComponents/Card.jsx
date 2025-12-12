import React from "react";

const Card = () => {
  const projects = [
    {
      title: "Create Moodboard",
      description:
        "This project centers around compiling a digital moodboard to set the visual direction and tone for a new brand identity.",
      status: "In Progress",
    },
    {
      title: "Create Moodboard",
      description:
        "This project centers around compiling a digital moodboard to set the visual direction and tone for a new brand identity.",
      status: "Completed",
    },
    {
      title: "Create Moodboard",
      description:
        "This project centers around compiling a digital moodboard to set the visual direction and tone for a new brand identity.",
      status: "Completed",
    },
  ];

  const statusStyles = {
    "To Do": "bg-gray-100 text-gray-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "Completed": "bg-green-100 text-green-700",
    Blocked: "bg-red-100 text-red-700",
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white shadow-sm rounded-xl p-5 border border-gray-100"
        >
          {/* Status badge */}
          <span
            className={`px-3 py-1 text-sm rounded-md font-medium ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>

          {/* Title */}
          <h2 className="font-bold text-lg text-black mt-3">
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-sm mt-2">
            {project.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Card;
