import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreateTaskModal = ({ isOpen, onClose, onSuccess }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [ownersList, setOwnersList] = useState([]);
  const [tagList, setTagList] = useState([]);

  const [form, setForm] = useState({
    name: "",
    project: "",
    team: "",
    owners: [],
    tags: [],               // ✅ array of tag IDs
    timeToComplete: "",
    status: "To Do",
  });

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        const [pRes, tRes, uRes, tagRes] = await Promise.all([
          fetch(`${apiUrl}/projects`),
          fetch(`${apiUrl}/team`),
          fetch(`${apiUrl}/users`),
          fetch(`${apiUrl}/tags`),
        ]);

        const pData = await pRes.json();
        const tData = await tRes.json();
        const uData = await uRes.json();
        const tagData = await tagRes.json();

        setProjects(pData.projectData || []);
        setTeams(tData.response || []);
        setOwnersList(uData.userData || []);
        setTagList(tagData.tagsData || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load form data");
      }
    };

    fetchData();
  }, [apiUrl, isOpen]);

  if (!isOpen) return null;

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleTag = (tagId) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const handleCreate = async () => {
    if (!form.name || !form.project || !form.team || form.owners.length === 0) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          project: form.project,
          team: form.team,
          owners: form.owners,
          tags: form.tags, // ✅ send tag IDs
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

      // RESET FORM
      setForm({
        name: "",
        project: "",
        team: "",
        owners: [],
        tags: [],
        timeToComplete: "",
        status: "To Do",
      });
    } catch (error) {
      console.error(error);
      toast.error("Internal server error");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-[420px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

        {/* TASK NAME */}
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

        {/* OWNER */}
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
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Tags</p>
          <div className="flex flex-wrap gap-2">
            {tagList.map((tag) => {
              const isSelected = form.tags.includes(tag._id);
              return (
                <span
                  key={tag._id}
                  onClick={() => toggleTag(tag._id)}
                  className={`px-3 py-1 rounded-xl text-sm cursor-pointer transition
                    ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }
                  `}
                >
                  {tag.name}
                </span>
              );
            })}
          </div>
        </div>

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
          placeholder="Estimated time (days)"
          className="w-full border p-2 rounded mb-4"
          onChange={handleChange}
        />

        {/* ACTIONS */}
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
