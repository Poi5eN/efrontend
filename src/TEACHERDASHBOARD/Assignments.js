import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useStateContext } from "../contexts/ContextProvider";
const authToken = Cookies.get("token");



const Api_Create =
  "http://localhost:4000/api/v1/adminRoute/createAssignment";
const Api_Update =
  "http://localhost:4000/api/v1/adminRoute/updateAssignment/";
const Api_GetAssiignment =
  "http://localhost:4000/api/v1/adminRoute/getAllAssignment";
const Api_GetAll =
  "http://localhost:4000/api/v1/adminRoute/getAllClass";
const API_DELETE =
  "http://localhost:4000/api/v1/adminRoute/deleteAssignment/6538e0fb0c6aa38bbddec27b";

const Assignments = () => {
  const { currentColor} = useStateContext();
  const [data, setData] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [assignmentDeleted, setAssignmentDeleted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    className: "",
    section: [],
    subject: [],
    image: null,
  });
  const [assignmentData, setAssignmentsData] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleGradeChange = (e) => {
    const selectedGrade = e.target.value;
    setSelectedGrade(selectedGrade);

    // Set the selected grade's courses in the form data
    const selectedClass = data.find((item) => item.className === selectedGrade);

    if (selectedClass) {
      // setFormData({ ...formData, className: selectedGrade, section:selectedClass.section.join(','), course: selectedClass.subject.join(',') });
      setFormData({
        ...formData,
        className: selectedGrade,
        section: selectedClass.section,
        subject: selectedClass.subject,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("dueDate", formData.dueDate);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("className", formData.className);
    formDataToSend.append("section", formData.section);
    formDataToSend.append("subject", formData.subject);

    axios
      .post(Api_Create, formDataToSend, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          className: "",
          section: "",
          subject: "",
          image: null,
        });
        setShouldFetchData(!shouldFetchData);
        setSelectedGrade("");
        setSelectedSection("");
        setSelectedSubject("");
      })
      .catch((error) => {
        console.error("Error creating assignment:", error);
      });
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/api/v1/adminRoute/getAllClass",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        const { classList } = response.data;
        console.log("GetALLCLASS--->", classList);
        setData(classList);
      })
      .catch((error) => {
        console.error("Error fetching class data:", error);
      });
  }, []);
  console.log("Class", data);

  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/api/v1/adminRoute/getAllAssignment",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        console.log("DATA-->", response.data);
        const { allAssignment } = response.data;
        console.log("GetALLCLASS--->", allAssignment);
        setAssignmentsData(allAssignment);
      })
      .catch((error) => {
        console.error("Error fetching class data:", error);
      });
  }, [shouldFetchData, assignmentDeleted]);

  const handleDeleteAssignment = (index) => {
    const assignmentId = assignmentData[index]._id;
    axios
      .delete(
        "http://localhost:4000/api/v1/adminRoute/deleteAssignment/" +
          assignmentId,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then(() => {
        setAssignmentDeleted(!assignmentDeleted);
        const updatedAssignments = [...assignmentData];
        updatedAssignments.splice(index, 1);
        setAssignmentsData(updatedAssignments);
      })
      .catch((error) => {
        console.error("Error deleting assignment:", error);
      });
  };

  const handleSectionChange = (e) => {
    console.log(data);
    const selectedSection = e.target.value;
    setSelectedSection(selectedSection);
    setFormData({ ...formData, section: [selectedSection] });
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setSelectedSubject(selectedSubject);
    setFormData({ ...formData, subject: [selectedSubject] });
  };

  console.log(assignmentData);
  return (
    <>
      <div className="p-6 w-full max-w-md mx-auto  rounded-md shadow-md"
      // style={{background:currentColor}}
      >
        <h1 className="text-xl font-bold mb-4 uppercase text-center  hover-text "
        style={{color:currentColor}}
        >
          Create Homework Assignment
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="mb-4">
              <label
                htmlFor="classValue"
                className="text-sm font-medium text-gray-600 block"
              >
                Class
              </label>

              <select
                className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
                value={selectedGrade}
                onChange={handleGradeChange}
              >
                <option value="">Select Grade</option>
                {/* {data.map((item) => (
                  <option key={item.className} value={item.className}>
                    {item.className}
                  </option>
                ))} */}
                {data
                  .slice()
                  .sort(
                    (a, b) =>
                      parseInt(a.className, 10) - parseInt(b.className, 10)
                  )
                  .map((item) => (
                    <option key={item.className} value={item.className}>
                      {item.className}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="section"
                className="text-sm font-medium text-gray-600 block"
              >
                Section
              </label>

              <select
                id="section"
                className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
                value={selectedSection}
                onChange={handleSectionChange}
              >
                <option value="">Select Section</option>
                {selectedGrade &&
                  data
                    .find((item) => item.className === selectedGrade)
                    .section.map((item, index) => {
                      console.log(item); // Log each item to the console
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="subjectValue"
                className="text-sm font-medium text-gray-600 block"
              >
                Subject
              </label>

              <select
                className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
                value={selectedSubject}
                onChange={handleSubjectChange}
              >
                <option value="">Select Subject</option>
                {selectedGrade &&
                  data
                    .find((item) => item.className === selectedGrade)
                    .subject.map((item, index) => {
                      let str = item;
                      let result_array = str.split(',');
                  
                      return result_array.map((data, subIndex) => (
                        <option key={index + subIndex} value={data}>
                          {data}
                        </option>
                      ));
                                  
})}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-600 block"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
                placeholder="Enter assignment title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-600 block"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
                placeholder="Enter assignment description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="text-sm font-medium text-gray-600 block"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="pdfFile"
                className="text-sm font-medium text-gray-600 block"
              >
                Upload PDF
              </label>
              <input
                type="file"
                accept=".pdf"
                id="pdfFile"
                className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
                onChange={handleFileChange}
              />
            </div>
          </div>
          {/* Existing input fields for title, description, dueDate, and pdfFile go here */}
         <div className="w-full text-center">
         <button
            onclick={handleSubmit}
            type="submit"
            className="dark:text-white dark:bg-secondary-dark-bg text-gray-800   mx-auto neu-btn border-2 "
            style={{border:`2px solid ${currentColor} `,color:currentColor}}
        // style={{color:currentColor}}
          >
            Create Assignment
          </button>
         </div>
        </form>
      </div>
      <div className="mt-4 p-3">
        <h2 className="text-lg font-semibold text-cyan-700 text-center uppercase my-3">
          Created Assignments
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full  rounded-md border-collapse">
            <thead className=" bg-cyan-600 text-white ">
              <tr className="border">
                <th className="p-4 border">Title</th>
                <th className="p-4 border">Description</th>
                <th className="p-4 border">Due Date</th>
                <th className="p-4 border">Class</th>
                <th className="p-4 border">Section</th>
                <th className="p-4 border">Subject</th>
                <th className="p-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignmentData.map((item, index) => (
                <tr key={index} className="border text-center">
                  <td className="p-4 border">{item.title}</td>
                  <td className="p-4 border">{item.description}</td>
                  <td className="p-4 border">{item.dueDate}</td>
                  <td className="p-4 border">{item.className}</td>
                  <td className="p-4 border">{item.section}</td>
                  <td className="p-4 border">{item.subject}</td>
                  <td className="p-4 border">
                    <button
                      onClick={() => handleDeleteAssignment(index)}
                      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Assignments;
