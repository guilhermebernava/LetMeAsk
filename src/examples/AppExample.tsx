//por padrão colocamos o mesmo nome do arquivo e da function que gera esse componente!

import { ButtonExample } from "../components/examples/ButtonExample";

// Componente, todo componente do React é uma função com um retorno de HTML
function AppExample() {
  //aqui vai algum codigo JS caso haja necessidade


  //aqui e o retorno da function, no caso aqui vem todo o HTML
  return (
    //chamando o componente criado
    // passando a props para ele
    <div>
      {/* String */}
      <ButtonExample nomeDoBotao="Nome Via Props "/>

      {/* Array de String */}
      <ButtonExample array={["1","2"]}/>

      {/* Number */}
      <ButtonExample numero={1}></ButtonExample>
      
      {/* Object, lembrando que a primeira { } é para aceitar Javascript e 
          a segunda { } e para de fato passar o objeto na props  */}
      <ButtonExample objeto={{teste: 1, nome: "guilherme"}}></ButtonExample>

      {/* Componente JSX/TSX */}
      <ButtonExample componente={ButtonExample}></ButtonExample>
    </div>
  );
}

//aqui exporta a function como default sempre o App
export default AppExample;
