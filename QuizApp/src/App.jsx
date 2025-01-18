import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Common/Navbar";
import { Route, Routes } from "react-router-dom";
import Quiz from "./Pages/Quiz";
import LeaderBoard from "./Pages/LeaderBoard";
import Register from "./Pages/Register";
import ProtectedRoutes from "./Utils/ProtectedRoutes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home page, accessible only to authenticated users */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        {/* Quiz page, accessible only to authenticated users */}
        <Route
          path="/Quiz/:userId"
          element={
            <ProtectedRoutes>
              <Quiz />
            </ProtectedRoutes>
          }
        />
        {/* Leaderboard page, accessible only to authenticated users */}
        <Route
          path="/LeaderBoard/:userId"
          element={
            <ProtectedRoutes>
              <LeaderBoard />
            </ProtectedRoutes>
          }
        />
        {/* Register page, accessible to everyone */}
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
