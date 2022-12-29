import React,{StrictMode} from "react";
import Login from "./Auth/Login";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Dashboard from "./Dashboard/Dashboard";
import Article from "./Article/Article";
function App() {
    return (

        <StrictMode>
        <BrowserRouter>
        <Routes>
      <Route path="/app/login" element={<Login />} />
      <Route
        path="/app/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
        <Route
        path="/app/article"
        element={
          <ProtectedRoute>
            <Article />
          </ProtectedRoute>
        }
      />
    </Routes>
        </BrowserRouter>
      </StrictMode>
    );
}

export default (App);