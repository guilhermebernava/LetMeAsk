import illustrationLogo from "../../assets/images/illustration.svg";

import "./Illustration.css";

export function Illustration() {
  return (
    <div className="Illustration">
      <div className="div">
        <img src={illustrationLogo} alt="illustration logo" />
        <strong>Toda pergunta tem uma Resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </div>
    </div>
  );
}
