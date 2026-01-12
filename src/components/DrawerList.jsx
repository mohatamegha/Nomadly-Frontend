import React from 'react'
import{
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Chip,
    Box,
    IconButton,
    Grid,
    Typography,Avatar,
    Button

} from "@mui/material"
import { useState,useEffect } from 'react';
import { getRoleForUserAndTravel, leaveTrip } from '../data/api';
import { LuClock } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";
import { IoPeopleSharp } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import styled from '@emotion/styled';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const StyledBox = styled(Box)(() => ({
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(237, 236, 236, 1)",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 186, 96, 1)",
  },
}));

const DrawerList = ({onExpand,travel,users,memberCount,id}) => {
  const [roles,setRoles]=useState({})
  const navigate=useNavigate();
  const token=localStorage.getItem("token")
  useEffect(() => {
  if (!users || users.length === 0) return;

  users.forEach((user) => {
    getRoleForUserAndTravel(user.userId, travel.travelId, token)
      .then((response) => {
        setRoles((prev) => ({
          ...prev,
          [user.userId]: response.data,
        }));
      })
      .catch((error) => {
        console.error(
          `Error fetching role for user ${user.userId}`,
          error
        );
      });
  });
}, [users, travel.travelId, token]);
const handleLeave=async()=>{
try {
   const response= await leaveTrip(travel.travelId); 
  console.log(response.data);
    toast.success(`Left ${travel.destination} Trip group!`);
    navigate("/chats");
  } catch (err) {
    toast.error("Failed to leave trip");
    console.error(err);
  }
}
  return (
    
      <Box sx={{width: { xs: "100vw", sm: 420, md: 700 }, maxWidth: "100vw", }}role="presentation"
>

      <Box sx={{ height: "100vh", bgcolor: "white"}}>
     <Grid container alignItems="center" spacing={{xs:3,md:3}} sx={{ px: { xs: 1, md: 2 },
    height: { xs: "72px", md: "80px" },backgroundColor:"white",boxShadow: "0 1px 4px rgba(0,0,0,0.1)"}} >
   <Grid item size={{xs:2,md:1}}>
        <IconButton sx={{transition: "background-color 0.2s ease, background-color 0.2s ease",
      "&:hover": {
        bgcolor: "rgba(235, 96, 27, 1)", 
      }}} onClick={onExpand(false)}>
          <RxCross2/>
        </IconButton>
      </Grid>

      {/* Group Avatar */}
      <Grid item size={{xs:2,md:1}}>
        <Avatar
          src={travel.imageUrl}
          sx={{
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
          }}
        />
      </Grid>

      {/* Trip name */}
      <Grid item size={{xs:4,md:8}}>
       <Box  >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.1rem", sm: "1.5rem" },
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color:'black'
          }}
        >
          {travel.destination}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}
        >
       {travel.country||"India"}
        </Typography>
        </Box>

        </Grid>
      </Grid>
      <Grid container spacing={{xs:1,md:2}} sx={{marginTop:'25px',height:'100px'}}>
        <Grid item size={{xs:4,md:4}}sx={{padding:'5px'}}>
        <StyledBox  sx={{
    minHeight: { xs: "30px", md: "50px" },
    px: 1,
    py: { xs: 1.5, md: 2 },
    gap: { xs: 0.5, md: 2 },
  }}

>
  <SlCalender size={20} />        

  <Typography
    sx={{
          fontSize: { xs: "1.4rem", md: "2rem" }, 
          fontWeight: "bold",
          lineHeight: 1,
        }}
  >
    {travel.duration}
  </Typography>

  <Typography sx={{ fontSize: { xs: "0.85rem", md: "1rem" }, color: "grey" }}>
    Days
  </Typography>
        </StyledBox>
      </Grid>
      <Grid item size={{xs:4,md:4}}sx={{padding:'5px'}}>
       <StyledBox  sx={{
    minHeight: { xs: "30px", md: "50px" },
    px: 1,
    py: { xs: 1.5, md: 2 },
    gap: { xs: 0.5, md: 2 },
  }}
 
