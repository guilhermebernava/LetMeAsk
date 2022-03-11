import googleLogo from "../assets/images/google-icon.svg";
import "../styles/Home.css";
import { Button } from "../components/Button/Button";
import { Illustration } from "../components/Illustration/Illustration";
import { LetMeAskLogo } from "../components/LetMeAskLogo/LetMeAskLogo";
import { Form } from "../components/Form/Form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { FormEvent, useState } from "react";

const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleEnterRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '')
        return
    
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      alert('ROOM DOES NOT EXIST!!!')
      return
    }

    if(roomRef.val().endedAt){
      alert('ROOM ALREADY ENDED!!')
      return
    }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div className="HomePage">
      <Illustration />
      <main>
        <div className="MainContent">
          <LetMeAskLogo style={{margin: '10% 0%'}}/>
          <Button onClick={handleCreateRoom} style={{background:"#DB4437"}}>
            <img src={googleLogo} alt="googleLogo" />
            Crie sua sala com o Google
          </Button>
          <div className="separator">ou entre em uma sala</div>
          <Form onSubmit={handleEnterRoom}>
            <input
              type="text"
              placeholder="Insira o codigo da Sala"
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button>Entrar na Sala</Button>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default Home;
