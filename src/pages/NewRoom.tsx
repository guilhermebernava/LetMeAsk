import { FormEvent, useState } from "react";
import { Button } from "../components/Button/Button";
import { Form } from "../components/Form/Form";
import { Illustration } from "../components/Illustration/Illustration";
import { LetMeAskLogo } from "../components/LetMeAskLogo/LetMeAskLogo";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router-dom";

import { database } from "../services/firebase";

import "../styles/NewRoom.css";

export function NewRoom() {
  const history = useHistory();
  const { user } = useAuth();

  const [newRoom, setNewRoom] = useState("");

  //EVENT todo onSubmit manda para gente quando utilizamos um form, button, etc..
  async function handleCreateRoom(event: FormEvent) {
    //previni que a tela seja recarregada automaticamente
    event.preventDefault();

    //checa se a variavel nn esta vazia ou somente com espaços
    if (newRoom.trim() === "") return;

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      Title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div className="NewRoom">
      <Illustration />
      <main>
        <div className="MainContent">
          <LetMeAskLogo />
          <strong>Crie uma nova Sala</strong>
          <Form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Insira o nome da sala"
              onChange={(e) => setNewRoom(e.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar Sala</Button>
          </Form>
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
