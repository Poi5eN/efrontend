
import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const authToken = Cookies.get("token");
const UserProfile = () => {
  const { currentColor } = useStateContext();

  const responseString = localStorage.getItem("response");
  const response = JSON.parse(responseString);
  const schoolName = response.schoolName;
  // console.log(schoolName);
  const image = localStorage.getItem("image");
  const email = localStorage.getItem("email");
  const userRole = sessionStorage.getItem("userRole");
  const navigate = useNavigate();

  const [schoolInfo, setSchoolInfo] = useState({
    schoolName: "",
    role: "",
    schoolImage: "",
  });

  const handleLogout = () => {
    // You can make an Axios request to your server to log the user out
    axios
      .get("https://ebackend-iasf.onrender.com/api/v1/logout")
      .then((response) => {
        // Handle successful logout, such as clearing user data and redirecting to the login page
        localStorage.removeItem("fullName"); // Clear user data from localStorage
        localStorage.removeItem("image");
        localStorage.removeItem("email");
        sessionStorage.removeItem("userRole");
        // You can also remove the user's token or other relevant data

        // Redirect the user to the login page or wherever is appropriate
        navigate("/");

        // Log a success message (optional)
        console.log("Logout Success", response);
      })
      .catch((error) => {
        // Handle any errors that occur during the logout process
        console.error("Logout error", error);
      });
  };

  useEffect(() => {
    axios
      .get(
        "https://ebackend-iasf.onrender.com/api/v1/adminRoute/getAdminInfo",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        // console.log("Response Success", response);
        const schoolImage = response.data.admin.image.url;
        const schoolName = response.data.admin.schoolName;
        const schoolContact=response.data.admin.contact;
        const schooladdress=response.data.admin.address;
        const role = response.data.admin.role;
        console.log("adminnnn",response.data)


        console.log("schooladdress",schooladdress)
        console.log("schoolContact",schoolContact)

        localStorage.setItem("schoolName",schoolName)
        localStorage.setItem("schoolContact",schoolContact)
        localStorage.setItem("schooladdress",schooladdress)

        setSchoolInfo({
          schoolName,
          role,
          schoolImage,
        });
      })
      
      .catch((error) => {
        // Handle any errors that occur during the logout process
        console.error("Response error", error);
      });
  }, []);

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      {userRole === "admin" ? null : (
        <>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg dark:text-gray-200">
              School Profile
            </p>
            <Button
              icon={<MdOutlineCancel />}
              color="rgb(153, 171, 180)"
              bgHoverColor="light-gray"
              size="2xl"
              borderRadius="50%"
            />
          </div>
          <div className="flex gap-5 items-center mt-1 border-color border-b-1 pb-1">
            <img
              className="rounded-full h-20 w-20"
              src={schoolInfo.schoolImage}
              alt="user-profile"
            />
            <div>
              <p className="font-semibold text-xl dark:text-gray-200">
                {schoolInfo.schoolName}
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {schoolInfo.role ? schoolInfo.role.toUpperCase() : ""}
              </p>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>

      <div className="flex gap-5 items-center mt-1 border-color border-b-1 pb-1">
        <img
          className="rounded-full h-14 w-14"
          src={image}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {schoolName}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {userRole ? userRole.toUpperCase() : ""}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {email}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <input
          type="button"
          value="Logout"
          onClick={handleLogout}
          style={{
            width: "100%",
            color: "white",
            backgroundColor: currentColor,
            borderRadius: "10px",
            cursor: "pointer",
            padding: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default UserProfile;
