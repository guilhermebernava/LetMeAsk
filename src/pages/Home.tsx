import googleLogo from "../assets/images/google-icon.svg";

import "../styles/Home.css";
import { Button } from "../components/Button/Button";
import { Illustration } from "../components/Illustration/Illustration";
import { LetMeAskLogo } from "../components/LetMeAskLogo/LetMeAskLogo";
import { Form } from "../components/Form/Form";

const Home = () => {
  return (
    <div className="HomePage">
      <Illustration />
      <main>
        <div className="MainContent">
          <LetMeAskLogo margin="64px 0px" />
          <Button color="#DB4437">
            <img src={googleLogo} alt="googleLogo" />
            Crie sua sala com o Google
          </Button>
          <div className="separator">ou entre em uma sala</div>
          <Form
            placeholder="Digite o código da sala"
            type="text"
            buttonName="Entrar na Sala"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
