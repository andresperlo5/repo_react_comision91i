import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "./Image";
import Form from "react-bootstrap/Form";
import clienteAxios, { config, configImg } from "../helpers/clienteAxios";

const NavbarC = () => {
  const [show, setShow] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [product, setProduct] = useState({
    nombre: "",
    precio: 0,
    codigo: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = JSON.parse(sessionStorage.getItem("token"));
  const role = JSON.parse(sessionStorage.getItem("role"));

  const userLog = JSON.parse(localStorage.getItem("user")) || "";
  const url =
    "https://blogs.iadb.org/sostenibilidad/wp-content/uploads/sites/26/2021/06/Photo-2-min-scaled.jpeg";

  const logoutUser = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");

    setTimeout(() => {
      location.href = "/";
    }, 1000);
  };

  const handleChange = (ev) => {
    setProduct({ ...product, [ev.target.name]: ev.target.value });
  };

  const handleClick = async (ev) => {
    ev.preventDefault();

    const res = await clienteAxios.post("/products", product, config);
    if (res.status === 201) {
      const data = new FormData();
      data.append("image", imagen);
      console.log(data);
      const addImageProd = await clienteAxios.post(
        `/products/addImage/${res.data.newProduct._id}`,
        data,
        configImg
      );
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-success">
        <Container fluid>
          <Navbar.Brand
            href={
              token && role === "user"
                ? "/home-userLog"
                : token && role === "admin"
                ? "home-adminLog"
                : "/"
            }>
            <Image urlImagen={url} ancho="150" alternativo="Lindo Gatito" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href={
                  token && role === "user"
                    ? "/home-userLog"
                    : token && role === "admin"
                    ? "home-adminLog"
                    : "/"
                }>
                Inicio
              </Nav.Link>
              {token && role === "admin" ? (
                <>
                  <Nav.Link href="/home-adminLog/users">
                    Panel de Usuarios
                  </Nav.Link>
                  <Nav.Link href="/home-adminLog/products">
                    Panel de Productos
                  </Nav.Link>
                  <Button variant="primary" onClick={handleShow}>
                    Crear Producto
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Nuevo Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control
                            type="text"
                            name="nombre"
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword">
                          <Form.Label>Precio</Form.Label>
                          <Form.Control
                            type="number"
                            name="precio"
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword">
                          <Form.Label>Codigo</Form.Label>
                          <Form.Control
                            type="text"
                            name="codigo"
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword">
                          <Form.Label>Imagen</Form.Label>
                          <Form.Control
                            type="file"
                            onChange={(ev) => setImagen(ev.target.files[0])}
                          />
                        </Form.Group>

                        <Button
                          variant="primary"
                          type="submit"
                          onClick={handleClick}>
                          Enviar Datos
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                </>
              ) : (
                <>
                  <Nav.Link href="#link">Sobre Nosotros</Nav.Link>
                  <Nav.Link href="#link">Contacto</Nav.Link>
                </>
              )}
              {token && role === "user" && (
                <>
                  <Nav.Link href="/favorite">Favoritos</Nav.Link>
                  <Nav.Link href="/cart">Carrito</Nav.Link>
                </>
              )}
            </Nav>
            <Nav className="ms-auto">
              {token ? (
                <Nav.Link href="#" onClick={() => logoutUser(userLog.id)}>
                  Cerrar Sesion
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link href="/login">Iniciar Sesion</Nav.Link>
                  <Nav.Link href="/register">Registrarse</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
