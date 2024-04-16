import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "./Image";

const NavbarC = () => {
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
