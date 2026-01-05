import { FaRegCompass } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";


function Footer({ activeTab = "discover"}) {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="mx-auto max-w-md flex items-center justify-between px-6 py-2">
        
        {/* Discover */}
        <button
          onClick={() =>{
            navigate('/discover');
          }}
          className={`flex flex-col items-center text-xs ${
            activeTab === "discover" ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <span className="text-xl"><FaRegCompass/></span>
          <span className="mt-1">Discover</span>
          {activeTab === "discover" && (
            <span className="mt-1 h-1 w-1 rounded-full bg-blue-600" />
          )}
        </button>

        {/* Add Trip (subtle emphasis) */}
        <button
          onClick={() =>{
            navigate('/add-trip');
          }}

          className={`flex flex-col items-center text-xs font-medium ${
            activeTab === "add"
              ? "text-blue-600"
              : "text-gray-500"
          }`}
        >
          <span className="text-xl"><FaPlus/></span>
          <span className="mt-1">Add Trip</span>
        </button>

        {/* Chats */}
        <button
          onClick={() => {
            navigate('/chats');
          }}
          className={`flex flex-col items-center text-xs ${
            activeTab === "chats" ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <span className="text-xl"><IoChatbubbleOutline/></span>
          <span className="mt-1">Chats</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => {
            navigate('/profile');
          }}
          className={`flex flex-col items-center text-xs ${
            activeTab === "profile" ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <span className="text-xl"><CgProfile/></span>
          <span className="mt-1">Profile</span>
        </button>

      </div>
    </footer>
  );
}

export default Footer;
