import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";

const RegisterPage = () => {
  const [error, setError] = useState({
    user: "",
    pass: "",
    rpass: "",
  });

  const [formData, setFormData] = useState({
    user: "",
    pass: "",
    rpass: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const usersLocalStorage = JSON.parse(localStorage.getItem("users")) || [];

  const cambioDatosUsuario = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  const enviarFormulario = async (ev) => {
    ev.preventDefault();
    const { user, pass, rpass } = formData;

    let newError = {};

    if (!user) {
      newError = { ...newError, user: "errorUser" };
    }

    if (!pass) {
      newError = { ...newError, pass: "errorPass" };
    }

    if (!rpass) {
      newError = { ...newError, rpass: "errorRpass" };
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    const userExist = usersLocalStorage.find(
      (userLS) => userLS.userName === user
    );

    if (userExist) {
      return alert("Usuario no disponible");
    }

    if (user) {
      if (pass === rpass) {
        setIsLoading(true);
        const createUser = await clienteAxios.post(
          "/users/register",
          {
            nombreUsuario: user,
            contrasenia: pass,
          },
          config
        );

        if (createUser.status === 201) {
          alert("Usuario Creado");
          setIsLoading(false);
          location.href = "/login";
        }
      }
    }

    console.log(error);
  };

  useEffect(() => {
    document.title = "Registrarse";
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
              placeholder="Ej: Us@rio123"
              onChange={cambioDatosUsuario}
              name="pass"
            />
            {error.pass && (
              <p className="text-danger">Campo CONTRASEÑA Vacio</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Repetir Contraseña</Form.Label>
            <Form.Control
              className={error.rpass === "errorRpass" && "is-invalid"}
              type="text"
              placeholder="Ej: Us@rio123"
              onChange={cambioDatosUsuario}
              name="rpass"
            />
            {error.rpass && (
              <p className="text-danger">Campo REPETIR COTRASEÑA Vacio</p>
            )}
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            className="w-100"
            onClick={enviarFormulario}
            disabled={isLoading === true ? true : false}>
            Enviar Formulario
          </Button>
        </Form>
      </div>
    </>
  );
};

export default RegisterPage;
