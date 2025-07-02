import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Requisition from "./Components/Requisition";
import SupplierMaster from "./Components/SupplierMaster";
import MaterialMaster from "./Components/MaterialMaster";
import MaterialForm from "./Components/MaterialForm";
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
          <Route path="/MaterialMaster" element={<MaterialMaster />} />
          <Route path="/material/add" element={<MaterialForm />} />
          <Route path="/material/edit/:id" element={<MaterialForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
