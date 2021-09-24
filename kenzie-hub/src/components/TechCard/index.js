import api from "../../services/api";
import "./styles.css";

function TechCard({ title, status, id }) {
  function onClickFunction() {
    api
      .delete(`/users/techs/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("KenzieHubToken")
          )}`,
        },
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="tech">
      <h2>{title}</h2>
      <p>{status}</p>
      <button onClick={onClickFunction}>Remover</button>
    </div>
  );
}

export default TechCard;
