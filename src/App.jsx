import './index.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./components/Login";
import Signup from "./components/SIgnup";
import Dashboard from "./components/Dashboard";
import CreateMoodBoard from "./components/CreateMoodBoard";
import Team from "./commonComponents/Team";
import Members from "./commonComponents/Members";
import Report from "./commonComponents/Report";
import ProjectPage from "./components/ProjectPage";
import ProjectDetails from "./components/ProjectDetails";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/moodBoard"
          element={
            <ProtectedRoute>
              <CreateMoodBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teams"
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teams/:teamId/owners"
          element={
            <ProtectedRoute>
              <Members />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projectDetails/:id"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
