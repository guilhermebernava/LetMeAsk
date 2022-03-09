import perguntasLogo from "../../assets/images/empty-questions.svg";

import './NenhumaPergunta.css'
export function NenhumaPergunta() {
  return (
    <main className="main">
      <div>
        <img src={perguntasLogo} alt="" />
        <h2>Nenhuma pergunta por aqui...</h2>
        <p>
          Envie o código desta sala para seus amigos e comece a responder
          perguntas!
        </p>
      </div>
    </main>
  );
}
