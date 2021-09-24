import { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router";
import * as yup from "yup";
import api from "../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";

function Signup({ authenticated }) {
  const [courseModule, setCourseModule] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  const formSchema = yup.object().shape({
    email: yup.string().required("Campo Obrigatório").email("Email Inválido"),
    name: yup.string().required("Campo Obrigatório"),
    contact: yup.string().required("Campo Obrigatório"),
    bio: yup.string().required("Campo Obrigatório"),
    password: yup
      .string()
      .required("Campo Obrigatório")
      .min(6, "Senha deve conter no mínimo 6 dígitos"),
    confirmPassword: yup
      .string()
      .required("Campo Obrigatório")
      .oneOf([yup.ref("password")], "Senhas diferentes!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  function onSubmitFunction({ name, email, bio, contact, password }) {
    if (courseModule) {
      const user = {
        name,
        email,
        password,
        bio,
        contact,
        course_module: courseModule,
      };
      api
        .post("/users", user)
        .then((_) => history.push("/login"))
        .catch((err) => console.log(err));
    } else {
      setErrorMsg("- Selecione um Módulo");
    }
  }

  function selectModule(str) {
    setCourseModule(str);
    setErrorMsg("");
  }

  return (
    <div className="module_Div">
      <label>Módulo {errorMsg}</label>
      <div>
        <button
          onClick={() =>
            selectModule("Primeiro módulo (Introdução ao Frontend)")
          }
        >
          Q1
        </button>
        <button
          onClick={() => selectModule("Segundo módulo (Frontend Avançado)")}
        >
          Q2
        </button>
        <button
          onClick={() =>
            selectModule("Terceiro módulo (Introdução ao Backend)")
          }
        >
          Q3
        </button>
        <button
          onClick={() => selectModule("Quarto módulo (Backend Avançado)")}
        >
          Q4
        </button>
      </div>
      <form name="signup" onSubmit={handleSubmit(onSubmitFunction)}>
        <input placeholder="Nome" {...register("name")} />
        {errors.name?.message}
        <input placeholder="Email" {...register("email")} />
        {errors.email?.message}
        <input placeholder="Bio" {...register("bio")} />
        {errors.bio?.message}
        <input placeholder="Contato" {...register("contact")} />
        {errors.contact?.message}
        <input placeholder="Senha" {...register("password")} />
        {errors.password?.message}
        <input placeholder="Confirmar Senha" {...register("confirmPassword")} />
        {errors.confirmPassword?.message}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Signup;
