import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import DiscoverPage from "../pages/DiscoverPage";
import AddTripPage from "../pages/AddTripPage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import ProtectedLayout from "./ProtectedLayout";

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
      </Route>
    </Routes>
  )
}

export default AppRoutes;