import {
  AppBar,
  Box,
AvatarGroup,
  Toolbar,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  
} from "@mui/material";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { MdLocationOn } from "react-icons/md";
import React from "react";
import {getUsersForTravel, getUserTravels,getUserDetails } from "../data/api";

const ChatPage = () => {
const token=localStorage.getItem("token")
const [travelGroups,setTravelGroups]=useState([])
const [user,setUser]=useState([])
// const [memberCounts, setMemberCounts] = useState({});
const [travelUsers, setTravelUsers] = useState({});
useEffect(() => {
  getUserDetails(token).then((response)=>{
  setUser(response.data);
  console.log(user);
  }).catch((error)=>{
    console.error("Error loading user",error);
  })
  getUserTravels(token)
    .then((response) => {
      const travels = Array.isArray(response.data)
  ? response.data
  : [];
      setTravelGroups(travels);
      console.log(travels)
      // fetch count + users for each travel
      travels?.forEach(travel => {
        // fetchCount(travel.travelId);
        fetchUsers(travel.travelId);
      });
    })
    .catch((error) => {
      console.error("Error fetching travel data", error);
    });
}, []);

// const fetchCount = (travelId) => {
//   getTravelCount(travelId, token)
//     .then((res) => {
//       setMemberCounts(prev => ({
//         ...prev,
//         [travelId]: res.data
//       }));
//     })
//     .catch(err => console.error("Count error", err));
// };

const fetchUsers = (travelId) => {
  getUsersForTravel(travelId, token)
    .then((res) => {
      setTravelUsers(prev => ({
        ...prev,
        [travelId]: res.data
      }));
    })
    .catch(err => console.error("Users error", err));
};


  
  const navigate=useNavigate();
 const handleChat=(index)=>{
  
  navigate(`/chat/${index}`,
 {
  state:{
      
      travelGroups: travelGroups,
      users: travelUsers || {},
      memberCounts: travelGroups[index].membersJoined||0,
      loggedInUser:user
  }
 });
 }
  return (
    <Box sx={{ height: "100vh", bgcolor: "#f0f2f5" }}>
      {/* Top App Bar */}
      <AppBar position="static" >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Chats
            </Typography>
            <Typography variant="body2">
              {travelGroups.length} groups joined
            </Typography>
          </Box>

          <Avatar
            src="/test.png"
            sx={{ width:45,height:45}}
          />
        </Toolbar>
      </AppBar>

      {/* Chat List */}
      <List sx={{ bgcolor: "#fff" }}>
        {travelGroups?.map((travel,index) => (
          <React.Fragment key={index}>
            {console.log(index)}
            <ListItem button onClick={()=>handleChat(index)} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{width:{xs:"50px",md:"70px"},height:{xs:"50px",md:"70px"}}}src="/test.png" />
              </ListItemAvatar>
           <ListItemText
  primary={
    <Typography sx={{ marginLeft:"15px",fontWeight: "bold", fontSize: {xs:"1rem",md:"1.3rem"} }}>
      {travel.destination} trip
    </Typography>
  }
  secondary={
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      
      {/* Country + members count */}
      <Box sx={{ marginLeft:"15px",display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h7" color="text.secondary">
          <MdLocationOn /> India
        </Typography>
        <Typography variant="h7" color="text.secondary">
          👥 {travel.membersJoined || 0}/{travel.groupSize}
        </Typography>
      </Box>

      {/* Avatars + names */}
      <Box sx={{ marginLeft:"15px",display: "flex", alignItems: "center", gap: 1 }}>
        <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 12 } }}>
            {(travelUsers[travel.travelId] || []).map(user => (
    <Avatar
      key={user.userId}
      src={user.photo || "/test.png"}
      alt={user.name}
    />
  ))}
        </AvatarGroup>

        <Typography variant="body2" color="text.secondary">
          {(travelUsers[travel.travelId] || [])
    .slice(0, 3)
    .map(u => u.name)
    .join(", ")}
        </Typography>
      </Box>

    </Box>
  }
/>

            </ListItem>

            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ChatPage;
