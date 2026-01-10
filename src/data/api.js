import axios from "axios";
import React from 'react'
const BASE_URL = "http://localhost:8080";

// Create axios instance (recommended)
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const getTravelCount = (id, token) => {
  return api.get(`/travels/${id}/count`, {
    headers: {
      Authorization: `Bearer ${token}`, // remove if endpoint is public
    },
  });
};
export const getUserTravels=(token)=>{
    return api.get("/users/me/travels",{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    })
}

export const getUsersForTravel=(id,token)=>{
    return api.get(`/travels/${id}/members`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    })
}

export const getRoleForUserAndTravel = (userId, travelId, token) => {
  return api.get("/travels/role", {
    params: {
      userId: userId,
      travelId: travelId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getHistory=(id,token)=>{
    return api.get(`/history/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    })
}
export const signUpUser=(data)=>{
    return api.post("/auth/signup",
       data
    )
}
export const LoginUser=(data)=>{
    return api.post("/auth/login",
       data
    )
}
export const addTrip=(data)=>{
        return api.post("/travels",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
    }
    export const leaveTrip=(id)=>{
    return api.delete(`/travels/delete/${id}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
    }
    )
}
export default api