import { useState } from "react";

const SettingsMenu = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <button
      onClick={handleMenu}>
        <img
        src="../../images/gear_white.png"
        alt="settings"
        className="w-10 h-10 cursor-pointer"
        />
      </button>
      {menuOpen && (
        <div className="absolute top-0 p-4 bg-white shadow-lg left-10 w-96">
          <ul>
            <li>
              <a>
                Change Theme
              </a>
            </li>
            <li>
              <a>
                Change Difficulty
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;