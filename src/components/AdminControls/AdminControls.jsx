import React from "react";
import PropTypes from "prop-types";
import { XCircle, PlusCircle, Edit } from "lucide-react";
import "./AdminControls.css";

const AdminControls = ({ handleDelete, handleAdd, handleEdit }) => {
  return (
    <div className="admin-controls">
      <button className="admin-button delete-button" onClick={handleDelete}>
        <XCircle className="admin-icon delete-icon" />
      </button>
      <button className="admin-button add-button" onClick={handleAdd}>
        <PlusCircle className="admin-icon add-icon" />
      </button>
      <button className="admin-button edit-button" onClick={handleEdit}>
        <Edit className="admin-icon edit-icon" />
      </button>
    </div>
  );
};

AdminControls.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default AdminControls;
