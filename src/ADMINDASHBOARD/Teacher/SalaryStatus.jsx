import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import Cookies from "js-cookie";
const authToken = Cookies.get("token");

const SalaryStatus = () => {
  const { email } = useParams();
  const [teacherData, setTeacherData] = useState({});
  const [dues, setDues] = useState([]);
  const [salaryData, setSalaryData] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [formData, setFormData] = useState({
    feeStatus: "Paid",
    amountSubmitted: "",
    feeDate: "",
  });

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/v1/adminRoute/getTeachers?email=${email}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.data[0];
        const id = response.data.data[0]._id;
        console.log("data", data);
        setTeacherId(id);
        console.log("Id", id);
        setTeacherData(data);
      })
      .catch((error) => {
        console.error("Error fetching Teacher salary data: ", error);
      });
  }, [email]);

  const handleSearch = () => {
    const selectedYearElement = document.getElementById("yearDropdown");
    const selectedYear = selectedYearElement.value;

    // Fetch salary data based on the selected year
    axios
      .get(
        `http://localhost:4000/api/v1/teacher/getPaymentHistory?teacherId=${teacherId}&year=${selectedYear}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.data;
        const filteredData = data.map((item) => {
          if (item.year === selectedYear) {
            console.log(item.salaryHistory);
            setSalaryData(item.salaryHistory);
          }
          return item;
        });
        // console.log(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching Teacher salary data: ", error);
      });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleMonthsChange = (selectedOptions) => {
    setSelectedMonths(selectedOptions.map((option) => option.value));
  };

  const handleAmountSubmittedChange = (e) => {
    setFormData({ ...formData, amountSubmitted: e.target.value });
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, feeDate: e.target.value });
  };

  const calculateTotalAmount = () => {
    // Add your logic to calculate the total amount
    // For now, assuming the total amount is the teacher's salary
    return teacherData.salary;
  };

  const handleSubmit = () => {
    if (selectedMonths.length === 0) {
      alert("Please select at least one month for salary.");
      return;
    }

    const totalAmount = calculateTotalAmount();

    const newSalaryData = {
      teacherId: teacherData._id,
      salaryHistory: selectedMonths.map((month) => ({
        paidAmount: totalAmount,
        month: month,
        status: totalAmount === teacherData.salary ? "Paid" : "Unpaid",
        // Add other salary details if needed
      })),
    };

    const apiUrl = `http://localhost:4000/api/v1/teacher/salaryPay`;
    axios
      .post(apiUrl, newSalaryData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("Data Posted Successfully: ", response.data);
        // setSalaryData(response.data.salaryHistory);
        axios
          .get(
            `http://localhost:4000/api/v1/teacher/getPaymentHistory?teacherId=${teacherId}`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          .then((response) => {
            const data = response.data.data[0];
            console.log("Updated Salary", data);
            setSalaryData(response.data.data[0].salaryHistory);
          })
          .catch((error) => {
            console.error(
              "Error fetching updated Teacher salary data: ",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Error Posting Data: ", error);
      });

    setIsModalOpen(false);
  };

  return (
    <div className="py-8 px-4 md:px-8">
      {/* ... (rest of the code remains the same) */}
      <div className=" ">
        <h2 className="text-[14px]">Name : {teacherData.fullName}</h2>
        <h2 className="text-[14px]">Email : {teacherData.email}</h2>
        <h2 className="text-[14px]">Salary : {teacherData.salary}</h2>
        {/* Add other teacher details if needed */}
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={handleModalOpen}
        >
          Record Salary
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal p-4 bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2">
            <div className="flex justify-between">
              <span className="text-2xl font-semibold mb-4 text-indigo-600">
                Salary Form
              </span>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Months</label>
              <Select
                options={[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => ({
                  value: month,
                  label: month,
                }))}
                value={selectedMonths.map((month) => ({
                  value: month,
                  label: month,
                }))}
                onChange={handleMonthsChange}
                isMulti
                placeholder="Select months"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Amount Submitted</label>
              <input
                type="number"
                className="w-full border rounded-lg p-2"
                value={formData.amountSubmitted}
                onChange={handleAmountSubmittedChange}
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-gray-600">Salary Date</label>
              <input
                type="date"
                className="w-full border rounded-lg p-2"
                value={formData.feeDate}
                onChange={handleDateChange}
              />
            </div> */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {salaryData && (
        <div className="mt-8">
          <div className=" items-center">
            <h2 className="text-xl font-semibold mb-4">Salary History</h2>
            <select id="yearDropdown" className="mr-2 mb-2 md:mb-0 ">
              {/* Populate the dropdown with 5 years starting from 2024 */}
              {[...Array(5).keys()].map((index) => (
                <option key={index} value={2023 + index}>
                  {2023 + index}
                </option>
              ))}
            </select>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded m-1"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Month</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {salaryData.map((entry) => (
                <tr key={entry.month} className="border">
                  <td className="border p-2">{entry.month}</td>
                  <td className="border p-2">{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalaryStatus;
