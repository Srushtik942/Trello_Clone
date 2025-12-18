import React from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  BarChart3,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ onClose, isMobile = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/moodBoard", label: "Project", icon: <FolderKanban size={18} /> },
    { path: "/teams", label: "Team", icon: <Users size={18} /> },
    { path: "/reports", label: "Reports", icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="w-60 h-full bg-purple-100 p-6 relative">

      {/* ❌ Close button only for mobile */}
      {isMobile && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600"
        >
          <X size={22} />
        </button>
      )}

      <h3 className="text-purple-700 text-xl font-bold mb-8">Workly</h3>

      <nav>
        <ul className="space-y-6">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li
                key={item.path}
                onClick={() => {
                  navigate(item.path);

                  // ✅ Close sidebar ONLY on mobile
                  if (isMobile) onClose?.();
                }}
                className={`flex items-center gap-3 cursor-pointer
                  ${isActive ? "text-purple-700 font-semibold" : "text-gray-700"}
                  hover:text-purple-700`}
              >
                {item.icon}
                {item.label}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
