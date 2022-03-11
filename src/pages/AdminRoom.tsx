import letmeaskLogo from "../assets/images/logo.svg";
import "../styles/Rooms.css";

import { useHistory, useParams } from "react-router-dom";

import { CopyButton } from "../components/CopyButton/CopyButton";
import { NenhumaPergunta } from "../components/NenhumaPergunta/NenhumaPergunta";
import { Question } from "../components/Question/Question";
import { RoomParams } from "../types/QuestionTypes";
import { useRoom } from "../hooks/useRoom";
import { EncerrarButton } from "../components/EncerrarButton/EncerrarButton";
import { database } from "../services/firebase";
import { useState } from "react";

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const [send, setSend] = useState(false);

  const { questions, title, pergunta } = useRoom(params.id, send);

  //#region FUNCTIONS
  async function handleAnswredQuestion(questionId: string, active: boolean) {
    if (!active) {
      setSend(!send);
      if (window.confirm("Essa pergunta ja foi mesmo RESPONDIDA ?")) {
        await database
          .ref(`rooms/${params.id}/questions/${questionId}`)
          .update({
            isAnswered: true,
          });
      }
    } else {
      setSend(!send);

      await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
        isAnswered: false,
      });
    }
  }

  async function handleFocus(questionId: string, active: boolean) {
    if (!active) {
      setSend(!send);

      await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
        isHighlighted: true,
      });
    } else {
      setSend(!send);

      await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
        isHighlighted: false,
      });
    }
  }

  async function handleEndRoom() {
    if (window.confirm("Voce deseja mesmo ENCERRAR ESSA SALA  ?")) {
      setSend(!send);

      await database.ref(`rooms/${params.id}`).update({
        endedAt: Date.now(),
      });

      history.push("/");
    }
  }

  async function handleDelete(questionId: string) {
    if (window.confirm("Voce deseja mesmo excluir essa pergunta ?")) {
      setSend(!send);

      await database.ref(`rooms/${params.id}/questions/${questionId}`).remove();
    }
  }
  //#endregion

  return (
    <div className="room-main-div">
      <header className="main-header">
        <img src={letmeaskLogo} alt="logo.svg" />
        <div>
          <CopyButton code={params.id} />
          <EncerrarButton onClick={handleEndRoom} />
        </div>
      </header>
      <main className="main-room">
        <div className="title-div">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{pergunta} pergunta(s)</span>}
        </div>
        {questions.length === 0 ? (
          <NenhumaPergunta />
        ) : (
          //ele vai pegar cada dado dessa lista, e vai pegar cada informação dela
          // e vai passar via DESTRUCTING como PROPS, ou seja E é cada ITEM da LISTA
          // para cada ITEM do map vai ser um COMPONENTE NOVO
          questions.map(
            (e) =>
              !e.isAnswered && (
                <Question key={e.id} {...e}>
                  <div className="buttons-admin">
                    <button onClick={() => handleFocus(e.id, e.isHighlighted)}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12.0003"
                          cy="11.9998"
                          r="9.00375"
                          stroke="#737380"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193"
                          stroke="#737380"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleAnswredQuestion(e.id, e.isAnswered)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z"
                          stroke="#737380"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <button onClick={() => handleDelete(e.id)}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 5.99988H5H21"
                          stroke="#737380"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z"
                          stroke="#737380"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </Question>
              )
          )
        )}
      </main>
    </div>
  );
}
