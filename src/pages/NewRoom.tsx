import { Form } from "../components/Form/Form";
import { Illustration } from "../components/Illustration/Illustration";
import { LetMeAskLogo } from "../components/LetMeAskLogo/LetMeAskLogo";

import "../styles/NewRoom.css";

export function NewRoom() {
  return (
    <div className="NewRoom">
      <Illustration />
      <main>
        <div className="MainContent">
          <LetMeAskLogo margin="0px 0px" />
          <strong>Crie uma nova Sala</strong>
          <Form
            placeholder="Nome da Sala"
            type="text"
            buttonName="Criar Sala"
          />
          <small>
            {" "}
            Quer entrar em uma sala já existente?{" "}
            <a href="teste">Clique aqui</a>
          </small>
        </div>
      </main>
    </div>
  );
}
