import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";

const LoginPage = () => {
  const [error, setError] = useState({
    user: "",
    pass: "",
  });

  const [formData, setFormData] = useState({
    user: "",
    pass: "",
  });

  const cambioDatosUsuario = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  const enviarFormulario = async (ev) => {
    try {
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

      const loginUser = await clienteAxios.post(
        "/users/login",
        {
          nombreUsuario: user,
          contrasenia: pass,
        },
        config
      );

      if (loginUser.status === 200) {
        sessionStorage.setItem("token", JSON.stringify(loginUser.data.token));
        sessionStorage.setItem("role", JSON.stringify(loginUser.data.role));

        if (loginUser.data.role === "admin") {
          location.href = "/home-adminLog";
        } else {
          location.href = "/home-userLog";
        }
      }
    } catch (error) {
      if (error.response.status === 403) {
        alert("usuaio bloqueado. hablar con el admin del sitio");
      }
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
