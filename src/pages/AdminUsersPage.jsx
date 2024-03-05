import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AdminUsersPage = () => {
  const usersLocalStorage = JSON.parse(localStorage.getItem("users")) || [];

  const [show, setShow] = useState(false);
  const [userEdit, setUserEdit] = useState({});

  const handleClose = () => setShow(false);

  const editUser = (user) => {
    setUserEdit(user);
    setShow(true);
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setUserEdit({ ...userEdit, [name]: value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    const userIndex = usersLocalStorage.findIndex(
      (user) => user.id === userEdit.id
    );
    usersLocalStorage[userIndex] = userEdit;
    localStorage.setItem("users", JSON.stringify(usersLocalStorage));
    location.reload();
  };

  const handleClickDel = (idUser) => {
    const filterUser = usersLocalStorage.filter((user) => user.id !== idUser);
    const confirmDelUser = confirm(
      "Estas seguro de que quieres eliminar a este usuario?"
    );

    if (confirmDelUser) {
      localStorage.setItem("users", JSON.stringify(filterUser));
      location.reload();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <Table striped bordered hover className="w-75 mt-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Role</th>
              <th>Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usersLocalStorage.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.role === "user" ? "Usuario" : "Administrador"}</td>
                <td>
                  <Button variant="warning" onClick={() => editUser(user)}>
                    Editar
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Editar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Usuario</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Por Ej: usuArio123"
                            value={userEdit.userName}
                            onChange={handleChange}
                            name="userName"
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword">
                          <Form.Label>Role</Form.Label>
                          <Form.Control
                            type="text"
                            value={userEdit.role}
                            placeholder="Por EJ: Administrador"
                            name="role"
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="success"
                            type="submit"
                            onClick={handleClick}>
                            Guardar Cambios
                          </Button>
                        </div>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClickDel(user.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AdminUsersPage;
