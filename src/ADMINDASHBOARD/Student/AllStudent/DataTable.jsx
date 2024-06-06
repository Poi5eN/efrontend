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
import { useStateContext } from "../../../contexts/ContextProvider"


function DynamicDataTable({ data, handleDelete }) {
  const { currentColor} = useStateContext();
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
    { field: "id", headerName: "S. No.", width: 50 },
    { field: "fullName", headerName: "Student Name",flex:1},
    { field: "email", headerName: "Email", flex:1 },
    { field: "rollNo", headerName: "Roll No", flex:1 },
    { field: "contact", headerName: "Contact",flex:1 },
    { field: "class", headerName: "Class", flex:1 },
    { field: "section", headerName: "Section", flex:1 },

    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <div>
          <Link
            to={`/admin/allstudent/viewstudent/view-profile/${params.row.email}`}
          >
            <IconButton>
              <VisibilityIcon style={{color:currentColor}} />
            </IconButton>
          </Link>

          <Link
            to={`/admin/allstudent/editstudent/edit-profile/${params.row.email}`}
          >
            <IconButton>
              <EditIcon className="text-green-600" />
            </IconButton>
          </Link>
          <IconButton onClick={() => handleDeleteClick(params.row.email)}>
            <DeleteIcon className="text-red-600" />
          </IconButton>
          <Link to={`/admin/allstudent/StudentFeeStatus/${params.row.email}`}>
            <IconButton>
              <p 
              // className="bg-pink-500 py-3  text-white p-2"
             className="text-[16px] text-gray-100 px-2 py-2 rounded-xl " 
             style={{border:`2px solid ${currentColor} `,color:currentColor}}
              >Fee status</p>
            </IconButton>
          </Link>
        </div>
      ),
    },
  ];

  const dataWithIds = Array.isArray(data)
    ? data.map((item, index) => ({ id: index + 1, ...item }))
    : [];

  return (
    // <div className="h-[350px] mx-auto bg-white mt-2 rounded-md">
    <div className="h-[450px] dark:text-white dark:bg-secondary-dark-bg mx-auto bg-white mt-2 rounded-md overflow-scroll w-full">
    <div className=" min-w-[1000px]  w-full">
    
      <DataGrid rows={dataWithIds} columns={columns} className="dark:text-white dark:bg-secondary-dark-bg  mx-auto bg-white" />
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