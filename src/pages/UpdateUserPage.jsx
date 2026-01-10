import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineCameraAlt } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";


function UpdateUserPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(undefined);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };


  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] || null;
    setProfilePhoto(selectedFile);
  };

  async function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/djlozkenj/upload`;
    const fd = new FormData();
    fd.append("upload_preset", "testing");
    fd.append("file", file);

    const response = await axios.post(url, fd);
    return response.data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleUpload = async () => {
      try {
        const apiResponse = await uploadFile(profilePhoto);
        return apiResponse.url;
      } catch (err) {
        console.log("Error uploading file: ", err);
      }
    };

    try {
      const url = await handleUpload();
      console.log(url);
      const updateProfilePostData = {
        name,
        city,
        country,
        about: description
      };

      const backendResponse = await axios.put(
        "http://localhost:8080/users/update",
        updateProfilePostData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      console.log(backendResponse);
      toast.success("Changes made!");
    } catch (err) {
      console.log(err);
      toast.error("Could not update user details. Please try again!");
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex justify-center px-4">
        <div className="w-full max-w-md mt-10 relative pt-10">
          <button className="cursor-pointer absolute right-0 top-0 flex items-center justify-center gap-2 hover:bg-red-300 rounded-sm p-1"
            onClick={handleLogout}>
            <MdOutlineLogout/>
            Logout
          </button>
          {/* Heading */}
          <h1 className="text-3xl font-semibold text-center text-gray-900">
            Set Up Your Profile
          </h1>
          <p className="text-center text-gray-500 mt-1">
            Tell fellow travelers about yourself
          </p>

          {/* Form Card */}
          <form className="bg-white rounded-2xl shadow-lg p-6 mt-8 space-y-5" onSubmit={handleSubmit}>
            
            {/* Profile Photo */}
            <div className="flex flex-col items-center">
              <label className="cursor-pointer">
                <div className="h-32 w-32 rounded-full border-4 border-blue-200 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition">
                  <MdOutlineCameraAlt className="h-8 w-8"/>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Tap to add a photo
              </p>
            </div>

            {/* Display Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Display Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="How should we call you?"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                City
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Where are you based?"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Your country"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell travelers about yourself..."
                rows={4}
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Actions */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Complete Setup
            </button>

            <button
              type="submit"
              onClick={() => navigate("/discover")}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Skip for now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateUserPage;
