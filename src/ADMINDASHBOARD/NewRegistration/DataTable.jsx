import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useStateContext } from "../../contexts/ContextProvider";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, TextRun } from "docx";

function DynamicDataTable({ data, handleDelete }) {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const handleDeleteClick = (itemId) => {
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(deletingItemId);
    setDeleteDialogOpen(false);
    setDeletingItemId(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeletingItemId(null);
  };

  const columns = [
    {
      field: "id",
      headerName: "S. No.",
      flex: 1,
      renderHeader: (params) => (
        <span style={{ fontSize: "12px", fontWeight: "700" }}>
          {params.colDef.headerName}
        </span>
      ),
      renderCell: (params) => (
        <span style={{ fontSize: "12px" }}>{params.value}</span>
      ),
    },
    {
      field: "registrationNumber",
      headerName: "Reg. No.",
      flex: 1,
      renderHeader: (params) => (
        <span style={{ fontSize: "12px", fontWeight: "700" }}>
          {params.colDef.headerName}
        </span>
      ),
      renderCell: (params) => (
        <span style={{ fontSize: "12px" }}>{params.value}</span>
      ),
    },
    {
      field: "studentFullName",
      headerName: "Student Name",
      flex: 1,
      renderHeader: (params) => (
        <span style={{ fontSize: "12px", fontWeight: "700" }}>
          {params.colDef.headerName}
        </span>
      ),
      renderCell: (params) => (
        <span style={{ fontSize: "12px" }}>{params.value}</span>
      ),
    },
    {
      field: "guardianName",
      headerName: "Guardian's Name",
      flex: 1,
      renderHeader: (params) => (
        <span style={{ fontSize: "12px", fontWeight: "700" }}>
          {params.colDef.headerName}
        </span>
      ),
      renderCell: (params) => (
        <span style={{ fontSize: "12px" }}>{params.value}</span>
      ),
    },
    {
      field: "studentEmail",
      headerName: "Email",
      flex: 1,
      renderHeader: (params) => (
        <span style={{ fontSize: "12px", fontWeight: "700" }}>
          {params.colDef.headerName}
        </span>
      ),
      renderCell: (params) => (
        <span style={{ fontSize: "12px" }}>{params.value}</span>
      ),
    },
    {
      field: "mobileNumber",
      headerName: "Contact",
      flex: 1,
      renderHeader: (params) => (
        <span style={{ fontSize: "12px", fontWeight: "700" }}>
          {params.colDef.headerName}
        </span>
      ),
      renderCell: (params) => (
        <span style={{ fontSize: "12px" }}>{params.value}</span>
      ),
    },
    {
      field: "registerClass",
      headerName: "Class",
      flex: 1,
      renderHeader: (params) => (
        <span style={{ fontSize: "12px", fontWeight: "700" }}>
          {params.colDef.headerName}
        </span>
      ),
      renderCell: (params) => (
        <span style={{ fontSize: "12px" }}>{params.value}</span>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      renderHeader: (params) => (
        <span style={{ fontSize: "12px", fontWeight: "700" }}>
          {params.colDef.headerName}
        </span>
      ),
      renderCell: (params) => (
        <span style={{ fontSize: "12px" }}>{params.value}</span>
      ),
    },
    {
      field: "studentAddress",
      headerName: "Address",
      flex: 1,
      renderHeader: (params) => (
        <span style={{ fontSize: "12px", fontWeight: "700" }}>
          {params.colDef.headerName}
        </span>
      ),
      renderCell: (params) => (
        <span style={{ fontSize: "12px" }}>{params.value}</span>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderHeader: (params) => (
        <span style={{ fontSize: "12px", fontWeight: "700" }}>
          {params.colDef.headerName}
        </span>
      ),
      renderCell: (params) => (
        <span style={{ fontSize: "12px" }}>{params.value}</span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Reg. Date",
      flex: 1,
      renderHeader: (params) => (
        <span style={{ fontSize: "12px", fontWeight: "700" }}>
          {params.colDef.headerName}
        </span>
      ),
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return <span style={{ fontSize: "12px" }}>{formattedDate}</span>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex:1,
      renderCell: (params) => (
        <div>
          <Link to={`/admin/newregistration/${params.row.registrationNumber}`}>
            <IconButton>
              <VisibilityIcon style={{ color: currentColor }} />
            </IconButton>
          </Link>
        </div>
      ),
    },
  ];

  const dataWithIds = Array.isArray(data)
    ? data.map((item, index) => ({ id: index + 1, ...item }))
    : [];

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Student Registration Data", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    const headers = columns.map((col) => col.headerName);

    const data = dataWithIds.map((row) =>
      columns.map((col) => row[col.field])
    );

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 30,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
      },
    });

    doc.save("Student_Registration_Data.pdf");
  };

  const handleDownloadWord = () => {
    const tableRows = [
      new TableRow({
        children: columns.map(
          (col) =>
            new TableCell({
              children: [new Paragraph(col.headerName)],
              width: { size: 100 / columns.length, type: WidthType.PERCENTAGE },
            })
        ),
      }),
      ...dataWithIds.map(
        (row) =>
          new TableRow({
            children: columns.map(
              (col) =>
                new TableCell({
                  children: [new Paragraph(String(row[col.field]))],
                  width: { size: 100 / columns.length, type: WidthType.PERCENTAGE },
                })
            ),
          })
      ),
    ];

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Student Registration Data",
                  bold: true,
                  size: 32,
                }),
              ],
              spacing: {
                after: 300,
              },
            }),
            new Table({
              rows: tableRows,
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Student_Registration_Data.docx");
    });
  };

  return (
    <>
    {/* <div className="h-[450px] dark:text-white dark:bg-secondary-dark-bg mx-auto bg-white mt-2 rounded-md overflow-auto w-full"> */}
      {/* <div style={{ height: 400, width: "100%" }}> */}
        <DataGrid
          rows={dataWithIds}
          columns={columns}
          className="dark:text-white dark:bg-secondary-dark-bg  mx-auto bg-white"
        />
      {/* </div> */}
      <div className="flex justify-end m-2">
        <Button
          variant="contained"
          style={{ backgroundColor: currentColor, color: "white" }}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: currentColor, color: "white", marginLeft: 10 }}
          onClick={handleDownloadWord}
        >
          Download Word
        </Button>
      </div>
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    {/* </div> */}
    </>
  );
}

