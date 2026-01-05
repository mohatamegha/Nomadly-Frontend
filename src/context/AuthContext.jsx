// import { createContext, useContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       const decoded = jwtDecode(storedToken);
//       if (decoded.exp * 1000 > Date.now()) {
//         setToken(storedToken);
//         setUser({ email: decoded.sub });
//       } else {
//         localStorage.removeItem("token");
//       }
//     }
//   }, []);

//   const login = (newToken) => {
//     localStorage.setItem("token", newToken);
//     const decoded = jwtDecode(newToken);
//     setToken(newToken);
//     setUser({ email: decoded.sub });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{
//       token,
//       user,
//       isAuthenticated: !!token,
//       login,
//       logout
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
