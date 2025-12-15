import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreateTaskModal = ({ isOpen, onClose, onSuccess }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [ownersList, setOwnersList] = useState([]);

  const [form, setForm] = useState({
    name: "",
    project: "",
    team: "",
    owners: [],
    tags: "",
    timeToComplete: "",
    status: "To Do",
  });

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        const [pRes, tRes, uRes] = await Promise.all([
          fetch(`${apiUrl}/projects`),
          fetch(`${apiUrl}/team`),
          fetch(`${apiUrl}/users`),
        ]);

        const pData = await pRes.json();
        const tData = await tRes.json();
        const uData = await uRes.json();

        setProjects(pData.projectData || []);
        setTeams(tData.response || []);
        setOwnersList(uData.userData || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load form data");
      }
    };

    fetchData();
  }, [apiUrl, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    if (
      !form.name ||
      !form.project ||
      !form.team ||
      form.owners.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const tagsArray = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const response = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          project: form.project,
          team: form.team,
          owners: form.owners,
          tags: tagsArray,
          timeToComplete: Number(form.timeToComplete),
          status: form.status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to create task");
        return;
      }

      toast.success("Task created successfully!");
      onSuccess();
      onClose();

      // ✅ FIXED RESET
      setForm({
        name: "",
        project: "",
        team: "",
        owners: [],
        tags: "",
        timeToComplete: "",
        status: "To Do",
      });
    } catch (error) {
      console.error(error);
      toast.error("Internal server error");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-[420px] p-6 text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

        {/* task */}
        <input
          name="name"
          value={form.name}
          placeholder="Task Name"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        />

       {/* PROJECT */}
<select
  name="project"
  value={form.project}
  className="w-full border p-2 rounded mb-3"
  onChange={handleChange}
>
  <option value="">Select Project</option>
  {projects.map((p) => (
    <option key={p._id} value={p._id}>
      {p.name}
    </option>
  ))}
</select>


        {/* TEAM */}
        <select
          name="team"
          value={form.team}
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        >
          <option value="">Select Team</option>
          {teams.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>

        {/* OWNER (ARRAY) */}
        <select
          className="w-full border p-2 rounded mb-3"
          value={form.owners[0] || ""}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              owners: e.target.value ? [e.target.value] : [],
            }))
          }
        >
          <option value="">Select Owner</option>
          {ownersList.map((o) => (
            <option key={o._id} value={o._id}>
              {o.name}
            </option>
          ))}
        </select>

        {/* TAGS */}
        <input
          name="tags"
          value={form.tags}
          placeholder="Tags (comma separated)"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        />

        {/* STATUS */}
        <select
          name="status"
          value={form.status}
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Blocked</option>
        </select>

        {/* TIME */}
        <input
          name="timeToComplete"
          type="number"
          value={form.timeToComplete}
          placeholder="Estimated time (hrs)"
          className="w-full border p-2 rounded mb-4"
          onChange={handleChange}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
