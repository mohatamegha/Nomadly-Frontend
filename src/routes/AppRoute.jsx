import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import DiscoverPage from "../pages/DiscoverPage";
import AddTripPage from "../pages/AddTripPage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import ProtectedLayout from "./ProtectedLayout";
import ChatPage from "../pages/ChatPage";
import ChatUI from "../pages/ChatUI";
import UpdateUserPage from "../pages/UpdateUserPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route element={<ProtectedLayout/>}>
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/discover" element={<DiscoverPage/>} />
        <Route path="/add-trip" element={<AddTripPage/>} />
        <Route path="/chats" element={<ChatPage/>}/>
        <Route path="/chat/:index" element={<ChatUI/>}></Route>
        <Route path="/update-profile" element={<UpdateUserPage/>}/>
      </Route>
    </Routes>
  )
}

export default AppRoutes;