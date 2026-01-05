import { MdOutlineLocationOn } from "react-icons/md";
import { LuSparkles } from "react-icons/lu";
import { BiWorld } from "react-icons/bi";
import { RiGroupLine } from "react-icons/ri";
import { FaRegCompass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-100">
      {/*header */}
      <header className="w-full px-12 py-6 flex items-center justify-between">
        
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

        {/* Right pane */}
        <div className="flex items-center gap-4">
          <button className="text-m font-medium text-gray-700 hover:text-gray-900 transition cursor-pointer"
            onClick={()=>navigate("/login")}>
            Sign in
          </button>

          <button className="
            px-5 py-2 rounded-full text-m font-medium text-white
            bg-gradient-to-r from-orange-400 to-blue-600
            hover:opacity-90 transition
            shadow-md
            cursor-pointer
          "
            onClick={()=>navigate("/signup")}>
            Get Started
          </button>
        </div>

      </header>
    
      {/* hero section */}
      <div className="mt-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT PANE */}
          <div className="space-y-8">

            {/* Tag */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-sm font-medium text-gray-700">
                <LuSparkles className="text-orange-400" />
                Find your travel tribe
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-serif font-semibold text-gray-900 leading-tight">
              Adventure is{" "}
              <span className="bg-gradient-to-r from-orange-400 to-blue-600 bg-clip-text text-transparent">
                better together
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-500 max-w-xl">
              Connect with like-minded travelers, discover group trips, and explore the world with your perfect travel companions.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <button
                className="
                  px-6 py-3 rounded-full text-white text-sm font-medium
                  bg-gradient-to-r from-orange-400 to-blue-600
                  shadow-lg
                  transform transition
                  hover:scale-105
                  hover:shadow-xl
                  cursor-pointer
                "
                onClick={()=>navigate('/signup')}
              >
                Start Your Journey →
              </button>

              <button className="
                px-6 py-3 rounded-full text-sm font-medium
                border border-gray-300 text-gray-700
                transform transition
                hover:scale-105
                hover:bg-gray-50 transition
                cursor-pointer
              "
              onClick={()=>navigate('/login')}>
                Sign In
              </button>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 max-w-xl" />

            {/* Stats */}
            <div className="flex gap-12">
              <div>
                <p className="text-2xl font-semibold text-gray-900">50K+</p>
                <p className="text-sm text-gray-500">Travelers</p>
              </div>

              <div>
                <p className="text-2xl font-semibold text-gray-900">120+</p>
                <p className="text-sm text-gray-500">Countries</p>
              </div>

              <div>
                <p className="text-2xl font-semibold text-gray-900">10K+</p>
                <p className="text-sm text-gray-500">Trips Created</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div
              className="h-[520px] rounded-3xl overflow-hidden shadow-xl bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)"
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/60 to-orange-400/40" />

              {/* Floating card */}
              <div className="absolute top-6 right-6 bg-white rounded-xl px-4 py-3 shadow-md flex items-center gap-3 float">
                <div className="h-10 w-10 rounded-full bg-orange-400 flex items-center justify-center text-white">
                  ✈️
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New Match!</p>
                  <p className="text-xs text-gray-500">Tokyo trip</p>
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-7 w-7 rounded-full bg-orange-400 flex items-center justify-center text-xs">1</span>
                  <span className="h-7 w-7 rounded-full bg-orange-400 flex items-center justify-center text-xs">2</span>
                  <span className="h-7 w-7 rounded-full bg-orange-400 flex items-center justify-center text-xs">3</span>
                  <span className="h-7 w-7 rounded-full bg-orange-400 flex items-center justify-center text-xs">4</span>
                  <span className="text-sm text-white/80">+12 joined</span>
                </div>

                <p className="text-lg font-semibold">Bali Adventure</p>
                <p className="text-sm text-white/80">March 15–28, 2024</p>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* How nomadly works */}

      <div className="mx-16 my-20 mt-30">
        
        <div className="text-center mt-24 mb-12 px-4">
          <h2 className="text-4xl font-serif font-semibold text-gray-900 mb-4">
            How Nomadly Works
          </h2>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Find your perfect travel companions in three simple steps
          </p>
        </div>
        
        {/* the three cards */}
        <div className="flex flex-row gap-10 justify-center items-center pb-50">
          {/* Card 1 */}
          <div
            className="
              bg-white rounded-3xl p-6 max-w-sm
              shadow-sm hover:shadow-md
              transform transition-all duration-300
              hover:scale-105
              hover:border-gray-300
              hover:border-2
              mx-5
            "
          >
            {/* Icon badge */}
            <div className="h-12 w-12 rounded-xl bg-blue-400 flex items-center justify-center mb-4">
              <BiWorld className="text-white text-xl" />
            </div>

            {/* Title */}
            <h1 className="text-xl font-serif font-semibold text-gray-900 mb-2">
              Discover Trips
            </h1>

            {/* Description */}
            <p className="text-gray-500 leading-relaxed text-sm">
              Swipe through curated group trips to destinations you've always dreamed of visiting.
            </p>
          </div>
        
          {/* Card 2 */}
          <div
            className="
              bg-white rounded-3xl p-6 max-w-sm
              mx-5
              shadow-sm hover:shadow-md
              transform transition-all duration-300
              hover:scale-105
              hover:border-gray-300
              hover:border-2
            "
          >
            {/* Icon badge */}
            <div className="h-12 w-12 rounded-xl bg-orange-400 flex items-center justify-center mb-4">
              <RiGroupLine className="text-white text-xl" />
            </div>

            {/* Title */}
            <h1 className="text-xl font-serif font-semibold text-gray-900 mb-2">
              Match & Connect
            </h1>

            {/* Description */}
            <p className="text-gray-500 leading-relaxed text-sm">
              Connect with travelers who share your interests, pace, and adventure style.
            </p>
          </div>
          
          {/* Card 3 */}
          <div
            className="
              mx-5
              bg-white rounded-3xl p-6 max-w-sm
              shadow-sm hover:shadow-md
              transform transition-all duration-300
              hover:scale-105
              hover:border-gray-300
              hover:border-2
            "
          >
            {/* Icon badge */}
            <div className="h-12 w-12 rounded-xl bg-green-400 flex items-center justify-center mb-4">
              <FaRegCompass className="text-white text-xl" />
            </div>

            {/* Title */}
            <h1 className="text-xl font-serif font-semibold text-gray-900 mb-2">
              Discover Trips
            </h1>

            {/* Description */}
            <p className="text-gray-500 leading-relaxed text-sm">
              Swipe through curated group trips to destinations you've always dreamed of visiting.
            </p>
          </div>
        </div>
        
      </div>
      
      {/* Footer */}
      <div className="px-6 pb-6">
          <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur rounded-3xl px-8 py-16 text-center shadow-xl relative">
            <h1 className="text-4xl font-serif font-semibold text-gray-900 mb-4">Ready to find your tribe?</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">Join thousands of travelers who've found their perfect adventure companions on Nomadly.</p>
            <button
              className="
                px-8 py-4 rounded-full
                text-white text-sm font-medium
                bg-gradient-to-r from-orange-400 to-blue-600
                shadow-lg
                transform transition-all duration-300
                hover:scale-105 hover:shadow-xl
                cursor-pointer
              "
              onClick={()=>navigate('/signup')}
            >
              Start Exploring Free! 
            </button>
          </div>

          <div className="mt-16 flex items-center justify-between max-w-6xl mx-auto text-sm text-gray-500">
            <p>© 2024 Nomadly. Wander together, discover forever. </p>
          </div>
      </div>


    </div>
  )
}

export default HomePage;