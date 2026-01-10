import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform
} from "framer-motion";
// import { mockTravels } from "../data/mockData";
import toast from "react-hot-toast";
import axios from "axios";

const SWIPE_THRESHOLD = 0.15;

function TravelListings() {
  const [travels, setTravels] = useState([]);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleRightSwipe = (travelId) => {
    commitSwipe(1);
    console.log(travelId);
    console.log("Right swipe detected - Interested in this trip!");
    const joinTrip = async() =>{
      const response = await axios.post(
        `http://localhost:8080/travels/${travelId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log(response);
    }

    joinTrip();
  };


  const fetchTravels = async () => {
    try{
      const response = await axios.get(
        'http://localhost:8080/travels',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );  
      const fetchedTravels = response.data.map( (travel) => (
        {
          travelId: travel.travelId,
          destination: travel.destination,
          startDate: travel.startDate,
          duration: travel.duration,
          budget: travel.budget,
          description: travel.description,
          groupSize: travel.groupSize,
          currentMembersCount: travel.membersJoined,
          coverPhoto: travel.imageUrl
        }
      ));
      setTravels(fetchedTravels);
    }
    catch(err){
      console.error("Error fetching travel listings:", err);
      toast.error("Failed to fetch travel listings. Please try again.");
      return;
    }
  };
  
  useEffect( () => {
    fetchTravels();
  }, []);

  const travel = travels[index];

  // Motion values
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-12, 0, 12]);
  const y = useTransform(x, [-300, 0, 300], [-40, 0, 40]);

  if (!travel) {
    return <p className="text-center mt-20">No more trips 🎉</p>;
  }

  const commitSwipe = (dir) => {
    if (isExiting) return;

    setIsExiting(true);
    setDirection(dir);

    // 🔥 HARD RESET motion values BEFORE index change
    x.set(0);

    setIndex((i) => i + 1);
  };

  const handleDragEnd = (_, info) => {
    const swipeRatio = info.offset.x / window.innerWidth;

    if (Math.abs(swipeRatio) > SWIPE_THRESHOLD) {
      if (swipeRatio > 0) {
        handleRightSwipe(travel.travelId);   // ❤️ RIGHT SWIPE
      } else {
        commitSwipe(-1);      // ❌ LEFT SWIPE
      }
    }
  };


  return (
    <div className="relative w-full h-[70vh] flex justify-center pt-4 overflow-hidden">
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => {
          // 🔥 CRITICAL: clear exit state for next card
          setIsExiting(false);
          setDirection(0);
        }}
      >
        <motion.div
          key={travel.travelId}
          className="absolute w-[90vw] h-[65vh] rounded-3xl shadow-2xl overflow-hidden"
          drag="x"
          style={{
            x,
            y,
            rotate,
            backgroundImage: `url(${travel.coverPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            touchAction: "none",
            cursor: isExiting ? "default" : "grab"
          }}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            x: direction * window.innerWidth * 1.2,
            rotate: direction * 18,
            opacity: 0
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 32
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Card content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white space-y-4">
            <h1 className="text-3xl font-semibold">
              {travel.destination}
            </h1>

            <div className="flex gap-4 text-sm opacity-90">
              <span>📍 India</span>
              <span>📅 {travel.startDate}</span>
            </div>

            <p className="text-sm opacity-90">
              {travel.description}
            </p>

            <div className="flex gap-3 flex-wrap">
              <div className="px-4 py-1 rounded-full border border-white/30 text-sm">
                👥 {travel.currentMembersCount}/{travel.groupSize}
              </div>
              <div className="px-4 py-1 rounded-full border border-white/30 text-sm">
                🗓 {travel.duration} days
              </div>
              <div className="px-4 py-1 rounded-full border border-white/30 text-sm">
                ₹ {travel.budget}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-around pt-4">
              <button
                disabled={isExiting}
                onClick={() => commitSwipe(-1)}
                className="text-4xl disabled:opacity-40"
                >
                ❌
              </button>

              <button
                disabled={isExiting}
                onClick={()=>handleRightSwipe(travel.travelId)}
                className="text-4xl disabled:opacity-40"
              >
                ❤️
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default TravelListings;