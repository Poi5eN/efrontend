import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiExplosiveMaterials } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { links } from "../data/dummy";
import { Studentlinks } from "../data/dummy";
import { Teacherslinks } from "../data/dummy";
import { Parentslinks } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import logo from "../../src/ShikshMitraWebsite/assets/SHIKSHAMITRA_logo.png";


const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heights, setHeights] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    setHeights(refs.current.map((ref) => ref?.scrollHeight));
  }, [links]);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [openIndex, setOpenIndex] = useState(null);

  const handleMenuClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { currentColor, activeMenu, setActiveMenu, screenSize, isLoggedIn } =
    useStateContext();
  const [selectedId, setSelectedId] = useState(0);

  let mainLink = null;
  if (isLoggedIn === "student") {
    mainLink = Studentlinks;
  } else if (isLoggedIn === "teacher") {
    mainLink = Teacherslinks;
  }

  const handleCloseSideBar = (id) => {
    if (selectedId === id) {
      setSelectedId(0);
    } else {
      setSelectedId(id);
    }

   

    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };



  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2 duration-1000 cursor-pointer";
  // const activeLink ="flex items-center gap-5 pl-3 py-2 rounded-lg  text-white  text-sm m-1 duration-1500";
  const normalLink =
    "flex flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 duration-700 cursor-pointer";
  // "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 duration-700 cursor-pointer";
  // const normalLink ="flex items-center gap-5 pl-3 p-2  rounded-lg text-sm text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 duration-700";

  const navbarLink =
    "flex items-center pl-3  py-2 rounded-lg  text-white  text-sm m-1 cursor-pointer duration-700";

  {
    if (isLoggedIn === "student") {
      return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-blend-overlay  ">
          {/* <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-blend-overlay"> */}
          {activeMenu && (
            <>
              <div className="flex justify-between items-center ">
                <Link
                  style={{ color: currentColor }}
                  to="/student"
                  onClick={handleCloseSideBar}
                  className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                >
                  <div className="flex items-center space-x-2">
                    <GiExplosiveMaterials className="text-red-500 text-2xl" />
                    <span className="text-blue-900 text-xl">Student</span>
                  </div>
                </Link>
                <TooltipComponent content="Menu" position="BottomCenter">
                  <button
                    type="button"
                    onClick={() => setActiveMenu(!activeMenu)}
                    style={{ color: currentColor }}
                    className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                  >
                    <MdOutlineCancel />
                  </button>
                </TooltipComponent>
              </div>
              <div className="mt-10 overflow-x-scroll">
                {Studentlinks.map((item) => (
                  <div key={item.title}>
                    <Link
                      to="/student"
                      className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase"
                    >
                      {item.title}
                    </Link>
                    {item.links.map((link) => (
                      <NavLink
                        to={`/${link.route}`}
                        key={link.name}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                        })}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                      >
                        {link.icon}
                        <span className="capitalize cursor-pointer ">
                          {link.name}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      );
    } else if (isLoggedIn === "teacher") {
      return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-blend-overlay">
          {activeMenu && (
            <>
              <div className="flex justify-between items-center ">
                <Link
                  to="/teacher"
                  style={{ color: currentColor }}
                  onClick={handleCloseSideBar}
                  className="items-center gap-3 ml-4 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                >
                  <div className="flex items-center space-x-2">
                    <GiExplosiveMaterials className="text-red-500 text-2xl" />
                    <span
                      // className="text-blue-900 text-xl"
                      style={{ color: currentColor }}
                    >
                      Teacher
                    </span>
                  </div>
                </Link>
                <TooltipComponent content="Menu" position="BottomCenter">
                  <button
                    type="button"
                    onClick={() => setActiveMenu(!activeMenu)}
                    style={{ color: currentColor }}
                    className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                  >
                    <MdOutlineCancel />
                  </button>
                </TooltipComponent>
              </div>
              <div className="mt-10 ">
                {Teacherslinks.map((item) => (
                  <div key={item.title}>
                    <Link
                      to="/teacher"
                      style={{ color: currentColor }}
                      className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase  cursor-pointer"
                    >
                      {item.title}
                    </Link>
                    {item.links.map((link) => (
                      <NavLink
                        to={`/${link.route}`}
                        key={link.name}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                        })}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                      >
                        {link.icon}
                        <span className="capitalize cursor-pointer ">
                          {link.name}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      );
    } else if (isLoggedIn === "parent") {
      return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-blend-overlay">
          {activeMenu && (
            <>
              <div className="flex justify-between items-center ">
                <Link
                  style={{ color: currentColor }}
                  to="/parent"
                  onClick={handleCloseSideBar}
                  className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                >
                  <div className="flex items-center space-x-2">
                    <GiExplosiveMaterials className="text-red-500 text-2xl" />
                    <span className=" text-xl" style={{ color: currentColor }}>
                      Parent
                    </span>
                  </div>
                </Link>
                <TooltipComponent content="Menu" position="BottomCenter">
                  <button
                    type="button"
                    onClick={() => setActiveMenu(!activeMenu)}
                    style={{ color: currentColor }}
                    className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                  >
                    <MdOutlineCancel />
                  </button>
                </TooltipComponent>
              </div>
              <div className="mt-10 ">
                {Parentslinks.map((item) => (
                  <div key={item.title}>
                    <Link
                      style={{ color: currentColor }}
                      to="/parent"
                      className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase"
                    >
                      {item.title}
                    </Link>
                    {item.links.map((link) => (
                      <NavLink
                        to={`/${link.route}`}
                        key={link.name}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                        })}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                      >
                        {link.icon}
                        <span className="capitalize cursor-pointer ">
                          {link.name}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      );
    } else {
      return (
        // <div className="ml-4 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-blend-overlay ">
        <div className="overflow-auto h-screen w-full px-3 ">
          {/* <div className="ml-4 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto   "> */}
          {activeMenu && (
            <>
              <div className=" w-full flex justify-between items-center ">
                <Link
                  to="/admin"
                  onClick={handleCloseSideBar}
                  className="w-full"
                  // className="items-center gap-3 ml-4 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                >
                  <div className="w-[full]  ">
                    {/* <GiExplosiveMaterials className="text-red-500 text-3xl" /> */}
                    <div className="w-full  flex justify-center items-center">
                      <img
                        src={logo}
                        className="h-[60px]  object-contain scale-125 "
                      />
                    </div>
                    {/* <span className=" text-md font-medium text-cyan-700 bg-slate-700">ShikshaMitra</span> */}
                  </div>
                </Link>
                <TooltipComponent content="Menu" position="BottomCenter">
                  <button
                    type="button"
                    onClick={() => setActiveMenu(!activeMenu)}
                    style={{ color: currentColor }}
                    className="text-xl rounded-full p-3 hover-bg-light-gray mt-4 block md:hidden"
                  >
                    <MdOutlineCancel />
                  </button>
                </TooltipComponent>
              </div>

              {/* <div className="mt-5">
                {links.map((item, index) => (
                  <div
                    key={index}
                   
                    className="flex w-full flex-col border-yellow-200 border-2 pl-4 gap-5 px-2 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2 duration-100 delay-700 cursor-pointer"
                  
                    style={{
                      border: `1px solid ${currentColor} `,
                      color: currentColor,
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick(index);
                    }}
                  >
                    {item.children ? (
                      <>
                        <div
                          className={`transition-height  flex items-center gap-x-3  ${
                            openIndex === index ? "" : "max-h-full"
                          }`}
                        >
                          {item.icon}
                          {item.name}
                        </div>
                        {openIndex === index && (
                          <ul className=" w-full ">
                            {item.children.map((child, childIndex) => (
                              <Link
                                key={childIndex}
                                to={child.link}
                                style={{
                                  backgroundColor:
                                    selectedId === child?.id
                                      ? ""
                                      : currentColor,
                                }}
                                className="flex   items-center  border-2 pl-4 gap-5 pt-2 pb-1.5 rounded-md  text-white  text-md mb-1 duration-1000 delay-700 cursor-pointer"
                              >
                                {child.icon}
                                {child.name}
                              </Link>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.link}
                        style={{
                          backgroundColor:
                            selectedId === item.link?.id ? currentColor : "",
                        }}
                        // className={
                        //   selectedId === item.link?.id ? activeLink : normalLink
                        // }
                        className="w-full flex items-center gap-3"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div> */}

              <div className="">
                {links.map((item, index) => (
                  <div
                    key={index}
                    className="flex  flex-col pl-4  px-2 pt-3 pb-2.5 rounded-lg text-white text-md m-2 cursor-pointer"
                    style={{
                      border: `1px solid ${currentColor} `,
                      color: currentColor,
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick(index);
                    }}
                  >
                    {item.children ? (
                      <>
                        <div className="flex items-center gap-x-3 ">
                          {item.icon}
                          {item.name}
                        </div>
                        <div
                          ref={(el) => (refs.current[index] = el)}
                          style={{
                            height:
                              openIndex === index
                                ? `${refs.current[index]?.scrollHeight}px`
                                : "0px",
                            overflow: "hidden",
                            transition: "height 0.5s ease-in-out",
                          }}
                        >
                          <ul className="w-full mt-3">
                            {item.children.map((child, childIndex) => (
                              <Link
                                key={childIndex}
                                to={child.link}
                                style={{
                                  backgroundColor:
                                    selectedId === child?.id
                                      ? ""
                                      : currentColor,
                                }}
                                className="flex items-center border-2 pl-4  pt-2 pb-1.5 rounded-md text-white text-md mb-1 cursor-pointer"
                              >
                                {child.icon}
                                {child.name}
                              </Link>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link
                        to={item.link}
                        style={{
                          backgroundColor:
                            selectedId === item.link?.id ? currentColor : "",
                        }}
                        className="w-full flex items-center gap-3"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      );
    }
  }
};

export default Sidebar;
