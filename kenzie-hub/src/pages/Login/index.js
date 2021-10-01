import { useForm } from "react-hook-form";
import * as yup from "yup";
import api from "../../services/api";
import { Redirect, useHistory } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.css";

function Login({ authenticated, setAuthenticated }) {
  const history = useHistory();

  const formSchema = yup.object().shape({
    email: yup.string().required("Campo Obrigatório").email("Email Inválido"),
    password: yup
      .string()
      .required("Campo Obrigatório")
      .min(6, "Senha deve conter no mínimo 6 dígitos"),
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

  function onSubmitFunction(data) {
    api.post("/sessions", data).then((response) => {
      const { token } = response.data;
      const { id } = response.data.user;

      localStorage.clear();
      localStorage.setItem("KenzieHubToken", JSON.stringify(token));
      localStorage.setItem("KenzieHubId", JSON.stringify(id));

      setAuthenticated(true);

      return history.push("/dashboard");
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <input placeholder="Email" {...register("email")} />
        {errors.email?.message}
        <input placeholder="Senha" {...register("password")} />
        {errors.password?.message}
        <button type="submit">Login</button>
      </form>
      <button onClick={() => history.push("/signup")}>
        Ir para o Cadastro
      </button>
    </div>
  );
}

export default Login;
