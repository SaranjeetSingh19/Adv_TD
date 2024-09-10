import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";

import { Toaster } from 'react-hot-toast';
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Navigate } from 'react-router-dom';
import { useState } from "react";


const WithAuth = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


function App() {
  const [theme, setTheme] = useState(true)

  const themeHandler = () => {
    setTheme((prev) => !prev);
  }

  return (
    <>
    <div className={`${theme && "dark"}`}>
      <div className=" bg-zinc-100 dark:bg-black min-h-screen">
        <Navbar themeHandler={themeHandler} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <WithAuth>
                <HomePage />
              </WithAuth>
            }
          />
          <Route
            path="/create"
            element={
              <WithAuth>
                <CreatePage />
              </WithAuth>
            }
          />
        </Routes>
        <Toaster />
      </div>
      </div>
    </>
  );
}

export default App;
