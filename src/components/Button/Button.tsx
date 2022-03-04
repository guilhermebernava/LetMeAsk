import { ButtonHTMLAttributes } from "react"

import './Button.css'

// cria uma tipagem baseada em todas props padrão dos BOTOES HTML
type buttonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button( props: buttonProps){
     return(
          // ...props vai passar todas as props para o BUTTON
          <button  className="button" {...props} style={{background: props.color}}/>
     );
}