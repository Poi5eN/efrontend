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

function DynamicDataTable({ data, handleDelete }) {
  
  const student = JSON.parse(localStorage.response);

  // Assuming classTeacher contains the class information
  const classTeacherClass = student.classTeacher;

  // Filter data based on classTeacherClass
  const filteredData = data.filter(
    (student) => student.class === classTeacherClass
  );

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
    { field: "id", headerName: "S. No.", width: 50 },
    { field: "fullName", headerName: "Student Name", flex:1 },
    { field: "email", headerName: "Email", flex:1 },
    { field: "rollNo", headerName: "Roll No",flex:1},
    { field: "contact", headerName: "Contact",flex:1 },
    { field: "class", headerName: "Class",width: 50 },
    { field: "section", headerName: "Section",flex:1 },
    {
      field: "actions",
      headerName: "Actions",
      flex:1,
      renderCell: (params) => (
        <div>
          <Link to={`/teacher/mystudents/view-profile/${params.row.email}`}>
            <IconButton>
              <VisibilityIcon className="text-blue-600" />
            </IconButton>
          </Link>
          <Link to={`/teacher/mystudents/edit-profile/${params.row.email}`}>
            <IconButton>
              <EditIcon className="text-green-600" />
            </IconButton>
          </Link>
          <IconButton onClick={() => handleDeleteClick(params.row.email)}>
            <DeleteIcon className="text-red-600" />
          </IconButton>
        </div>
      ),
    },
  ];

  const dataWithIds = Array.isArray(filteredData)
    ? filteredData.map((item, index) => ({ id: index + 1, ...item }))
    : [];

  return (
    // <div className="h-[350px] mx-auto bg-white mt-2 rounded-md">
   <div className="h-[450px]  dark:text-white dark:bg-secondary-dark-bg  mx-auto bg-white mt-2 rounded-md overflow-scroll w-[90%]">
    <div className="  dark:text-gray-200 ">
      <DataGrid
        rows={dataWithIds}
        columns={columns}
        className="dark:text-white dark:bg-secondary-dark-bg  mx-auto bg-white "
        // components={{ NoRowsOverlay }}
      />
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
    </div>
  );
}

export default DynamicDataTable;
