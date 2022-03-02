import React from 'react';
import ReactDOM from 'react-dom';
import AppExample from './examples/AppExample';

import './services/firebase';

//vai pegar todos os componentes que estiverem dentro do React.StrictMode e vai injetar na div com id root
ReactDOM.render(
  //Aqui sera onde vai colocar todos os componentes(telas) que forem criadas
  <React.StrictMode>    
    <AppExample />
  </React.StrictMode>,
  //esse e como o REACT vai encontrar aquele Id e injetar dentro dele
  document.getElementById('root')
);
