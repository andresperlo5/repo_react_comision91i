import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "./Image";

const NavbarC = () => {
  const userLog = JSON.parse(localStorage.getItem("user")) || "";
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const url =
    "https://blogs.iadb.org/sostenibilidad/wp-content/uploads/sites/26/2021/06/Photo-2-min-scaled.jpeg";

  const logoutUser = (idUserLog) => {
    const userIndex = users.findIndex((user) => user.id === idUserLog);
    users[userIndex].login = false;

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("user");

    setTimeout(() => {
      location.href = "/";
    }, 1000);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-success">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image urlImagen={url} ancho="150" alternativo="Lindo Gatito" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="#link">Sobre Nosotros</Nav.Link>
              <Nav.Link href="#link">Contacto</Nav.Link>
              {userLog && (
                <>
                  <Nav.Link href="/favorite">Favoritos</Nav.Link>
                  <Nav.Link href="/cart">Carrito</Nav.Link>
                </>
              )}
            </Nav>
            <Nav className="ms-auto">
              {userLog ? (
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
