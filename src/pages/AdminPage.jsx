import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const AdminPage = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const role = JSON.parse(sessionStorage.getItem("role"));

  return (
    <>
      {!token && role !== "admin" ? (
        <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <h2>Admin Page</h2>
      )}
    </>
  );
};

export default AdminPage;