export default DynamicDataTable;


// import React, { useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Link, useNavigate } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Button from "@mui/material/Button";
// import { useStateContext } from "../../contexts/ContextProvider";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { saveAs } from "file-saver";

// function DynamicDataTable({ data, handleDelete }) {
//   const { currentColor } = useStateContext();
//   const navigate = useNavigate();
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deletingItemId, setDeletingItemId] = useState(null);

//   const handleDeleteClick = (itemId) => {
//     setDeletingItemId(itemId);
//     setDeleteDialogOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     handleDelete(deletingItemId);
//     setDeleteDialogOpen(false);
//     setDeletingItemId(null);
//   };

//   const handleCancelDelete = () => {
//     setDeleteDialogOpen(false);
//     setDeletingItemId(null);
//   };

//   const columns = [
//     {
//       field: "id",
//       headerName: "S. No.",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "registrationNumber",
//       headerName: "Reg. No.",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },

//     {
//       field: "studentFullName",
//       headerName: "Student Name",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "guardianName",
//       headerName: "Guardian's Name",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "studentEmail",
//       headerName: "Email",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "mobileNumber",
//       headerName: "Contact",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "registerClass",
//       headerName: "Class",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "gender",
//       headerName: "Gender",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "studentAddress",
//       headerName: "Address",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
    
//     {
//       field: "createdAt",
//       headerName: "Reg. Date",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => {
//         const date = new Date(params.value);
//         const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//         return <span style={{ fontSize: "12px" }}>{formattedDate}</span>;
//       },
//     },  
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 300,
//       renderCell: (params) => (
//         <div>
//           <Link
//             to={`/admin/newregistration/${params.row.registrationNumber}`}
//           >
//             <IconButton>
//               <VisibilityIcon style={{color:currentColor}} />
//             </IconButton>
//           </Link>

//           {/* <Link

//             to={`/admin/newregistration/edit-profile/${params.row.email}`}
//           >
//             <IconButton>
//               <EditIcon className="text-green-600" />
//             </IconButton>
//           </Link>
//           <IconButton onClick={() => handleDeleteClick(params.row.email)}>
//             <DeleteIcon className="text-red-600" />
//           </IconButton> */}
          
//         </div>
//       ),
//     },
//   ];

