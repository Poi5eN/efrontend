import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { dropdownData } from "../data/dummy";
import PieChart from "../pages/Charts/PieChart";
import { useStateContext } from "../contexts/ContextProvider";
import {
  FcConferenceCall,
  FcBusinesswoman,
  FcCurrencyExchange,
} from "react-icons/fc";
import { BiMaleFemale } from "react-icons/bi";
import Calendar from "../pages/Calendar";
import axios from "axios";
import ActivePieChart from "../pages/Charts/ActivePieChart";
import EarningChart from "../CHART/EarningChart";
import CreateCurriculum from "./CreateCurriculum";
import CreateNotice from "../CreateNotice";
import CreateExams from "./Exams/AllExams";
import TeacherNotice from "../TEACHERDASHBOARD/TeacherNotice";
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
const DashboardHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [teacherCount, setTeacherCount] = useState([]);
  const [studentCount, setStudentCount] = useState([]);
  const [parentCount, setParentCount] = useState([]);
  const [earningData, setEarningData] = useState([]);
  const [totalSellAmount, setTotalSellAmount] = useState(0);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  // Fetch teacher count


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
          setStudentCount(response.data.allStudent.length);
        } else {
          console.error("Data format is not as expected:", response.allStudent);
        }
      })
      .catch((error) => {
        console.error("Error fetching student count:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/api/v1/adminRoute/getAllParents",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        setParentCount(response.data.allParent.length);
        console.log("P2 parent", response.data.allParent);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/api/v1/adminRoute/getAllItems",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data.listOfAllItems)) {
          const aggregatedSellAmounts = {};

          response.data.listOfAllItems.forEach((item) => {
            const category = capitalize(item.category);
            const sellAmount = parseFloat(item.sellAmount);

            if (aggregatedSellAmounts[category] === undefined) {
              aggregatedSellAmounts[category] = sellAmount;
            } else {
              aggregatedSellAmounts[category] += sellAmount;
            }
          });

          const extractedCategories = Object.keys(aggregatedSellAmounts);
          const extractedAmount = Object.values(aggregatedSellAmounts);

          const totalSellAmount = extractedAmount.reduce(
            (acc, amount) => acc + amount,
            0
          );

          setTotalSellAmount(totalSellAmount);
        }
      })
      .catch((error) => {
        console.error("Error fetching item list:", error);
      });
  }, []);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/v1/fees/getFeeStatus`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        const totalAmount = response.data.data;

        let monthlyPaidAmounts = {};

        totalAmount.forEach((total) => {
          if (total.feeHistory && total.feeHistory.length > 0) {
            total.feeHistory.forEach((fee) => {
              const paidAmount = Number(fee.paidAmount || 0);
              const month = fee.month;

              if (!monthlyPaidAmounts[month]) {
                monthlyPaidAmounts[month] = { paid: 0, dues: 0 };
              }

              monthlyPaidAmounts[month].paid += paidAmount;
              monthlyPaidAmounts[month].dues += total.dues || 0;
            });
          }
        });

        const paidSeries = Object.values(monthlyPaidAmounts).map(
          (data) => data.paid
        );
        const totalPaid = paidSeries.reduce(
          (total, amount) => total + amount,
          0
        );
        setTotalPaidAmount(totalPaid);
      })
      .catch((error) => {
        console.error("Error fetching Fees data: ", error);
      });
  }, []);

  useEffect(() => {
    const newEarningData = [
      {
        icon: <FcConferenceCall />,
        amount: `${studentCount}`,
        title: "Students",
        iconColor: "#fff",
        iconBg: "rgb(254, 201, 15)",
        pcColor: "red-600",
      },
      {
        icon: <FcBusinesswoman />,
        amount: `${teacherCount}`,
        title: "Teachers",
        iconColor: "#fff",
        iconBg: "rgb(254, 201, 15)",
        pcColor: "green-600",
      },
      {
        icon: <FcCurrencyExchange />,
        amount: `${totalSellAmount + totalPaidAmount}`,
        title: "Earning",
        iconColor: "#fff",
        iconBg: "rgb(254, 201, 15)",
        pcColor: "green-600",
      },
      {
        icon: <BiMaleFemale />,
        amount: `${parentCount}`,
        title: "Parents",
        iconColor: "#fff",
        iconBg: "rgb(254, 201, 15)",
        pcColor: "red-600",
      },
    ];

    setEarningData(newEarningData);
  }, [
    teacherCount,
    studentCount,
    parentCount,
    totalPaidAmount,
    totalSellAmount,
  ]);

  useEffect(() => {
    window.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
      }
    });

    navigate(location.href, { replace: true });
    window.addEventListener("popstate", function (event) {
      navigate(location.href, { replace: true });
    });
  }, [navigate]);

  return (
    <div className="md:mt-12 mt-16">
      <div class="relative  ">
        {earningData.map((item) => (
          <div class="w-1/2 sm:w-1/4 float-left">
            <div class="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg  p-1 m-2 flex justify-center rounded-2xl">
              <div
                key={item.title}
                className="bg-white h-44 dark:text-dark dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl text-center text-red font-semibold"
              >
                <button
                  type="button"
                  style={{
                    color: item.iconColor,
                  background:currentColor,
                  }}
                  className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-2xl "
                >
                  {item.icon}
                </button>
                <p className="mt-3 text-gray-700 dark:text-gray-200 ">
                  <span className="text-lg font-semibold">{item.amount}</span>
                  <span className={`text-sm text-${item.pcColor} ml-2`}>
                    {item.percentage}
                  </span>
                </p>
                <p className="text-sm  font-semibold  mt-1"
                style={{color:currentColor}}
                >
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div class="clearfix"></div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2 p-3">
        <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg  rounded-2xl p-3">
          <EarningChart />
        </div>
        <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg   rounded-2xl p-3">
          {/* <CreateNotice /> */}
          <TeacherNotice />
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg   rounded-2xl p-3 gap-2 flex justify-center items-center flex-col">
          <div className="p-2   ">
            <PieChart />
            {/* <ActivePieChart /> */}
          </div>
          <div className="p-2   ">
            {/* <PieChart /> */}
            <ActivePieChart />
          </div>
        </div>
        <div className="bg-white  dark:text-white dark:bg-secondary-dark-bg   rounded-2xl p-3">
          {/* <h1 className="text-xl text-center font-semibold text-cyan-700 mb-4">Calendar</h1> */}
          <Calendar />
        </div>
      </div>
    </div>
  );
};
export default DashboardHome;
