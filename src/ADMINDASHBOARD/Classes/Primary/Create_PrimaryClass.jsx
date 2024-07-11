import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Modal from "react-modal";
import axios from "axios";
import "../../../Dynamic/Form/FormStyle.css";
import DynamicDataTable from "./DataTable";
import InputForm from "../../../Dynamic/Form/InputForm";
import { useStateContext } from "../../../contexts/ContextProvider";
import Cookies from "js-cookie";
const authToken = Cookies.get("token");


function Create_PrimaryClass() {

    const { currentColor } = useStateContext();
  const modalStyle = {
    content: {
      // width: "80%",
      // top: "50%",
      // left: "50%",
      // right: "auto",
      // bottom: "auto",
      // marginRight: "-50%",
      // transform: "translate(-50%, -50%)",
      zIndex: 1000,
      // background:currentColor
    },
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    section: [],
    primary: true,
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createBookDependency, setCreateBookDependency] = useState(false);

  const isFormValid = () => {
    return formData.className && formData.subject && formData.section;
  };
  useEffect(() => {
    axios
      .get(
        `/api/api/v1/adminRoute/getAllClass?primary=${true}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data.classList)) {
          const filteredData = response.data.classList.filter(
            (item) => item.className <= 5
          );

          setSubmittedData(filteredData);
          console.log(filteredData);
        } else {
          console.error("Data format is not as expected:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [createBookDependency]);

  const handleFieldChange = (fieldName, value) => {
    if (fieldName === "section") {
      const updatedSections = [...formData.section];

      if (updatedSections.includes(value)) {
        const index = updatedSections.indexOf(value);
        updatedSections.splice(index, 1);
      } else {
        updatedSections.push(value);
      }

      setFormData({
        ...formData,
        section: updatedSections,
      });
    } else {
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      setLoading(true);
      axios.post(
        "/api/api/v1/adminRoute/createClass",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setFormData({
        className: "",
        subject: "",
        section: [],
      });

      setSubmittedData([...submittedData, formData]);
      setLoading(false);
      toast.success("Form submitted successfully!");
      closeModal();

      setCreateBookDependency(!createBookDependency);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  const handleDelete = async (className) => {
    try {
      const re = await axios.get(
        `http://localhost:4000/api/v1/adminRoute/getAllClass?className=${className}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

       await axios.delete(
        `http://localhost:4000/api/v1/adminRoute/deleteClass?_id=${re.data.classList[0]._id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Class data deleted successfully");

      setSubmittedData((prevData) =>
        prevData.filter((item) => item._id !== re.data.classList[0]._id)
      );
      setCreateBookDependency(!createBookDependency);

      toast.success("Class data deleted successfully");
    } catch (error) {
      console.error("Error deleting class data:", error);
      toast.error("An error occurred while deleting the class data.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formFields = [
    {
      label: "Class",
      name: "className",
      type: "select",
      value: formData.className,
      required: true,
      selectOptions: ["Class", "1", "2", "3", "4", "5"],
    },
    {
      label: "Subject",
      name: "subject",
      type: "text",
      value: formData.subject,
      required: true,
    },

    {
      label: "Section",
      name: "section",
      type: "select",
      value: formData.section,
      required: true,
      selectOptions: ["A", "B", "C", "D"], // Replace with your actual sections
      multiple: true, // Allow multiple selection
    },
  ];

  return (
    <div className=" mt-12 md:mt-1  mx-auto p-3">
    <h1 
    className="text-4xl font-bold mb-4 uppercase text-center  hover-text "
    style={{color:currentColor}}
    >
        Primary Class
      </h1>
      <button
        onClick={openModal}
        className="dark:text-white dark:bg-secondary-dark-bg text-gray-800  neu-btn border-2 "
            style={{border:`2px solid ${currentColor} `,color:currentColor}}
      >
        Add Class
      </button>
      {isModalOpen && <div className="modal-blur"></div>}
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Form"
        style={modalStyle}
        overlayClassName="overlay"
      >
        <h1
        className="text-xl font-bold mb-4 uppercase text-center  hover-text "
        style={{color:currentColor}}
        >
          Create Primary Class
        </h1>
        <InputForm
          fields={formFields}
          handleChange={handleFieldChange}
          handleImageChange={handleImageChange}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <button
            onClick={handleSubmit}
            className="dark:text-white dark:bg-secondary-dark-bg text-gray-800  neu-btn border-2 "
            style={{border:`2px solid ${currentColor} `,color:currentColor}}
          >
            {loading ? (
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              " Submit"
            )}
          </button>
          <button
            onClick={closeModal}
            className="dark:text-white dark:bg-secondary-dark-bg text-red-600 ml-2 neu-btn border-2 "
            style={{border:`2px solid red `,}}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <DynamicDataTable data={submittedData} handleDelete={handleDelete} />
    </div>
  );
}

export default Create_PrimaryClass;
