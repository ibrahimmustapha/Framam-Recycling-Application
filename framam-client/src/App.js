import "./App.css";
import LoginUser from "../src/components/auth/login";
import User from "../src/components/profile/user";
import Error from "./components/error";
import Register from "./components/auth/register";
import Home from "./components/home";
import Users from "./components/profile/users";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route index path="/" element={<Home />} />
          <Route
            path="/users/:uid"
            element={<User key={window.location.pathname} />}
          />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/family" element={<Users />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
