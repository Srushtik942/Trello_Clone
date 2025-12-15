import './index.css'
import Login from './components/Login'
import { Routes,Route } from 'react-router-dom'
import Signup from './components/SIgnup'
import { Toaster } from "react-hot-toast";
import Dashboard from './components/Dashboard';
import CreateMoodBoard from './components/CreateMoodBoard';
import Team from './commonComponents/Team';
import Members from './commonComponents/Members';

function App() {
  const isLoggedIn = () =>{
    const token = localStorage.getItem("token");
    return !!token;
  }

  return (
    <>
    <div><Toaster/></div>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/moodBoard" element={<CreateMoodBoard/>}/>
      <Route path="/teams"element={<Team/>}/>
      <Route path="/teams/:teamId/owners" element={<Members />} />

 {/* Protected Route */}
        <Route
          path="/dashboard"
          element={isLoggedIn() ? <Dashboard /> : <Login />}
        />

    </Routes>

    </>
  )
}

export default App