//   const dataWithIds = Array.isArray(data)
//     ? data.map((item, index) => ({ id: index + 1, ...item }))
//     : [];

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     doc.autoTable({
//       head: [columns.map(col => col.headerName)],
//       body: dataWithIds.map(row => columns.map(col => row[col.field])),
//     });
//     doc.save("table.pdf");
//   };

//   const handleDownloadWord = () => {
//     const rows = dataWithIds.map(row => columns.map(col => row[col.field]).join('\t')).join('\n');
//     const content = `data:text/plain;charset=utf-8,${encodeURIComponent(rows)}`;
//     const link = document.createElement("a");
//     link.href = content;
//     link.download = "table.doc";
//     link.click();
//   };

//   return (
//     <div className="h-[450px] dark:text-white dark:bg-secondary-dark-bg mx-auto bg-white mt-2 rounded-md overflow-auto w-full">
//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid
//           rows={dataWithIds}
//           columns={columns}
//           className="dark:text-white dark:bg-secondary-dark-bg  mx-auto bg-white"
//         />
//       </div>
//       <div className="flex justify-end m-2">
//         <Button variant="contained" onClick={handleDownloadPDF} style={{ marginRight: "10px", backgroundColor: currentColor }}>
//           Download PDF
//         </Button>
//         <Button variant="contained" onClick={handleDownloadWord} style={{ backgroundColor: currentColor }}>
//           Download Word
//         </Button>
//       </div>
//       <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Do you really want to delete this item?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancelDelete} color="primary">
//             No
//           </Button>
//           <Button onClick={handleConfirmDelete} color="primary">
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default DynamicDataTable;











// import React, { useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Link, useNavigate } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Button from "@mui/material/Button";
// import { useStateContext } from "../../contexts/ContextProvider";

// function DynamicDataTable({ data, handleDelete }) {
//   const { currentColor } = useStateContext();
//   const navigate = useNavigate();
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deletingItemId, setDeletingItemId] = useState(null);

//   const handleDeleteClick = (itemId) => {
//     setDeletingItemId(itemId);
//     setDeleteDialogOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     handleDelete(deletingItemId);
//     setDeleteDialogOpen(false);
//     setDeletingItemId(null);
//   };

//   const handleCancelDelete = () => {
//     setDeleteDialogOpen(false);
//     setDeletingItemId(null);
//   };

//   const columns = [
//     {
//       field: "id",
//       headerName: "S. No.",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "registrationNumber",
//       headerName: "Reg. No.",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },

//     {
//       field: "studentFullName",
//       headerName: "Student Name",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "guardianName",
//       headerName: "Guardian's Name",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "studentEmail",
//       headerName: "Email",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "mobileNumber",
//       headerName: "Contact",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "registerClass",
//       headerName: "Class",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "gender",
//       headerName: "Gender",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
//     {
//       field: "studentAddress",
//       headerName: "Address",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => (
//         <span style={{ fontSize: "12px" }}>{params.value}</span>
//       ),
//     },
    
//     {
//       field: "createdAt",
//       headerName: "Reg. Date",
//       flex: 1,
//       renderHeader: (params) => (
//         <span style={{ fontSize: "12px", fontWeight: "700" }}>
//           {params.colDef.headerName}
//         </span>
//       ),
//       renderCell: (params) => {
//         const date = new Date(params.value);
//         const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//         return <span style={{ fontSize: "12px" }}>{formattedDate}</span>;
//       },
//     },  
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 300,
//       renderCell: (params) => (
//         <div>
//           <Link
//             to={`/admin/newregistration/${params.row.registrationNumber}`}
//           >
//             <IconButton>
//               <VisibilityIcon style={{color:currentColor}} />
//             </IconButton>
//           </Link>

//           {/* <Link

//             to={`/admin/newregistration/edit-profile/${params.row.email}`}
//           >
//             <IconButton>
//               <EditIcon className="text-green-600" />
//             </IconButton>
//           </Link>
//           <IconButton onClick={() => handleDeleteClick(params.row.email)}>
//             <DeleteIcon className="text-red-600" />
//           </IconButton> */}
          
//         </div>
//       ),
//     },
//   ];
//   const dataWithIds = Array.isArray(data)
//     ? data.map((item, index) => ({ id: index + 1, ...item }))
//     : [];
//   return (
//     <div className="h-[450px] dark:text-white dark:bg-secondary-dark-bg mx-auto bg-white mt-2 rounded-md overflow-auto w-full">
//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid
//           rows={dataWithIds}
//           columns={columns}
//           className="dark:text-white dark:bg-secondary-dark-bg  mx-auto bg-white"
//         />
//       </div>
//       <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Do you really want to delete this item?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancelDelete} color="primary">
//             No
//           </Button>
//           <Button onClick={handleConfirmDelete} color="primary">
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default DynamicDataTable;
