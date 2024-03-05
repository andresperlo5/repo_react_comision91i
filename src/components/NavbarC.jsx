import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "./Image";

const NavbarC = () => {
  const userLog = JSON.parse(localStorage.getItem("user")) || "";
  const superAdmin = JSON.parse(localStorage.getItem("superAdmin")) || "";
  const pathName = location.pathname;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const url =
    "https://blogs.iadb.org/sostenibilidad/wp-content/uploads/sites/26/2021/06/Photo-2-min-scaled.jpeg";

  const logoutUser = (idUserLog) => {
    if (superAdmin) {
      localStorage.removeItem("superAdmin");
    } else {
      const userIndex = users.findIndex((user) => user.id === idUserLog);
      users[userIndex].login = false;

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("user");
    }

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
              userLog.role === "user"
                ? "/home-userLog"
                : userLog.role === "admin" ||
                  (superAdmin && pathName === "/home-adminLog")
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
                  userLog.role === "user"
                    ? "/home-userLog"
                    : userLog.role === "admin" ||
                      (superAdmin && pathName === "/home-adminLog")
                    ? "home-adminLog"
                    : "/"
                }>
                Inicio
              </Nav.Link>
              {(superAdmin && pathName === "/home-adminLog") ||
              (superAdmin && pathName === "/home-adminLog/users") ||
              (superAdmin && pathName === "/home-adminLog/products") ? (
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
              {userLog && (
                <>
                  <Nav.Link href="/favorite">Favoritos</Nav.Link>
                  <Nav.Link href="/cart">Carrito</Nav.Link>
                </>
              )}
            </Nav>
            <Nav className="ms-auto">
              {userLog ||
              (superAdmin && pathName === "/home-adminLog") ||
              (superAdmin && pathName === "/home-adminLog/users") ||
              (superAdmin && pathName === "/home-adminLog/products") ? (
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
