import { Button } from "../Button/Button";
import "./Form.css";

interface FormProps{
     type:string;
     placeholder: string;
     buttonName: string;
}

export function Form(props: FormProps) {
  return (
    <form className="formulario">
      <input type={props.type} placeholder={props.placeholder} />
      <Button type="submit">{props.buttonName}</Button>
    </form>
  );
}
