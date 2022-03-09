import letmeaskLogo from "../assets/images/logo.svg";

import "../styles/Rooms.css";
import { CopyButton } from "../components/CopyButton/CopyButton";
import { NenhumaPergunta } from "../components/NenhumaPergunta/NenhumaPergunta";
import { EncerrarButton } from "../components/EncerrarButton/EncerrarButton";

export function Room() {
  return (
    <div>
      <header className="main-header">
        <img src={letmeaskLogo} alt="logo.svg" />
        <div>
          <CopyButton />
          <EncerrarButton />
        </div>
      </header>
      <main className="main">
        <h1>Sala React Q&A</h1>
        <NenhumaPergunta />
      </main>
    </div>
  );
}
