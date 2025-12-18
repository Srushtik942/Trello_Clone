import { Menu } from "lucide-react";

const MobileHeader = ({ onMenuClick }) => {
  return (
    <div className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-40">
      <button onClick={onMenuClick}>
        <Menu size={24} />
      </button>
      <h2 className="text-lg font-bold text-purple-700">Workly</h2>
    </div>
  );
};

export default MobileHeader;
