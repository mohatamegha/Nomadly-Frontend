import React, { useState } from 'react'
import {
  Typography,
  Avatar,
  AvatarGroup,
  Button,
  Drawer,
  Box,
  Grid,
  IconButton,
  TextField
} from "@mui/material"
import { IoMdArrowBack } from "react-icons/io";
import { useEffect } from 'react';
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import { getHistory } from '../data/api';

import { IoIosSend } from "react-icons/io";
import DrawerList from '../components/DrawerList';
import { IoIosArrowForward } from "react-icons/io";
import styled from '@emotion/styled';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
const BackIcon = styled(IoMdArrowBack)(() => ({
  fontSize: "28px",
  color: "rgba(3, 6, 31, 1)",
}));


const ChatUI = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const { index } = useParams();
  const indexNum = Number(index);
  console.log(indexNum)

  const { users, memberCounts, travelGroups } = location.state || {};
  const travel = travelGroups[indexNum]
  console.log(travelGroups)

  console.log(travelGroups[indexNum])
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = React.useState([]);
  const stompClientRef = React.useRef(null);

  const connectWebSocket = (travelId) => {
    // Prevent duplicate connections
    if (stompClientRef.current?.active) {
      return;
    }

    const client = new Client({
      webSocketFactory: () =>
        new SockJS("http://localhost:8080/ws"),

      reconnectDelay: 5000,

      onConnect: () => {
        console.log("WebSocket connected");

        client.subscribe(`/topic/chat/${travelId}`, (message) => {
          const receivedMsg = JSON.parse(message.body);
          setMessages((prev) => [...prev, receivedMsg]);
        });
      },

      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
        console.error("Details:", frame.body);
      },
    });

    client.activate();
    stompClientRef.current = client;
  };

  useEffect(() => {
    getHistory(travel.travelId, token)
      .then((response) => {
        setMessages(response.data);
        console.log("Message history:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching chat history", error);
      });

    // 2️⃣ Connect WebSocket
    connectWebSocket(travel.travelId);

    // 3️⃣ Cleanup on unmount
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [travel.travelId]);


  const handleSend = () => {
    if (!message.trim()) return;

    const payload = {
      content: message,
      userId: 3,
      travelId: travel.travelId,
    };

    stompClientRef.current.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(payload),
    });

    setMessage("");
  };


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleClick = () => {
    navigate(-1)
  }
  return (
    <Box sx={{ height: "100vh", bgcolor: "#e3e7ecff" }}>
      <Grid container alignItems="center" spacing={{ xs: 2, md: 1 }} sx={{ paddingTop: '10px', height: "80px", backgroundColor: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }} >
        <Grid item size={{ xs: 1.5, md: 0.5 }}>
          <IconButton sx={{
            transition: "background-color 0.2s ease, background-color 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(235, 96, 27, 1)",
            }
          }} onClick={() => handleClick()}>
            <BackIcon />
          </IconButton>
        </Grid>

        {/* Group Avatar */}
        <Grid item size={{ xs: 2, md: 0.7 }}>
          <Avatar
            src={travel.imageUrl || "/test.png"}
            onError={(e) => (e.target.src = "/test.png")}
            sx={{
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
            }}
          />

        </Grid>

        {/* Trip name */}
        <Grid item size={{ xs: 4, md: 8 }} sx={{ display: "flex", alignItems: "center" }}>
          <Box onClick={toggleDrawer(true)} sx={{
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.2s ease", "&:hover": {
              bgcolor: "#f0f0f0"
            },
          }}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.1rem", sm: "1.5rem" },
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: 'black'
              }}
            >
              {travel.destination}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}
            >
              {memberCounts[travel.travelId]} members joined
            </Typography>
          </Box>

        </Grid>
        <Grid item size={{ xs: 1.5, md: 0.5 }}>
          <IconButton sx={{
            transition: "background-color 0.2s ease, background-color 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(235, 96, 27, 1)",
            }
          }} onClick={toggleDrawer(true)}><IoIosArrowForward /></IconButton>

          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} >
            <DrawerList onExpand={toggleDrawer} travel={travel} users={users[travel.travelId]} memberCount={memberCounts[travel.travelId]} />
          </Drawer>
        </Grid>

        {/* Avatar Group */}
        <Grid item size={{ xs: 2 }}>
          <AvatarGroup
            max={4}
            sx={{
              justifyContent: "flex-end",
              "& .MuiAvatar-root": {
                width: { xs: 28, sm: 40 },   // 👈 reduced by 2 sizes on mobile
                height: { xs: 28, sm: 40 },
                fontSize: { xs: 10, sm: 12 },
              },
            }}
          >
            <Avatar src="/static/images/avatar/1.jpg" />
            <Avatar src="/static/images/avatar/2.jpg" />
            <Avatar src="/static/images/avatar/3.jpg" />
            <Avatar src="/static/images/avatar/4.jpg" />
          </AvatarGroup>
        </Grid>
      </Grid>
      <Box sx={{ pt: "90px", pb: "90px", px: 3 }}>
        {messages.map((msg, index) => {
          const isMe = msg.user.userId === 29; // replace with loggedInUserId

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMe ? "flex-end" : "flex-start",
                mb: 3,
              }}
            >


              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <Avatar
                  src={msg.user.photo || "/test.png"}
                  sx={{ width: 36, height: 36, mr: 1 }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#546e7a",
                  }}
                >
                  {msg.user.name}
                </Typography>
              </Box>


              {/* Message bubble */}
              <Box
                sx={{
                  bgcolor: isMe ? "#DCF8C6" : "#EAF4FB", // 👈 green vs light blue
                  px: 2,
                  py: 1.4,
                  borderRadius: "14px",
                  maxWidth: "70%",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    lineHeight: 1.4,
                    color: "#000",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.content}
                </Typography>
              </Box>

              {/* Timestamp */}
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#5e6163ff",
                  mt: 0.5,
                  ml: isMe ? 0 : 6, // aligns under bubble for others
                }}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Box>
          );
        })}
      </Box>


      {/* Bottom Message Input */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          px: 2,
          py: 1,
          bgcolor: "white",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              backgroundColor: "#f0f2f5",
            },
          }}
        />

        <IconButton
          sx={{
            bgcolor: "#1976d2",
            color: "white",
            "&:hover": {
              bgcolor: "#1565c0",
            },
          }}
          onClick={handleSend}
        >
          <IoIosSend />
        </IconButton>
      </Box>

    </Box>
  )
}

export default ChatUI