// src/App.jsx
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/registerUser";
import FacebookCallback from "./components/FacebookCallback";
import { useSelector } from "react-redux";
import Success from "./pages/Success";

function App() {
  const user = useSelector((state) => state.auth.user);
  const isRegistered = useSelector((state) => state.auth.isRegistered);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/register"
          element={
            !user && !isRegistered ? <RegisterUser /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={!user ? <LoginUser /> : <Navigate to="/" />}
        />
        <Route path="/auth/facebook/callback" element={<FacebookCallback />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
