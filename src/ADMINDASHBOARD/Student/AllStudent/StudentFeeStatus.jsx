import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select"; // Import the Select component
import { useStateContext } from "../../../contexts/ContextProvider";
import Cookies from 'js-cookie';
const authToken = Cookies.get('token');
const StudentFeeStatus = () => {
  const { currentColor} = useStateContext();
  const { email } = useParams();
  const [studentData, setStudentData] = useState({});
  const [dues, setDues] = useState([]);
  const [AdditionalFees, setAdditionalFees] = useState([]);
  // const demoAdditionalFees = [
  //   { id: 1, name: "Exam Fee", amount: 50 },
  //   { id: 2, name: "Library Fee", amount: 30 },
  // ];

  const studentId = studentData._id;

  // console.log(studentId);

  const [feeData, setFeeData] = useState({});
  const [getFee, setGetFee] = useState({});

  // Get Students
  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/v1/adminRoute/getAllStudents?email=${email}`,
        {
          withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
        }
      )
      .then((response) => {
        const data = response.data.allStudent[0];
        setStudentData(data);
      })
      .catch((error) => {
        console.error("error fetching Student data : ", error);
      });
  }, [email]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examData, setExamData] = useState([]);
  console.log(examData);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedAdditionalFees, setSelectedAdditionalFees] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    feeAmount: "",
    FeeMonth: "",
    feeDate: "",
    feeStatus: "",
  });

  const handleMonthsChange = (selectedOptions) => {
    console.log(selectedOptions);
    setSelectedMonths(selectedOptions.map((option) => option.value));
  };

  const handleAdditionalFeesChange = (selectedOptions) => {
    setSelectedAdditionalFees(selectedOptions);
  };

  const handleModalOpen = () => {
    axios
      .get(`http://localhost:4000/api/v1/adminRoute/getFees`, {
        withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      })
      .then((response) => {
        const data = response.data;
        console.log("Fee Type", data);
        const feeTypeArray = data;

        const studentClass = studentData.class;
        console.log("ajay", studentData);
        console.log(studentClass);

        if (Array.isArray(feeTypeArray)) {
          const studentFeeAmount = feeTypeArray
            .filter((feeType) => feeType.className === studentClass)
            .map((classData) => classData.amount);

          console.log("Fee Amount for the class", studentFeeAmount);
          setGetFee(studentFeeAmount);
          setIsModalOpen(true);
        } else {
          console.error("Invalid or undefined feeTypeArray");
        }
      })
      .catch((error) => {
        console.error("Error fetching Fee data: ", error);
      });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFeeChange = (e) => {
    setFormData({ ...formData, feeAmount: e.target.value });
  };

  const handleFeeStatusChange = (e) => {
    setFormData({ ...formData, feeStatus: e.target.value });
  };

  const handleSubjectChange = (e, index) => {
    const updatedExamInfo = [...formData.additionalType];
    updatedExamInfo[index].feeName = e.target.value;
    setFormData({ ...formData, additionalType: updatedExamInfo });
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, feeDate: e.target.value });
  };

  const handleAddSubject = () => {
    const updatedExamInfo = [
      ...formData.additionalType,
      {
        feeName: "",
        additionalFeeDate: "",
        feeType: "",
        startTime: "",
        endTime: "",
        subjectTotalMarks: "",
      },
    ];
    setFormData({ ...formData, additionalType: updatedExamInfo });
  };
  const handleMonthChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (selectedMonths.length === 0) {
      alert("Please select at least one month for regular fees.");
      return;
    }

    const totalAmount = getTotalFeesAmount();
    const dues = totalAmount - formData.amountSubmitted;
    const feeStatus = dues === 0 ? "Paid" : "Unpaid";

    const newExamData = {
      studentId: studentId,
      feeHistory: selectedMonths.map((month) => ({
        paidAmount: formData.amountSubmitted,
        month: month,
        status: feeStatus,
        date: formData.feeDate,
        studentId: studentId,
      })),
      dues: dues,
    };

    const apiUrl = "http://localhost:4000/api/v1/fees/createFeeStatus";
    axios
      .post(apiUrl, newExamData, {
        withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      })
      .then((response) => {
        console.log("Data Posted Successfully: ", response.data);

        axios
          .get(
            `http://localhost:4000/api/v1/fees/getFeeStatus?studentId=${studentId}`,
            {
              withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
            }
          )
          .then((response) => {
            const data = response.data.data;
            if (Array.isArray(data) && data.length > 0) {
              const feeHistory = data[0].feeHistory;
              const Dues = data[0].dues;
              setDues(Dues);
              setExamData(feeHistory);
            } else {
              setExamData([]);
            }
          })
          .catch((error) => {
            console.error("Error fetching Fee Status data: ", error);
          });
      })
      .catch((error) => {
        console.error("Error Posting Data: ", error);
      });

    setIsModalOpen(false);
  };

  const handleAmountSubmittedChange = (e) => {
    setFormData({ ...formData, amountSubmitted: e.target.value });
  };

  // Fee Status
  useEffect(() => {
    if (studentId && Object.keys(studentData).length > 0) {
      axios
        .get(
          `http://localhost:4000/api/v1/fees/getFeeStatus?studentId=${studentId}`,
          {
            withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
          }
        )
        .then((response) => {
          const data = response.data.data;
          console.log("Fee Type", data);

          if (Array.isArray(data) && data.length > 0) {
            const feeHistory = data[0].feeHistory;
            const Dues = data[0].dues;
            console.log(Dues);
            setDues(Dues);
            setExamData(feeHistory);
          } else {
            setExamData([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching Fee Status data: ", error);
        });
    }
  }, [studentId, studentData, !isModalOpen]);

  const getTotalFeesAmount = () => {
    const regularFeesAmount = getFee * selectedMonths.length;

    // Check if selectedAdditionalFees is an array before using reduce
    const additionalFeesAmount = Array.isArray(selectedAdditionalFees)
      ? selectedAdditionalFees.reduce(
          (total, fee) => total + parseFloat(fee.value),
          0
        )
      : 0;

    return regularFeesAmount + additionalFeesAmount;
  };

  // Get  Additional Fee

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios
      .get("http://localhost:4000/api/v1/adminRoute/getAdditionalFees", {
        withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      })
      .then((response) => {
        // Assuming response.data is an array of fees
        const feesData = response.data.map((fee) => {
          const label =
            fee.name && fee.amount
              ? `${fee.name} (${fee.amount})`
              : "Unknown Fee";
          const value = fee.amount ? fee.amount.toString() : "0"; // Adjust the default value as needed

          return {
            label,
            value,
          };
        });

        // console.log("Fetched Additional Fees:", response.data); // Log the fetched data
        // console.log("Mapped Additional Fees:", feesData); // Log the mapped data

        setAdditionalFees(feesData);
        // console.log(" Additional Fees:", AdditionalFees); // Log the mapped data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [isModalOpen]);

  return (
    <div className="py-8 px-4 md:px-8">
      <div className=" flex justify-center mt-4">
        {studentData.image && studentData.image.url ? (
          <img
            className="w-[80px] h-[80px] rounded-full"
            src={studentData.image.url}
            alt="Image"
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <div className=" ">
        <h1 className="text-cyan-700 font-bold uppercase text-2xl">Student</h1>
        <h2 className="  text-xl text-cyan-700 font-semibold">Name : {studentData.fullName}</h2>
        <h2 className="  text-xl text-cyan-700 font-semibold">Email : {studentData.email}</h2>
        <h2 className="  text-xl text-cyan-700 font-semibold">Class : {studentData.class}</h2>
        <h2 className="  text-xl text-red-600 font-semibold ">Dues : {dues}</h2>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={handleModalOpen}
        >
          Create Fee
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal p-4 bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2">
            <div className="flex justify-between">
              <span className="text-2xl font-semibold mb-4 text-indigo-600">
                Fee Form
              </span>
              <span className="text-2xl font-semibold mb-4 text-indigo-600">
                Fee Amounts: {getFee}
              </span>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Regular Fee</label>

              <input
                type="text"
                value={getFee}
                readOnly
                className="border rounded-lg p-2w-full"
              />
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
              <label className="block text-gray-600">Additional Fees</label>
              <Select
                id="additional-fees"
                options={AdditionalFees}
                value={selectedAdditionalFees}
                onChange={handleAdditionalFeesChange}
                isMulti={true}
                placeholder="Select additional fees"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="mb-4">
                <label className="block text-gray-600"
                >Fee Status</label>
                <select
                  className="w-full border rounded-lg p-2"
                  value={formData.feeStatus || "Unpaid"} // Use formData.feeStatus or set it to "Unpaid" by default
                  onChange={(e) =>
                    setFormData({ ...formData, feeStatus: e.target.value })
                  }
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
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
              <div className="mb-4">
                <label className="block text-gray-600">Fee Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg p-2"
                  value={formData.feeDate}
                  onChange={handleDateChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Total Fees Amount</label>
                <p>{getTotalFeesAmount()}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Dues</label>
                <p>{getTotalFeesAmount() - formData.amountSubmitted}</p>
              </div>
            </div>
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

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Fee Details
        </h2>
        <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-cyan-700 text-white text-center">
                <th className="border  px-4 py-2 ">Months</th>
                <th className="border  px-4 py-2">Status</th>
                <th className="border  px-4 py-2">Paid Amount</th>
                <th className="border  px-4 py-2">Fee Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {examData.map((data, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{data.month}</td>
                  <td className="border px-4 py-2">{data.status}</td>
                  <td className="border px-4 py-2">{data.paidAmount}</td>
                  <td className="border px-4 py-2">
                    {new Date(data.date).toLocaleDateString("en-GB")}
                  </td>{" "}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentFeeStatus;
