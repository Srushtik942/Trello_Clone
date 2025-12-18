import React, { useEffect, useState } from "react";
import Sidebar from "../commonComponents/Sidebar";
import Card from "../commonComponents/Card";
import TaskCard from "../commonComponents/TaskCard";
import CreateTaskModal from "../commonComponents/CreateTaskModal";
import CreateProjectModal from "../commonComponents/CreateProjectModal";
import MobileHeader from "../commonComponents/MobileHeader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [taskFilter, setTaskFilter] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!debouncedSearch) {
        setProjects([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `${apiUrl}/tasks/search?name=${encodeURIComponent(debouncedSearch)}`,
          { headers: { "Cache-Control": "no-cache" } }
        );
        const data = await res.json();

        if (res.ok) {
          setProjects(data.taskData || []);
          navigate("/projects", {
            state: { projects: data.taskData || [], search: debouncedSearch },
          });
        } else {
          toast.error("Search failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [debouncedSearch, refreshProjects]);

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">

        {/* ================= Desktop Sidebar ================= */}
        <div className="hidden md:block w-64 bg-white shadow-lg">
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

          <div className="p-4 sm:p-6">

            {/* Search */}
            <div className="bg-white shadow-sm rounded-lg p-3 mb-6">
              <input
                type="text"
                placeholder="Search tasks or projects..."
                className="w-full outline-none text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Projects Header */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h1 className="text-xl sm:text-2xl font-bold">Projects</h1>

              <button
                onClick={() => setIsProjectModalOpen(true)}
                className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                + New Project
              </button>
            </div>

            {/* Projects */}
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
              </div>
            ) : (
              <Card projects={projects} refresh={refreshProjects} />
            )}

            {/* Tasks Header */}
            <div className="flex flex-wrap items-center gap-3 mt-10 mb-4">
              <h1 className="text-xl sm:text-2xl font-bold">My Tasks</h1>

              <select
                className="border border-gray-300 rounded px-3 py-2 text-sm"
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value)}
              >
                <option value="">All Teams</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Frontend Development">Frontend Development</option>
                <option value="Backend Development">Backend Development</option>
              </select>

              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="mt-2 sm:mt-0
                  sm:ml-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                + New Task
              </button>
            </div>

            {/* Tasks */}
            <TaskCard team={taskFilter} refresh={refreshTasks} />
          </div>
        </div>
      </div>

      {isProjectModalOpen && (
        <CreateProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onSuccess={() => setRefreshProjects(prev => !prev)}
        />
      )}

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

export default Dashboard;
