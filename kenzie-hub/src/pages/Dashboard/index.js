import { Redirect } from "react-router";
import { useState } from "react";
import TechCard from "../../components/TechCard";
import api from "../../services/api";
import "./styles.css";

function Dashboard({ authenticated }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [techs, setTechs] = useState([]);
  const [validation, setValidation] = useState(false);

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  function onClickFunction(str) {
    setValidation(false);
    setStatus(str);
  }

  api
    .get(`/users/${JSON.parse(localStorage.getItem("KenzieHubId"))}`)
    .then((response) => setTechs(response.data.techs));

  function submitFunction() {
    if (title && status) {
      const tech = { title, status };
      api.post("/users/techs", tech, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("KenzieHubToken")
          )}`,
        },
      });
      setValidation(false);
    } else {
      setValidation(true);
    }
  }

  return (
    <div>
      <div>
        <div className="createTech_Div">
          <input
            placeholder="Nome"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setValidation(false);
            }}
          />
          <div className="createTech_buttons">
            <button onClick={() => onClickFunction("Iniciante")}>
              Iniciante
            </button>
            <button onClick={() => onClickFunction("Intermediário")}>
              Intermediário
            </button>
            <button onClick={() => onClickFunction("Avançado")}>
              Avançado
            </button>
          </div>
          <button onClick={submitFunction}>Criar</button>
        </div>
        {validation && <p>Nome ou nível não selecionados</p>}
        <div className="techs_Div">
          {techs.map((element) => {
            return (
              <TechCard
                key={techs.indexOf(element)}
                id={element.id}
                title={element.title}
                status={element.status}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
