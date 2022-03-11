import { ReactNode } from "react";
import "./Question.css";

type questionProps = {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  children: ReactNode;
};

export function Question(props: questionProps) {
  return (
    <div className="question-div" {...props}>
      <p>{props.content}</p>
      <div className="question-img-div">
        <img src={props.author.avatar} alt="AVATAR" />
        <span>{props.author.name}</span>
        <div>
          {props.children}
        </div>
      </div>
    </div>
  );
}
