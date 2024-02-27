import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginPage = () => {
  const [error, setError] = useState({
    user: "",
    pass: "",
  });

  const [formData, setFormData] = useState({
    user: "",
    pass: "",
  });

  const usersLocalStorage = JSON.parse(localStorage.getItem("users")) || [];

  const cambioDatosUsuario = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  const enviarFormulario = (ev) => {
    ev.preventDefault();
    const { user, pass } = formData;

    let newError = {};

    if (!user) {
      newError = { ...newError, user: "errorUser" };
    }

    if (!pass) {
      newError = { ...newError, pass: "errorPass" };
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    const userExist = usersLocalStorage.find(
      (userLS) => userLS.userName === user
    );

    if (!userExist) {
      return alert("Usuario y/o contraseña no coinciden. USUARIO");
    }

    if (pass === userExist.pass) {
      if (userExist.role === "admin") {
        const userIndex = usersLocalStorage.findIndex(
          (user) => user.id === userExist.id
        );
        usersLocalStorage[userIndex].login = true;

        localStorage.setItem("users", JSON.stringify(usersLocalStorage));
        localStorage.getItem("user", JSON.stringify(userExist));
        location.href = "/home-adminLog";
      } else {
        const userIndex = usersLocalStorage.findIndex(
          (user) => user.id === userExist.id
        );
        usersLocalStorage[userIndex].login = true;

        localStorage.setItem("users", JSON.stringify(usersLocalStorage));
        localStorage.setItem("user", JSON.stringify(userExist));
        location.href = "/home-userLog";
      }
    } else {
      return alert("Usuario y/o contraseña no coinciden. CONTRASEÑA");
    }
  };

  useEffect(() => {
    document.title = "Iniciar Sesion";
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center my-5">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              className={error.user === "errorUser" && "is-invalid"}
              type="text"
              placeholder="Por ej: Usuario123"
              onChange={cambioDatosUsuario}
              name="user"
            />
            {error.user && <p className="text-danger">Campo USUARIO Vacio</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              className={error.pass === "errorPass" && "is-invalid"}
              type="text"
              placeholder="Contraseña"
              onChange={cambioDatosUsuario}
              name="pass"
            />
            {error.pass && (
              <p className="text-danger">Campo CONTRASEÑA Vacio</p>
            )}
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            className="w-100"
            onClick={enviarFormulario}>
            Iniciar Sesion
          </Button>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
