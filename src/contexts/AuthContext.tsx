import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

//#region TYPAGEM
type User = {
  id: string;
  name: string;
  avatar: string | null;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};
//#endregion

//CRIANDO CONTEXT
export const AuthContext = createContext({} as AuthContextType);

//CRIANDO COMPONENTE
export function AuthContextProvider(props: AuthContextProviderProps) {
  //CRIANDO STATE
  const [user, setUser] = useState<User>();

  //CRIANDO O USE_EFFECT

  //PRIMEIRO PARAMETRO é uma ARROW function que vai fazer algo
  // SEGUNDO PARAMETRO é quando ele vai executar essa ARROW FUNCTION
  // CASO esteja vazio ele vai executar somente quando o COMPONENTE FOR CHAMADO
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
