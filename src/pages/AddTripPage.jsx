import { use, useState } from "react";
import { LuMapPin } from "react-icons/lu";
import { CiCalendarDate } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { MdCurrencyRupee } from "react-icons/md";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { g } from "framer-motion/client";
import axios from "axios";
import toast from "react-hot-toast";
import { addTrip } from "../data/api";

//1. check the api request and response
//2. handle how the images are taken as input 

function AddTripPage() {
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [tripPhoto, setTripPhoto] = useState(undefined);

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] || null;
    setTripPhoto(selectedFile);
    console.log('Selected file:', selectedFile);
  };


  //calling the post API of cloudinary to upload image
  async function uploadFile(file) {
    //console.log(file);
    const url = `https://api.cloudinary.com/v1_1/djlozkenj/upload`;
    const fd = new FormData();
    fd.append('upload_preset', 'testing');
    fd.append('file', file);

    const response = await axios.post(
      url,
      fd,
    );

    console.log('Cloudinary response:', response.data);
    return response.data;
  }

  const validate = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!destination) newErrors.destination = "Destination is required";
    if (!description) newErrors.description = "Description is required";

    if (!duration || duration < 3 || duration > 30) {
      newErrors.duration = "Duration must be between 3 and 30 days";
    }

    if (!maxPeople || maxPeople < 3 || maxPeople > 15) {
      newErrors.maxPeople = "Max people must be between 3 and 15";
    }

    if (!budget || budget < 5000 || budget > 100000) {
      newErrors.budget = "Budget must be between ₹5,000 and ₹1,00,000";
    }

    if (!startDate || new Date(startDate) <= today) {
      newErrors.startDate = "Start date must be after today";
    }

    if (!tripPhoto) {
      newErrors.tripPhoto = "Trip photo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if (!validate()) return;

    const handleUpload = async () => {
      try{
        const apiResponse = await uploadFile(tripPhoto);
        const url = apiResponse.url;
        //console.log('Uploaded image public ID:', public_id);
        return url;
      }
      catch(err){
        console.error('Error uploading file:', err);
        throw err;
      }
    }

    try{
      const url = await handleUpload(); //this will be sent to backend to get images later
      console.log('Uploaded image public url:', url);
      const travelPostData = { 
        imageUrl: url,
        destination: destination, 
        startDate: startDate,
        duration: duration, 
        budget: budget,
        description: description,
        groupSize: maxPeople,
        //userId: 1 
        //travelType
        //userEmail
      };

      // Now send travelPostData to backend
      const response = await addTrip(travelPostData);
      console.log('Trip created successfully:', response.data);
      toast.success("Trip created successfully!");
      setDestination("");
      setDescription("");
      setDuration("");
      setMaxPeople("");
      setBudget("");
      setStartDate("");
      setTripPhoto(undefined);
      setErrors({});
    }
    catch(err){
      console.error('Error in file upload process:', err);
      toast.error("Failed to create trip. Please try again.");
      return;
    }
    

    
    

    //   setShowToast(true);
    //   setTimeout(() => setShowToast(false), 3000);
    //   // Reset form
    //   setDestination("");
    //   setDescription("");
    //   setDuration("");
    //   setMaxPeople("");
    //   setBudget("");
    //   setStartDate("");
    //   setTripPhoto("");
    //   setErrors({});

    // } catch (err) {
    //   setErrors(err.response?.data || err.message);
    //   console.error("Error making POST request:", err);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <Header />

      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50">
          🎉 Trip created successfully!
        </div>
      )}

      <div className="px-6 pt-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Create Trip
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Share a travel plan and find companions
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-4 mt-6 bg-white rounded-2xl shadow-sm p-6 space-y-6"
      >
        {/* Destination */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <LuMapPin /> Destination *
          </label>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="input"
            placeholder="Where are we going?"
          />
          {errors.destination && <p className="error">{errors.destination}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input resize-none"
            placeholder="Tell others about this trip..."
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        {/* Duration & Max People */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <CiCalendarDate /> Duration (days)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="input"
            />
            {errors.duration && <p className="error">{errors.duration}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <GoPeople /> Max People
            </label>
            <input
              type="number"
              value={maxPeople}
              onChange={(e) => setMaxPeople(e.target.value)}
              className="input"
            />
            {errors.maxPeople && <p className="error">{errors.maxPeople}</p>}
          </div>
        </div>

        {/* Budget & Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MdCurrencyRupee /> Budget
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="input"
            />
            {errors.budget && <p className="error">{errors.budget}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <CiCalendarDate /> Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input"
            />
            {errors.startDate && <p className="error">{errors.startDate}</p>}
          </div>
        </div>

        {/* Photo */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Trip Photo*
          </label>
          <input
            onChange={handleFileChange}
            className="input"
            type="file"
            placeholder="upload a file"
          />
          {errors.tripPhoto && <p className="error">{errors.tripPhoto}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-3 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          Create Trip
        </button>
      </form>

      <Footer activeTab="add" />
    </div>
  );
}

export default AddTripPage;
