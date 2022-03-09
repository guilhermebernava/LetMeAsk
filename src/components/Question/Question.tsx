import like from "../../assets/images/like.svg";
import "./Question.css";

type questionProps = {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

export function Question(props: questionProps) {
  return (
    <div className="question-div">
      <p>{props.content}</p>
      <div className="question-img-div">
        <img src={props.author.avatar} alt="AVATAR" />
        <span>{props.author.name}</span>
        <div>
          <small>
            10 <img src={like} alt="LIKES" />
          </small>
        </div>
      </div>
    </div>
  );
}
