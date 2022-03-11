import "./Form.css";
import {FormHTMLAttributes} from 'react';

interface formProps extends FormHTMLAttributes<HTMLFormElement>{
}

export function Form(props: formProps) {
  return (
    <form className="formulario" {...props}>
      {props.children}
    </form>
  );
}
