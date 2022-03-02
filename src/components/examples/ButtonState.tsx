import { useState } from "react";

export function ButtonState(){

     //criação de um STATE, todos os STATE precisam de ter uma VARIAVEL
     // e um SETTER para mudar seu valor
     //dentro dos ( ) do useState você vai passar o valor inicial dessa 
     // variavel que você criou.
     const [contador, setContador] = useState(0);

     //function criada para cada vez que for chamada, alterar o valor da
     // variavel contador (STATE)
     function increment(){

          //somente atraves desse setter é possivel alterar o valor da variavel.
          setContador(contador + 1);
     }

     return(

          //todos ATRIBUTOS do HTML são escritos em camelCase

          //quando clicar nesse button o valor da variavel contador vai aumentar
          <button onClick={increment}></button>
     );
}