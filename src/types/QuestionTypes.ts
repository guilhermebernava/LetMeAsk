//#region  TYPES
type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    likes: Record<string, {
      authorId: string;
    }>
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

// eslint-disable-next-line @typescript-eslint/no-redeclare
type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  likeCount: number;
  likeId: string | undefined;
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

type RoomParams = {
  id: string;
};
//#endregion

export type {RoomParams, FirebaseQuestions, QuestionType}