import './App.css';
import { Login } from './components/auth/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <h1>Welcome, Framam Recycling!</h1>
      <Router>
        <Routes>
        <Route index element={<Login />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
