import './LetMeAskLogo.css';
import letmeaskLogo from '../../assets/images/logo.svg'
import {ImgHTMLAttributes} from 'react';

interface LogoProps extends ImgHTMLAttributes<HTMLImageElement>{
}

export function LetMeAskLogo(props: LogoProps){
     return(
          <img className="letMeaskLogo" src={letmeaskLogo} alt="LetMeAsk Logo" {...props} />
     );
}