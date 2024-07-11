import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const fullName = localStorage.getItem("fullName");
  const image = localStorage.getItem("image");
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const schoolName = localStorage.getItem("schoolName");

  return (
    // <div className="fixed z-[99] mb-10 bg-gray-100 w-full">
    <div className="flex justify-between relative ">
      {/* <div className="flex   justify-between  md:ml-6 md:mr-6 relative bg-yellow-400"> */}
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className=" w-full text-center dark:text-white ">
        <h1 className="text-xl ">{schoolName}</h1>
        <marquee
          className="html-marquee"
          direction="left"
          behavior="scroll"
          scrollamount="6"
        >
          <p style={{ color: currentColor }}>
            Technical Support and Query Helpline Numbers : +91 9650388201 /
            corplyxtechnologies@gmail.com{" "}
          </p>
        </marquee>
      </div>
      <div className="flex">
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex  items-center gap-2 cursor-pointer p-1 hover:bg-gray-900 rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full w-8 h-8"
              src={image}
              alt="user-profile"
            />
            <p>
              <span className="text-black-400 text-[12px] font-bold  dark:text-white ">
                Hi,
              </span>{" "}
              <span className="text-black-400 font-bold ml-1 text-[12px] dark:text-white">
                {fullName}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-black-600 text-15 dark:bg-white" />
          </div>
        </TooltipComponent>

        {/* {isClicked.notification && <Notification />} */}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
    // </div>
  );
};

export default Navbar;
