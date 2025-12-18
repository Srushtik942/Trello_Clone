import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from "../commonComponents/Sidebar";
import MobileHeader from "../commonComponents/MobileHeader";
import toast from 'react-hot-toast';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    status: "",
    timeToComplete: ""
  });

  const STATUS_OPTIONS = ["To Do", "In Progress", "Completed", "Blocked"];
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch task by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`${apiUrl}/tasks/search/${id}`);
        const data = await res.json();
        if (res.ok) setTask(data.response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  // Populate form data when task loads
  useEffect(() => {
    if (task) {
      setFormData({
        status: task.status,
        timeToComplete: task.timeToComplete
      });
    }
  }, [task]);

  // Mark task as completed
  const markCompleted = async () => {
    if (!task) return;
    setUpdating(true);
    try {
      const res = await fetch(`${apiUrl}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" })
      });
      const data = await res.json();
      if (res.ok) {
        setTask(prev => ({ ...prev, status: "Completed" }));
        toast.success("Task marked as completed!");
      } else toast.error(data.error || "Failed to update task");
    } catch (err) {
      toast.error("Something went wrong");
    } finally { setUpdating(false); }
  };

  // Update task
  const updateTask = async () => {
    if (!task) return;
    setUpdating(true);
    try {
      const res = await fetch(`${apiUrl}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setTask(prev => ({
          ...prev,
          status: formData.status,
          timeToComplete: formData.timeToComplete
        }));
        toast.success("Task updated successfully!");
        setIsEditing(false);
      } else toast.error(data.error || "Failed to update task");
    } catch (err) {
      toast.error("Something went wrong");
    } finally { setUpdating(false); }
  };

  // Delete task
  const deleteTask = async () => {
    if (!task) return;
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setUpdating(true);
    try {
      const res = await fetch(`${apiUrl}/tasks/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        toast.success("Task deleted successfully!");
        navigate("/dashboard");
      } else toast.error(data.error || "Failed to delete task");
    } catch (err) {
      toast.error("Something went wrong");
    } finally { setUpdating(false); }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
            <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">

        {/* Mobile Header */}
        <MobileHeader onMenuClick={() => setSidebarOpen(prev => !prev)} />

        <div className="p-4 sm:p-6 lg:p-10 flex justify-center">

          {loading ? (
            <p className="text-lg">Loading...</p>
          ) : task ? (
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 w-full max-w-3xl">

              {/* Task Heading */}
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Task Details</h1>

              {/* Task Name */}
              <div className="mb-4 sm:mb-6">
                <p className="text-sm text-gray-500 mb-1">Task Name</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{task.name}</p>
              </div>

              {/* Project & Team */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Project</p>
                  <p className="text-lg font-medium text-gray-800">{task.project?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Team</p>
                  <p className="text-lg font-medium text-gray-800">{task.team?.name}</p>
                </div>
              </div>

              {/* Status & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  {isEditing ? (
                    <select
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      {STATUS_OPTIONS.map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                  ) : (
                    <span className={`inline-block px-4 py-1 rounded-xl font-medium text-sm ${
                      task.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>{task.status}</span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Time to Complete (days)</p>
                  {isEditing ? (
                    <input
                      type="number"
                      value={formData.timeToComplete}
                      onChange={e => setFormData({ ...formData, timeToComplete: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  ) : (
                    <p className="text-lg text-gray-800">{task.timeToComplete} days</p>
                  )}
                </div>
              </div>

              {/* Tags - Read Only */}
              <div className="mb-4 sm:mb-6">
                <p className="text-sm text-gray-500 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {(task.tags || []).map(tag => (
                    <span
                      key={tag._id}
                      className="px-3 py-1 rounded-xl text-sm bg-indigo-600 text-white"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Owners */}
              <div className="mb-4 sm:mb-6">
                <p className="text-sm text-gray-500 mb-2">Owners</p>
                <div className="flex flex-wrap gap-4">
                  {task.owners?.map(owner => (
                    <div key={owner._id} className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                        {owner.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{owner.name}</p>
                        <p className="text-xs text-gray-500">{owner.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="pt-4 sm:pt-6 border-t text-sm text-gray-500 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center justify-between">
                <p className="text-xs sm:text-sm">Created At: {new Date(task.createdAt).toLocaleString()}</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {isEditing ? (
                    <button
                      onClick={updateTask}
                      disabled={updating}
                      className="px-4 sm:px-6 py-2 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      {updating ? "Updating..." : "Save"}
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 sm:px-6 py-2 rounded-lg font-medium text-white bg-purple-500 hover:bg-purple-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={deleteTask}
                    disabled={updating}
                    className="px-4 sm:px-6 py-2 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={markCompleted}
                    disabled={task.status === "Completed" || updating}
                    className={`px-4 sm:px-6 py-2 rounded-lg font-medium text-white transition ${
                      task.status === "Completed" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {updating ? "Updating..." : "Mark as Completed"}
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <p className="text-lg">Task not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
