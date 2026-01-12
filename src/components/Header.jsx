import Logo from "./Logo";

function Header() {
  return (
    <header className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
      <Logo/>
      {/* Name
      <div className="flex flex-col leading-tight">
        <h3 className="text-lg font-semibold text-gray-900">
          Nomadly
        </h3>
        <p className="text-xs tracking-wide text-gray-500">
          WANDER TOGETHER
        </p>
      </div> */}
    </header>
  );
}

export default Header;
