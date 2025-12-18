import React, { useEffect, useState } from "react";
import Sidebar from "../commonComponents/Sidebar";
import CreateTaskModal from "../commonComponents/CreateTaskModal";
import MobileHeader from "../commonComponents/MobileHeader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateMoodBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("To Do");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const url = selectedStatus
          ? `${apiUrl}/tasks?status=${encodeURIComponent(selectedStatus)}`
          : `${apiUrl}/tasks`;

        const response = await fetch(url);
        const data = await response.json();
        setTasks(data?.tasks || []);
      } catch (error) {
        toast.error("Internal Server Error");
      }
    };

    fetchTasks();
  }, [selectedStatus, refreshTasks]);

  return (
    <>
      <div className="flex min-h-screen bg-white">

        <div className="hidden md:block w-64 bg-white border-r">
          <Sidebar />
        </div>

        {/* ================= Mobile Sidebar ================= */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
              <Sidebar
                isMobile
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* ================= Main Content ================= */}
        <div className="flex-1 overflow-y-auto">

          {/* Mobile Header */}
          <MobileHeader onMenuClick={() => setSidebarOpen(prev => !prev)} />

          <div className="p-4 sm:p-6 text-black">

            {/* Title */}
            <h1 className="text-2xl font-bold mb-2">Moodboard</h1>

            {/* Filters & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

              {/* Status Filters */}
              <div className="flex flex-wrap gap-2">
                {["To Do", "In Progress", "Completed", "Blocked"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-1.5 rounded-full text-sm border
                      ${
                        selectedStatus === status
                          ? "bg-blue-600 text-white border-blue-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* New Task Button */}
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                + New Task
              </button>
            </div>

            {/* ================= Table ================= */}
            {/* ================= Table ================= */}
<div className="border rounded-lg overflow-x-auto">
  <table className="w-full min-w-[650px] text-sm">
    <thead className="bg-blue-50 text-gray-600">
      <tr>
        <th className="text-left p-3">TASK</th>

        {/* Hide on mobile */}
        <th className="text-left p-3 hidden sm:table-cell">
          OWNER
        </th>

        {/* Hide on mobile */}
        <th className="text-left p-3 hidden md:table-cell">
          DUE DAYS
        </th>

        <th className="text-left p-3">STATUS</th>
      </tr>
    </thead>

    <tbody>
      {tasks.length === 0 ? (
        <tr>
          <td colSpan="4" className="text-center p-6 text-gray-500">
            No tasks found
          </td>
        </tr>
      ) : (
        tasks.map((task) => (
          <tr
            key={task._id}
            onClick={() => navigate(`/projectDetails/${task._id}`)}
            className="border-t hover:bg-gray-50 cursor-pointer"
          >
            <td className="p-3 font-medium">
              {task.name}
            </td>

            {/* OWNER (hidden on mobile) */}
            <td className="p-3 hidden sm:table-cell">
              {task.owners?.map(o => o.name).join(", ") || "Unassigned"}
            </td>

            {/* DUE DAYS (hidden on small screens) */}
            <td className="p-3 hidden md:table-cell font-medium">
              {task.timeToComplete || "-"}
            </td>

            <td className="p-3">
              <span
                className={`px-3 py-1 rounded-full text-xs
                  ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "Blocked"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {task.status}
              </span>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

          </div>
        </div>
      </div>

      {/* ================= Modal ================= */}
      {isTaskModalOpen && (
        <CreateTaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSuccess={() => setRefreshTasks(prev => !prev)}
        />
      )}
    </>
  );
};

export default CreateMoodBoard;
