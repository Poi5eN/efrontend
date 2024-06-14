import React, { useEffect, useState } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { dropdownData } from "../data/dummy";
import PieChart from "../pages/Charts/PieChart";
import {
  FcConferenceCall,
  FcBusinesswoman,
  FcCurrencyExchange,
} from "react-icons/fc";
import { BiMaleFemale, BiSolidStoreAlt } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";

import Calendar from "../pages/Calendar";
import axios from "axios";
import ActivePieChart from "../pages/Charts/ActivePieChart";
import EarningChart from "../CHART/EarningChart";

import CreateNotice from "../CreateNotice";
import StudentApexChart from "../CHART/StudentApexChart";
import ExamChart from "../CHART/ExamChart";
import TeacherNotice from "./TeacherNotice";
import Cookies from "js-cookie";
const authToken = Cookies.get("token");

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const TeacherHome = () => {
  const [teacherCount, setTeacherCount] = useState([]);
  const [studentCount, setStudentCount] = useState([]);
  const [parentCount, setParentCount] = useState([]);
  const [earningData, setEarningData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch teacher count
  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/api/v1/adminRoute/getTeachers",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          console.log(response.data.data[0]);
          setTeacherCount(response.data.data.length);
        } else {
          console.error("Data format is not as expected:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching teacher count:", error);
      });
  }, []);

  // Fetch student count
  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/api/v1/adminRoute/getAllStudents",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data.allStudent)) {
          console.log(response.data.allStudent);
          setStudentCount(response.data.allStudent.length);
        } else {
          console.error("Data format is not as expected:", response.allStudent);
        }
      })
      .catch((error) => {
        console.error("Error fetching student count:", error);
      });
  }, []);

  // Fetch Parents
  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios
      .get(
        "http://localhost:4000/api/v1/adminRoute/getAllParents",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          }, // Set withCredentials to true
        }
      )
      .then((response) => {
        setParentCount(response.data.allParent.length);
        console.log(response.data.allParent);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(studentCount);
  // Generate earning data based on teacher and student count
  useEffect(() => {
    const newEarningData = [
      {
        icon: <FcConferenceCall />,
        amount: `${studentCount}`,
        percentage: "-4%",
        title: "Students",
        iconColor: "#03C9D7",
        iconBg: "#E5FAFB",
        pcColor: "red-600",
      },
      {
        icon: <FcBusinesswoman />,
        amount: `${teacherCount}`,
        percentage: "+23%",
        title: "Teachers",
        iconColor: "rgb(255, 244, 229)",
        iconBg: "rgb(254, 201, 15)",
        pcColor: "green-600",
      },
      {
        icon: <FcCurrencyExchange />,
        amount: "423,39",
        percentage: "+38%",
        title: "Earning",
        iconColor: "rgb(228, 106, 118)",
        iconBg: "rgb(255, 244, 229)",
        pcColor: "green-600",
      },
      {
        icon: <BiMaleFemale />,
        amount: `${parentCount}`,
        percentage: "-12%",
        title: "Parents",
        iconColor: "rgb(0, 194, 146)",
        iconBg: "rgb(235, 250, 242)",
        pcColor: "red-600",
      },
    ];
    setEarningData(newEarningData);
  }, [teacherCount, studentCount, parentCount]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
      }
    };

    // Disable the back button in the browser's address bar
    const handlePopstate = (event) => {
      event.preventDefault();
      window.history.pushState(null, null, window.location.pathname);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopstate);

    return () => {
      // Clean up event listeners when the component unmounts
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return (
    <div className="mt-12">
      <div className="grid gap-3 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 p-3">
        <div className="p-2 rounded-md text-center bg-white col-span-2 dark:text-white dark:bg-secondary-dark-bg">
          <button
            type="button"
            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl bg-[#03C9D7]"
          >
            <FcConferenceCall />
          </button>
          <StudentApexChart />
        </div>
        <div className="p-2 rounded-md text-center bg-white col-span-2 dark:text-white dark:bg-secondary-dark-bg">
          <button
            type="button"
            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl bg-[#03C9D7]"
          >
            <FcBusinesswoman />
          </button>
          <ExamChart />
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-3 gap-3 lg:flex">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-3 md:col-span-2 md:w-2/2 lg:w-1/2">
          <EarningChart />
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-3 md:col-span-2 md:w-2/2  lg:w-1/2">
          <TeacherNotice />
        </div>
      </div>

      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-3">
        <Calendar />
      </div>
    </div>
  );
};

export default TeacherHome;
