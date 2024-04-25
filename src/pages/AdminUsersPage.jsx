import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [userEdit, setUserEdit] = useState({});

  const usersLocalStorage = JSON.parse(localStorage.getItem("users")) || [];

  const getUsers = async () => {
    const allUsers = await clienteAxios.get("/users/enabledUser");
    setUsers(allUsers.data.getUsersDelFalse);
  };

  const handleClose = () => setShow(false);

  const editUser = (user) => {
    setUserEdit(user);
    setShow(true);
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    console.log(value);
    console.log(name);
    setUserEdit({ ...userEdit, [name]: value });
  };

  const handleClick = async (ev) => {
    try {
      ev.preventDefault();
      const updateUser = await clienteAxios.put(
        `/users/${userEdit._id}`,
        {
          nombreUsuario: userEdit.nombreUsuario,
          role: userEdit.role,
        },
        config
      );
      if (updateUser.status === 200) {
        handleClose();
        alert("Usuario Actualizado");
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDel = async (idUser) => {
    const confirmDelUser = confirm(
      "Estas seguro de que quieres eliminar a este usuario?"
    );

    if (confirmDelUser) {
      const deleteUser = await clienteAxios.delete(`/users/${idUser}`, config);

      if (deleteUser.status === 200) {
        alert("Usuario borrado");
        location.reload();
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.nombreUsuario}</td>
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
                            value={userEdit.nombreUsuario}
                            onChange={handleChange}
                            name="nombreUsuario"
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
                    onClick={() => handleClickDel(user._id)}
                    disabled={user.role === "admin" && true}>
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
