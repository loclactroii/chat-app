import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";

import AuthProvider from './components/Context/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Login />} path="/login"/>
          <Route element={<ChatRoom />} path="/"/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
