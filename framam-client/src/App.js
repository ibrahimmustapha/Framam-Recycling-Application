import "./App.css";
import LoginUser from "../src/components/auth/login";
import Users from "../src/components/profile/user";
import Error from "./components/error";
import Register from "./components/auth/register";
import Home from "./components/home";

import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route index path="/" element={<Home />} />
          <Route
            path="/users/:uid"
            element={<Users key={window.location.pathname} />}
          />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
