import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { QuestionType, FirebaseQuestions } from "../types/QuestionTypes";
import { useAuth } from "./useAuth";

export function useRoom(roomId: string, send:boolean) {
  const { user } = useAuth();

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [pergunta, setPergunta] = useState(0);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

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
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
            isAnswered: value.isAnswered,
          };
        }
      );
      setPergunta(ArrayQuestions.filter( _ => _.isAnswered === false).length);
      setTitle(databaseRoom.Title);
      setQuestions(ArrayQuestions);
    });

    return () => {
      roomRef.off('value');
    };
  }, [roomId, user?.id, send]);

  return { questions, title , pergunta};
}
