import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import NavbarComp from "./components/Navbar";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useEffect} from 'react'
import { useDispatch } from "react-redux";
import { getTracking } from "./redux/features/tracking/trackingSlice";

function App() {
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(getTracking());
  // })

  return (
    <BrowserRouter>
    <NavbarComp />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="orders" element={<Order/>}></Route>
        <Route path="contact" element={<Contact/>}></Route>
        <Route path="admin" element={<Admin/>}></Route>
      </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
