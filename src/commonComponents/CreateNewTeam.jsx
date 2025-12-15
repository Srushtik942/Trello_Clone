import React, { useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const CreateNewTeam = ({ isOpen, onClose, onSuccess }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [teamName, setTeamName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAddNewTeam = async () => {
    if (!teamName.trim()) {
      toast.error("Team name required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}/team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: teamName,
          description: desc,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Team created successfully!");
      setTeamName("");
      setDesc("");
      onSuccess();
      onClose();
    } catch {
      toast.error("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Create New Team</h2>

        <input
          placeholder="Team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-3"
        />

        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleAddNewTeam}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTeam;
