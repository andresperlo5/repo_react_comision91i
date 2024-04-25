import * as yup from "yup";

const formSchema = yup.object({
  user: yup
    .string()
    .required("Campo USUARIO requerido")
    .email("Formato EMAIL. Ej: usuario@dominio.com"),
  pass: yup
    .string()
    .required("Campo CONTRASEÑA requerido")
    .min(8, "Minimo 8 Caracteres")
    .max(30, "Maximo 30 Caracteres"),
  rpass: yup
    .string()
    .required("Campo REPETIR CONTRASEÑA requerido")
    .min(8, "Minimo 8 Caracteres")
    .max(30, "Maximo 30 Caracteres"),
});

export default formSchema;
