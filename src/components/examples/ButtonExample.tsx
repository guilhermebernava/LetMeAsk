//   --COMPONENTE--

//Interface para tipar quais tipos de propriedades meu componente Button pode receber
interface buttonProps{
     //isso { ? } diz que essa variavel não é obrigatoria
     nomeDoBotao?:string;

     //array de string
     array?: string[];

     numero?: number;

     //objeto generico
     objeto?: Object;

     //componente JSX/TSX
     componente?: React.ReactNode;
}

//estou dizendo que essa variavel props, vai receber tudo o que a interface tiver dentro dela
export function ButtonExample(props:buttonProps){
     return(
          // para acessar as propriedades de props, como ela é um dado em Javascript
          // precisamos utilizar as { } para utilizar esse codigo Javascript no JSX
          <button>{props.nomeDoBotao || "Sem Nome via Props"}</button>
     );
}