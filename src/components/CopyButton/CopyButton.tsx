import copyImg from "../../assets/images/copy.svg"

import './CopyButton.css'

type copyButtonProps = {
  code:string;
}

export function CopyButton(props: copyButtonProps) {
function copyToClipboard(){
  navigator.clipboard.writeText(props.code);
}

  return (
    <button className="copyButton" onClick={copyToClipboard}>
      <div>
          <img className="copyImg"src={copyImg} alt="Copy.svg" />
      </div>
      <span>Sala {props.code}</span>
    </button>
  );
}
