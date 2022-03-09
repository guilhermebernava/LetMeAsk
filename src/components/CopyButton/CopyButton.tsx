import copyImg from "../../assets/images/copy.svg"

import './CopyButton.css'

export function CopyButton() {
  return (
    <button className="copyButton">
      <div>
          <img className="copyImg"src={copyImg} alt="Copy.svg" />
      </div>
      <span>Sala #5516515466</span>
    </button>
  );
}
