import React, { useEffect, useState } from 'react'
import { useStateContext } from './contexts/ContextProvider'
import { Outlet, Route, Routes,useNavigate,useLocation } from 'react-router-dom';

import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import "./App.css";
// import DashBoard from './PARENTDASHBOARD/DashBoard';
// // import Contact from './PARENT/Contact';
// import Curriculum from './PARENTDASHBOARD/Curriculum';
// import Events from './PARENTDASHBOARD/Events';
// import MyKids from './PARENT/MyKids';
// import Notification from './PARENTDASHBOARD/Notification';
// import Results from './PARENTDASHBOARD/Results';
// import ParentContact from './PARENTDASHBOARD/ParentContact';
// import Expenses from './PARENTDASHBOARD/Expenses';

function ParentDashboard() {
  const location = useLocation()
const navigate = useNavigate()
  const [singleLog,setSingleLog] = useState(sessionStorage.getItem('userRole'));
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    isLoggedIn,
    setisLoggedIn
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  
  console.log(singleLog)
  if( singleLog ){
    setisLoggedIn(singleLog)
  }
  console.log(isLoggedIn);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
    {/* {isLoggedIn == "parent" && ( */}
    { (( isLoggedIn == 'parent' && (singleLog=='parent'))  ) && (
      <>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}
                <Outlet/>
            </div>
            <Footer />
          </div>
        </div>
      </>
    )}
  </div>
      
  )
}

export default ParentDashboard