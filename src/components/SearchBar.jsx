import { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="px-6 py-2">
      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3 border border-transparent
        focus-within:border-blue-500
        focus-within:bg-white
      ">
        <span className="text-gray-400">🔍</span>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search destinations..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>
    </form>
  );
}

export default SearchBar;
