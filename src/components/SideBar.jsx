import sideBarImage from "../assets/SideBarImage.jpg";

function SideBar() {
  return (
    <div className="h-screen w-140 relative overflow-hidden">
      {/* Background image */}
      <img
        src={sideBarImage}
        alt="SideBarImage"
        className="h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Floating "New match!" card */}
      <div className="absolute top-6 right-6 z-20 bg-white/20 backdrop-blur-md px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg float
      ">
        <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">
          <span className="text-white text-sm">👤</span>
        </div>
        <div className="text-white">
          <p className="text-sm font-semibold">New match!</p>
          <p className="text-xs opacity-80">Iceland trip</p>
        </div>
      </div>

      {/* Text content */}
      <div className="absolute bottom-10 left-6 right-6 text-white z-10">
        <h1 className="text-4xl font-serif font-bold leading-tight">
          Your next adventure awaits
        </h1>
        <p className="mt-4 text-sm opacity-90 max-w-xs">
          Join a community of travelers who believe the best journeys are shared ones.
        </p>
      </div>
    </div>
  );
}

export default SideBar;
