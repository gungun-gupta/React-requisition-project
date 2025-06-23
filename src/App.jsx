import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login1 from "./Components/Login1";
import Requisition from "./Components/Requisition";
import SupplierMaster from "./Components/SupplierMaster";
import Sidebar from "./Components/Sidebar";
import Try from "./Components/Try";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login1 />} />
        <Route path="/requisition" element={<Requisition />}/>
        <Route path="/supplier" element={<SupplierMaster/>}/>
        <Route path="/try" element={<Try />}/>
        </Routes>
    </BrowserRouter>
    
  );
}
function Layout() {
  return (
    <>
      <Sidebar isOpen={true} onClose={() => {}} />
      <div className="ml-64 p-4">
        <Outlet />
      </div>
    </>
  );
}
const root =ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)

export default App;
