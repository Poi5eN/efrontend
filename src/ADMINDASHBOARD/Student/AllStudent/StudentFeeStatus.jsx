import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select"; // Import the Select component
import { useStateContext } from "../../../contexts/ContextProvider";
import Cookies from "js-cookie";
const authToken = Cookies.get("token");
const StudentFeeStatus = () => {
  const { currentColor } = useStateContext();
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

        setAdditionalFees(feesData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [isModalOpen]);
  {
    console.log("studentData", studentData);
    console.log("examData", examData);
  }

  // console.log("dataaaa",typeof(getTotalFeesAmount() - formData.amountSubmitted))
  const dueAmount=examData.map((data)=>{
    return +(getFee-data.paidAmount)
})
console.log("dueAmount",dueAmount)
// const dueAmount = examData.map((data) => {
//   const getFeeNumber =Number(getFee); 
//   const paidAmountNumber = Number(data.paidAmount);
//   return getFeeNumber - paidAmountNumber;
// });

console.log("dueAmount", dueAmount);

  // const sumOfDues=(dueAmount.reduce((acc,curr)=>{
  //    return acc+curr
  // }));
  // console.log("summm",sum)

  // console.log("ssss",d)

  const schoolName = localStorage.getItem("schoolName");
  const schoolContact = localStorage.getItem("schoolContact");
  const schoolAddress = localStorage.getItem("schooladdress");


  return (
    <div>
      <div className="flex justify-start ms-7">
        <button
          className="bg-gray-400 mb-8 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded"
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
                <label className="block text-gray-600">Fee Status</label>
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
      <div className=" w-full overflow-scroll ">
        <div className="w-full flex mx-auto px-3   gap-3">
          <div className=" border-dashed border-e-2 pe-5 border-gray-800   rounded-sm p-2">
            <div className="flex justify-between border-b-2 border-red-600 mb-1 ">
              <div className=" h-24 w-24 ">
                <img className="h-[100%] w-[100%]" src={""} alt="logo" />
              </div>
              <div className="text-end  ">
                <h1 className="font-semibold">{schoolName}</h1>
                <p className="text-sm">Address: {schoolAddress} </p>
                <p className="text-sm">Contact: {schoolContact}</p>
             
                <p className="mb-2 text-sm">
                  <span className="border-e-2 border-blue-500 px-2 ">
                    IT Service
                  </span>
                  <span className="border-e-2 border-blue-500 px-2">
                    IT Service
                  </span>
                  <span className="border-e-2 border-blue-500 px-2">
                    IT Service
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-black text-white text-center">
              <h1 className="text-sm">FEE RECEIPT</h1>
            </div>
            <h1 className="text-center text-lg ">Parent Copy</h1>
            <div className="flex justify-between text-[12px]">
              <div>
                <p>
                  <span className="font-bold"> Name : </span>
                  {studentData.fullName}
                </p>
                <p>
                  <span className="font-bold">F/Name : </span>
                  {studentData.fatherName}
                </p>
                <p>
                  <span className="font-bold">Email : </span>
                  {studentData.email}
                </p>
                <p>
                  <span className="font-bold">Class : </span>
                  {studentData.class}
                </p>
                <p>
                  <span className="font-bold">Phone : </span>
                  {studentData.contact}
                </p>
                <p>
                  <span className="font-bold">DOB : </span>
                  {new Date(studentData.dateOfBirth).toLocaleDateString(
                    "en-US"
                  )}
                </p>
                <p>
                  <span className="font-bold">Address : </span>
                  {studentData.address}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-bold">Receipt No. :</span>Jitender
                </p>
               
                <p>
                  <span className="font-bold">Payment Mode :</span>Ramesh
                </p>
                <p>
                  <span className="font-bold">Collected By :</span>June 2023
                </p>
              </div>
            </div>

            <div>
              <div>
                <div className="-mx-4 sm:-mx-8  sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr className=" bg-red-400 p-1">
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Months
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Fee Type
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Status
                          </th>

                          <th className="px-1  py-3 border-b-2  border-r-2  border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Discount
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Due Amount
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Payment Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {examData.map((data, index) => (
                          <tr key={index}>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data.month}
                              </p>
                            </td>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Fee Type
                              </p>
                            </td>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data.status}
                              </p>
                            </td>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data.paidAmount}
                              </p>
                            </td>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap"></p>
                            </td>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {+getFee - data.paidAmount}
                              </p>
                            </td>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {new Date(data.date).toLocaleDateString(
                                  "en-GB"
                                )}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div>Signature</div>
                <div>
                  {/* Dues:{sumOfDues} */}
                  
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-sm p-2">
            <div className="flex justify-between border-b-2 border-red-600 mb-1 ">
              <div className=" h-24 w-24 ">
                <img className="h-[100%] w-[100%]" src={""} alt="logo" />
              </div>
              <div className="text-end  ">
                <h1 className="font-semibold">{schoolName}</h1>
                <p className="text-sm">Address: {schoolAddress} </p>
                <p className="text-sm">Contact: {schoolContact}</p>
             
                <p className="mb-2 text-sm">
                  <span className="border-e-2 border-blue-500 px-2 ">
                    IT Service
                  </span>
                  <span className="border-e-2 border-blue-500 px-2">
                    IT Service
                  </span>
                  <span className="border-e-2 border-blue-500 px-2">
                    IT Service
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-black text-white text-center">
              <h1 className="text-sm">FEE RECEIPT</h1>
            </div>
            <h1 className="text-center text-lg ">Office Copy</h1>
            <div className="flex justify-between text-[12px]">
              <div>
                <p>
                  <span className="font-bold"> Name : </span>
                  {studentData.fullName}
                </p>
                <p>
                  <span className="font-bold">F/Name : </span>
                  {studentData.fatherName}
                </p>
                <p>
                  <span className="font-bold">Email : </span>
                  {studentData.email}
                </p>
                <p>
                  <span className="font-bold">Class : </span>
                  {studentData.class}
                </p>
                <p>
                  <span className="font-bold">Phone : </span>
                  {studentData.contact}
                </p>
                <p>
                  <span className="font-bold">DOB : </span>
                  {new Date(studentData.dateOfBirth).toLocaleDateString(
                    "en-US"
                  )}
                </p>
                <p>
                  <span className="font-bold">Address : </span>
                  {studentData.address}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-bold">Receipt No. :</span>Jitender
                </p>
               
                <p>
                  <span className="font-bold">Payment Mode :</span>Ramesh
                </p>
                <p>
                  <span className="font-bold">Collected By :</span>June 2023
                </p>
              </div>
            </div>

            <div>
              <div>
                <div className="-mx-4 sm:-mx-8  sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr className=" bg-red-400 p-1">
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Months
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Fee Type
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Status
                          </th>

                          <th className="px-1  py-3 border-b-2  border-r-2  border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Discount
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Due Amount
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Payment Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {examData.map((data, index) => (
                          <tr key={index}>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data.month}
                              </p>
                            </td>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Fee Type
                              </p>
                            </td>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data.status}
                              </p>
                            </td>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data.paidAmount}
                              </p>
                            </td>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap"></p>
                            </td>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {+getFee - data.paidAmount}
                              </p>
                            </td>
                            <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {new Date(data.date).toLocaleDateString(
                                  "en-GB"
                                )}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div>Signature</div>
                <div>
                  {/* Dues:{sumOfDues} */}
                  
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default StudentFeeStatus;
