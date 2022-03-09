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
import { useEffect } from "react";
import { Question } from "../components/Question/Question";

//#region  TYPES
type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

type RoomParams = {
  id: string;
};
//#endregion

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${params.id}/questions`).push(newQuestion);
    setQuestion("");
  }

  useEffect(() => {
    const roomRef = database.ref(`rooms/${params.id}`);

    roomRef.once("value", (room) => {
      const databaseRoom = room.val();
      const FirebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const ArrayQuestions = Object.entries(FirebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          };
        }
      );

      setTitle(databaseRoom.Title);
      setQuestions(ArrayQuestions);
    });
  }, [params.id, handleCreateQuestion]);

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
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
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
          questions.map((e) => <Question {...e} />)
        )}
      </main>
    </div>
  );
}
