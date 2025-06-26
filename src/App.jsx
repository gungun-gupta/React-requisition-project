import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Requisition from "./Components/Requisition";
import SupplierMaster from "./Components/SupplierMaster";
import LoginService from "./services/login.service";
import MainLayout from "./Components/MainLayout";

function App() {
  const user = LoginService.getUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected Layout with Sidebar + AppBar */}
        <Route element={<MainLayout />}>
          <Route path="/requisition" element={<Requisition />} />
          <Route path="/supplier" element={<SupplierMaster />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// function Layout() {
//   return (
//     <>
//       <Sidebar isOpen={true} onClose={() => {}} />
//       <div className="ml-64 p-4">
//         <Outlet />
//       </div>
//     </>
//   );
// }

export default App;
