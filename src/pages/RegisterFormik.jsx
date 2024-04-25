import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";
import formSchema from "../helpers/yupSchema";

const RegisterFormik = () => {
  const handleSubmitForm = async (values) => {
    if (values.pass === values.rpass) {
      const res = await clienteAxios.post(
        "/users/register",
        {
          nombreUsuario: values.user,
          contrasenia: values.pass,
        },
        config
      );
      console.log(res);
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  return (
    <>
      <Formik
        initialValues={{ user: "", pass: "", rpass: "" }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          handleSubmitForm(values);
        }}>
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                className={
                  errors.user && touched.user
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="text"
                placeholder="Enter email"
                value={values.user}
                name="user"
                onChange={handleChange}
              />
            </Form.Group>
            <p className="text-danger">
              {errors.user && touched.user && errors.user}
            </p>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                className={
                  errors.pass && touched.pass
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="password"
                placeholder="Password"
                value={values.pass}
                name="pass"
                onChange={handleChange}
              />
              <p className="text-danger">
                {errors.pass && touched.pass && errors.pass}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                className={
                  errors.rpass && touched.rpass
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="password"
                placeholder="Password"
                value={values.rpass}
                name="rpass"
                onChange={handleChange}
              />
              <p className="text-danger">
                {errors.rpass && touched.rpass && errors.rpass}
              </p>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Enviar Formulario
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterFormik;
