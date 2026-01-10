import { MdOutlineLocationOn } from "react-icons/md"
import { useNavigate } from "react-router-dom";
function Logo() {
  const navigate=useNavigate();

  return (
    <div onClick={() => navigate('/discover')} className="flex items-center gap-3 cursor-pointer">
    {/* Left pane */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={()=>navigate('/')}>
        {/* Logo placeholder */}
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-blue-600 flex items-center justify-center text-white">
          <MdOutlineLocationOn size={25} />
        </div>
          {/* Brand */}
        <div className="flex flex-col leading-tight">
          <h3 className="text-lg font-semibold text-gray-900">
            Nomadly
          </h3>
          <p className="text-xs tracking-wide text-gray-500">
            WANDER TOGETHER
          </p>
        </div>
      </div>
    </div>
  )
}

export default Logo;