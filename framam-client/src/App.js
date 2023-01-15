import './App.css';
import LoginUser from '../src/components/auth/Login';
import Users  from '../src/components/Profile/User';
import Error from './components/ErrorPage';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <h1>Welcome, Framam Recycling!</h1>
      <Router>
        <Routes>
        <Route index path='/' element={<LoginUser />} />
        <Route path='/users/:uid' element={<Users key={window.location.pathname} />} />
        <Route path='*' element={<Error />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
