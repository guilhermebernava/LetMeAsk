import { ButtonHTMLAttributes } from "react";

import './EncerrarButton.css'
type buttonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function EncerrarButton(props: buttonProps) {
  return <button className="EncerrarButton" {...props}>Encerrar sala</button>;
}
