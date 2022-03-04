import './LetMeAskLogo.css';
import letmeaskLogo from '../../assets/images/logo.svg'


interface LogoProps{
     margin:string;
}

export function LetMeAskLogo(props: LogoProps){
     return(
          <img className="letMeaskLogo" src={letmeaskLogo} alt="LetMeAsk Logo" style={{margin: props.margin}} />
     );
}