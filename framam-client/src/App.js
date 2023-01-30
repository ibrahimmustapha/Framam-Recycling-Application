import "./App.css";
import LoginUser from "../src/components/auth/login";
import Users from "../src/components/profile/user";
import Error from "./components/error";
import Register from "./components/auth/register";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  const idToken = localStorage.getItem("idToken");
  return (
    <div className="">
      <Router>
        <Routes>
          <Route
            index
            path="/users/:uid"
            element={<Users key={window.location.pathname} />}
          />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
