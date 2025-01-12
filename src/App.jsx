import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/Login/Login.jsx";
import AdminHome from "./pages/AdminHome/AdminHome.jsx";
import UserHome from "./pages/UserHome/UserHome.jsx";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/admin-home" element={<AdminHome/>}/>
              <Route path="/user-home" element={<UserHome/>}/>
          </Routes>
      </Router>
  )
}

export default App
