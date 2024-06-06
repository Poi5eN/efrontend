import React from 'react';

import Footer from './component/Footer/Footer'

import { Outlet } from 'react-router-dom';
import Nav from './component/Navbar/Nav';


function LandingPage() {
  return (
    <div className=" overflow-x-hidden">
      
      <Nav/>
     
      <Outlet/>
      <Footer/>
    </div>
  );
}
export default LandingPage;
