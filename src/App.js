import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";

import AuthProvider from './components/Context/AuthProvider';
import AppProvider from './components/Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import AddMember from './components/Modals/AddMemberVisible';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route element={<Login />} path="/login"/>
            <Route element={<ChatRoom />} path="/"/>
          </Routes>
          <AddRoomModal />
          <AddMember />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
