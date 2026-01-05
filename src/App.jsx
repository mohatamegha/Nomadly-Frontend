import { BrowserRouter } from "react-router-dom";
import AddTripPage from "./pages/AddTripPage";
import DiscoverPage from "./pages/DiscoverPage";
import HomePage from "./pages/HomePage";
import AppRoutes from "./routes/AppRoute";
// import { AuthProvider } from "./context/AuthContext";
// import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">
      {/* <DiscoverPage/> */}
      {/* <AddTripPage/> */}
      {/* <ProfilePage/> */}
      {/* <HomePage/> */}
      <BrowserRouter>
        {/* <AuthProvider> */}
          <AppRoutes/>
        {/* </AuthProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;