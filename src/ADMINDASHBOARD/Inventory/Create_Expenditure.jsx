// import React, { useState, useEffect } from "react";
// import InputForm from "../../Dynamic/Form/InputForm";
// import { toast } from "react-toastify";
// import DataTable from "../../Dynamic/DataTable/DynamicDataTable";
// import Modal from "react-modal";
// import axios from "axios";
// import StockTable from "./StockDataTable";

// const modalStyle = {
//   content: {
//     width: "80%",
//     margin: "0 auto",
//     zIndex: 1000,
//     borderRadius: "8px",
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
//     border: "none",
//   },
// };

// function Create_Sales() {
//   const [formData, setFormData] = useState({
//     itemName: "",
//     category: "",
//     quantity: "",
//     price: "",
//   });

//   const [submittedData, setSubmittedData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleFieldChange = (fieldName, value) => {
//     setFormData({
//       ...formData,
//       [fieldName]: value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     console.log(file)
//     if (file) {
//       setFormData({
//         ...formData,
//         image: file,
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     const formDataToSend = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key !== "image") {
//         formDataToSend.append(key, String(value));
//       }
//     });

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/v1/adminRoute/createItem",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setFormData({
//         itemName: "",
//         category: "",
//         quantity: "",
//         price: "",
//       });
//       setSubmittedData([...submittedData, formData]);
//       toast.success("Form submitted successfully!");
//       closeModal();
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An error occurred while submitting the form.");
//     }
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const formFields = [
//     {
//       label: "Item Name",
//       name: "itemName",
//       type: "text",
//       value: formData.itemName,
//       required: true,
//     },
//     {
//       label: "Category",
//       name: "category",
//       type: "text",
//       value: formData.category,
//       required: true,
//     },
//     {
//       label: "Quantity",
//       name: "quantity",
//       type: "number",
//       value: formData.quantity,
//       required: true,
//     },
//     {
//       label: "Price",
//       name: "price",
//       type: "number",
//       value: formData.price,
//       required: true,
//     },
    
//   ];

//   return (
//     <div className=" mt-12  w-[900px] mx-auto p-3">
//       <h1 className="text-2xl font-bold mb-4">Create a New Sale Here</h1>
//       <button
//         onClick={openModal}
//         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
//       >
//         Create Sale
//       </button>

//       {/* Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Create Form"
//         style={modalStyle}
//         overlayClassName="overlay"
//       >
//         <h1 style={{ fontSize: 30, fontWeight: 800, textAlign: "center" }}>
//           Create Sale
//         </h1>
//         <InputForm
//           fields={formFields}
//           handleChange={handleFieldChange}
//           handleImageChange={handleImageChange}
//         />
//         <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//           >
//             Submit
//           </button>
//           <button onClick={closeModal} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
//             Cancel
//           </button>
//         </div>
//       </Modal>

//       <StockTable data={submittedData} />
//     </div>
//   );
// }

// export default Create_Sales;
