import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { MdLocationOn } from "react-icons/md";

import { getTravelCount, getUsersForTravel, getUserTravels } from "../data/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ChatPage = () => {
  const token = localStorage.getItem("token");

  const [travelGroups, setTravelGroups] = useState([]);
  const [memberCounts, setMemberCounts] = useState({});
  const [travelUsers, setTravelUsers] = useState({});

  const navigate = useNavigate();

  const fetchCount = (travelId) => {
    getTravelCount(travelId, token)
      .then((res) => {
        setMemberCounts((prev) => ({
          ...prev,
          [travelId]: res.data,
        }));
      })
      .catch((err) => console.error("Count error", err));
  };

  const fetchUsers = (travelId) => {
    getUsersForTravel(travelId, token)
      .then((res) => {
        setTravelUsers((prev) => ({
          ...prev,
          [travelId]: res.data,
        }));
      })
      .catch((err) => console.error("Users error", err));
  };

  useEffect(() => {
    getUserTravels(token)
      .then((response) => {
        const travels = Array.isArray(response.data) ? response.data : [];
        setTravelGroups(travels);

        travels.forEach((travel) => {
          fetchCount(travel.travelId);
          fetchUsers(travel.travelId);
        });
      })
      .catch((error) => {
        console.error("Error fetching travel data", error);
      });
  }, []);

  const handleChat = (index) => {
    navigate(`/chat/${index}`, {
      state: {
        travelGroups,
        users: travelUsers || {},
        memberCounts: memberCounts || {},
      },
    });
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 pb-36">
        {/* Top Bar */}
        <div className="bg-white px-6 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-lg font-semibold">Chats</h1>
            <p className="text-sm text-gray-500">
              {travelGroups.length} groups joined
            </p>
          </div>

          <img
            src="/test.png"
            alt="profile"
            className="w-11 h-11 rounded-full object-cover"
          />
        </div>

        {/* EMPTY STATE */}
        {travelGroups.length === 0 && (
          <div className="h-[60vh] flex flex-col items-center justify-center text-gray-500 gap-1">
            <h2 className="text-lg font-medium">No chats yet</h2>
            <p className="text-sm">Join a trip to start chatting ✈️</p>
          </div>
        )}

        {/* CHAT LIST */}
        {travelGroups.length > 0 && (
          <ul className="bg-white mx-4 mt-4 rounded-xl overflow-hidden">
            {travelGroups.map((travel, index) => (
              <React.Fragment key={index}>
                <li
                  onClick={() => handleChat(index)}
                  className="flex gap-4 px-4 py-4 cursor-pointer hover:bg-gray-50"
                >
                  {/* Avatar */}
                  <img
                    src={travel.imageUrl || "/test.png"}
                    alt={travel.destination}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
                  />


                  {/* Content */}
                  <div className="flex flex-col gap-1 flex-1">
                    <h3 className="font-semibold text-base md:text-lg">
                      {travel.destination} trip
                    </h3>

                    {/* Location + members */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MdLocationOn />
                        India
                      </span>
                      <span>
                        👥 {memberCounts[travel.travelId] || 0}/
                        {travel.groupSize}
                      </span>
                    </div>

                    {/* Avatars + names */}
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex -space-x-2">
                        {(travelUsers[travel.travelId] || [])
                          .slice(0, 3)
                          .map((user) => (
                            <img
                              key={user.userId}
                              src={user.photo || "/test.png"}
                              alt={user.name}
                              className="w-6 h-6 rounded-full border-2 border-white"
                            />
                          ))}
                      </div>

                      <p className="text-sm text-gray-500 truncate">
                        {(travelUsers[travel.travelId] || [])
                          .slice(0, 3)
                          .map((u) => u.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                </li>

                <div className="ml-20 h-px bg-gray-200 opacity-60" />
              </React.Fragment>
            ))}
          </ul>
        )}
      </div>

      <Footer activeTab="chats" />
    </>
  );
};

export default ChatPage;
