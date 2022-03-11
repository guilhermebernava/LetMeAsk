import letmeaskLogo from "../assets/images/logo.svg";
import checked from "../assets/images/check.svg";
import "../styles/Rooms.css";

import { useParams } from "react-router-dom";

import { CopyButton } from "../components/CopyButton/CopyButton";
import { NenhumaPergunta } from "../components/NenhumaPergunta/NenhumaPergunta";
import { Button } from "../components/Button/Button";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Question } from "../components/Question/Question";
import { RoomParams } from "../types/QuestionTypes";
import { useRoom } from "../hooks/useRoom";

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [question, setQuestion] = useState("");
  const [send,setSend] = useState(false);
  const { questions, title , pergunta} = useRoom(params.id,send);

  async function handleCreateQuestion(e: FormEvent) {
    e.preventDefault();

    if (question.trim() === "") return;

    if (!user) throw new Error("You must be logged in !!!");

    const newQuestion = {
      content: question,
      author: {
        name: user.name,
        id: user.id,
        avatar: user.avatar,
      },
      like: {
        authorId: user.id,
      },
      isHighlighted: false,
      isAnswered: false,
    };
    setSend(!send);
    await database.ref(`rooms/${params.id}/questions`).push(newQuestion);
    setQuestion("");
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    console.log(likeId);
    if (likeId) {
      setSend(true);
      await database
        .ref(`rooms/${params.id}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      setSend(false);
      await database
        .ref(`rooms/${params.id}/questions/${questionId}/likes`)
        .push({
          authorId: user?.id,
        });
      }
    }

  return (
    <div className="room-main-div">
      <header className="main-header">
        <img src={letmeaskLogo} alt="logo.svg" />
        <div>
          <CopyButton code={params.id} />
        </div>
      </header>
      <main className="main-room">
        <div className="title-div">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{pergunta} pergunta(s)</span>}
        </div>
        <form onSubmit={handleCreateQuestion}>
          <textarea
            className="inputArea"
            placeholder="O que você quer perguntar ?"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />
          <div className="form-div">
            {user ? (
              <div className="userInfo">
                <img src={user.avatar ?? checked} alt="user avatar" />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Enviar Pergunta
            </Button>
          </div>
        </form>
        {questions.length === 0 ? (
          <NenhumaPergunta />
        ) : (
          //ele vai pegar cada dado dessa lista, e vai pegar cada informação dela
          // e vai passar via DESTRUCTING como PROPS, ou seja E é cada ITEM da LISTA
          // para cada ITEM do map vai ser um COMPONENTE NOVO
          questions.map((e) => (
            !e.isAnswered  &&
            <Question key={e.id} {...e}>
              <div className="button-room">
                <span>{e.likeCount}</span>
                <button
                  className={`like-button ${e.likeId ? 'liked' : ''}`}
                  type="button"
                  onClick={() => handleLikeQuestion(e.id, e.likeId)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                      stroke="#737380"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </Question>
          ))
        )}
      </main>
    </div>
  );
}
