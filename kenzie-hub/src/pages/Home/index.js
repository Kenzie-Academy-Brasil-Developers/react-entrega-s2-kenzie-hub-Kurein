import { useHistory } from "react-router";
import "./styles.css";

function Home({ authenticated }) {
  const history = useHistory();

  return (
    <div>
      <h1>Bem Vindo a KenzieHub!</h1>
      <div>
        <button onClick={() => history.push("/login")}>Faça seu Login</button>
        <button onClick={() => history.push("/signup")}>Cadastre-se já</button>
      </div>
    </div>
  );
}

export default Home;