>
  <IoPeopleSharp size={20} />        

  <Typography
   sx={{
          fontSize: { xs: "1.4rem", md: "2rem" }, // 👈 responsive text
          fontWeight: "bold",
          lineHeight: 1,
        }}
  >
    {travel.groupSize}
  </Typography>

  <Typography sx={{ fontSize: { xs: "0.85rem", md: "1rem" }, color: "grey" }}>
    People
  </Typography>
</StyledBox>
      </Grid>
      <Grid item size={{xs:4,md:4}}sx={{padding:'5px'}}>
         <StyledBox  sx={{
    minHeight: { xs: "30px", md: "50px" },
    px: 1,
    py: { xs: 1.5, md: 2 },
    gap: { xs: 0.5, md: 2 },
  }}

>
  <MdCurrencyRupee size={20} />       

  <Typography
   sx={{
          fontSize: { xs: "1.4rem", md: "2rem" },
          fontWeight: "bold",
          lineHeight: 1,
        }}
  >
    {travel.budget}
  </Typography>

  <Typography sx={{ fontSize: { xs: "0.85rem", md: "1rem" }, color: "grey" }}>
    Budget
  </Typography>
        </StyledBox>
      </Grid>
      </Grid>
      <Box sx={{ marginTop:"80px",px: 2, pb: 10 }}>
  
  {/* Start Date */}
  <Box sx={{  display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 4,
    p: 2,
    borderRadius: "12px",
    bgcolor: "rgba(237, 236, 236, 1)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",  }}>
    <LuClock style={{width:"20px",height:"20px"}} />
    <Box>
      <Typography variant="body2" color="text.secondary">
        Start Date
      </Typography>
      <Typography sx={{ fontWeight: "bold" }}>
        {travel.startDate}
      </Typography>
    </Box>
  </Box>
<Box sx={{ mb: 4 }}>
    <Typography sx={{ fontWeight: "bold", mb: 1 }}>
      About this trip
    </Typography>
    <Typography color="text.secondary">
      {travel.description}
    </Typography>
  </Box>
 <Box sx={{ mb: 4 }}>
  <Typography sx={{ fontWeight: "bold", mb: 2 }}>
    Travelers ({memberCount})
  </Typography>

  <List
    sx={{
      bgcolor: "#f5f5f5",           
      borderRadius: "12px",
      overflow: "hidden",
    }}
  >
   {users.map((user, index) => (
  <React.Fragment key={user.userId}>
    <ListItem>
      <ListItemAvatar>
        <Avatar src={user.photo}>
          {!user.photo && user.name?.[0]}
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={
          <Typography sx={{ fontWeight: "bold" }}>
            {user.name}
          </Typography>
        }
        secondary={
          roles[user.userId] === "CREATOR" ? "Trip Organizer" : "Traveller"
        }
      />

      {roles[user.userId] === "CREATOR" && (
        <Chip
          label="Host"
          size="small"
          sx={{
            bgcolor: "#e3f2fd",
            fontWeight: "bold",
          }}
        />
      )}
    </ListItem>

    {index !== users.length - 1 && <Divider />}
  </React.Fragment>
))}
</List>
</Box>

  <Box
    sx={{
      p: 2,
      borderRadius: "12px",
      bgcolor: "#f5f7fa",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Box>
      <Typography sx={{ fontWeight: "bold" }}>
        Spots Available
      </Typography>
      <Typography color="text.secondary">
        {travel.groupSize - memberCount} of {travel.groupSize} spots left
      </Typography>
    </Box>

    {/* Progress dots */}
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {Array.from({ length: travel.groupSize }).map((_, i) => (
        <Box
          key={i}
          sx={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            bgcolor:
              i < memberCount
                ? "#103459ff"
                : "#e0e0e0",
          }}
        />
      ))}
    </Box>

  </Box>
    <Button variant="contained" onClick={handleLeave} sx={{width:"150px",px:"3",py:"2",backgroundColor:"rgba(170, 55, 55, 1)", fontSize:"0.9rem" ,fontWeight:"bold",marginTop:"20px",marginLeft:"250px"}}>Leave Group</Button>
</Box>

    </Box>
   </Box>
  )
}

export default DrawerList