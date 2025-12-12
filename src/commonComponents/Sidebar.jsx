import React, { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "project", label: "Project", icon: <FolderKanban size={18} /> },
    { id: "team", label: "Team", icon: <Users size={18} /> },
    { id: "reports", label: "Reports", icon: <BarChart3 size={18} /> },
    { id: "settings", label: "Setting", icon: <Settings size={18} /> },
  ];

  return (
    <div className="w-60 h-screen bg-purple-100 p-6">
      <h3 className="text-purple-700 text-xl font-bold mb-8">workasana</h3>

      <nav>
        <ul className="space-y-6">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`
                flex items-center gap-3 cursor-pointer
                ${active === item.id ? "text-purple-700 font-semibold" : "text-gray-700"}
                hover:text-purple-700
              `}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
