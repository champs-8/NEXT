import React, {ReactNode, createContext, useState} from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// o que sendo fornecido no contexto
type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
    //é uma função que vai passar como parametro informações de 
    //tal tipagem e retorna uma promise vazia
    signIn : (infos: SingInProps) => Promise<void>
}

//tudo aquilo que é informado ao banco de dados quando o usuario é logado
type UserProps = {
    id: string,
    name: string,
    email: string,
    token: string
}

type AuthProviderProps = {
    children : ReactNode;
}

type SingInProps = {
    email: string,
    password: string
}

//nosso contexto vai respeitar essas tipagens acima
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {

    //essa constante vai respeitar a tipagem do user
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })

    const [loadingAuth, setLoadingAuth] = useState(false);

    //se o user tiver algum name, é porque foi feito o login,
    // as !! transforma a constante em um tipo booleano.
    const isAuthenticated = !!user.email

    //metodo de login
    async function signIn({email, password}: SingInProps) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/login', {email, password})

            const {id, name, token} = response.data;

            // o AsyncStorage so salva string e nao objeto,
            // teremos que converter o obj

            const data = {
                ...response.data
            };
            
            await AsyncStorage.setItem('@champizzaMob', JSON.stringify(data))

            //informando as proximas requisições para utilizar o token
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser({id, name, token, email});
            setLoadingAuth(false);

            console.log('logado pilantra');
            console.log(isAuthenticated);

        }catch(err){
            console.log(`Erro ao acessar: ${err}`);
            setLoadingAuth(false);
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
            
            {/* todas as paginas vao passar por aqui,
            e o contexto deve ficar por volta da aplicação */}

            {children}
        </AuthContext.Provider>
    );
}