import { createContext, ReactNode, useState } from "react"; 
import {destroyCookie, setCookie} from 'nookies'
import Router from 'next/router'
import {api} from '../services/apiClient'
import {toast} from 'react-toastify'

type AuthContextData = {
    user: userProps;
    isAuthenticated: boolean;
    signIn : (credentials: SignInProps) => Promise<void>;
    signOut : () => void;
    signUp : (credentials:SignUpProps) => Promise<void>
}

type SignInProps = {
    email: string,
    password: string;
}

type userProps = {
    id:string,
    name: string,
    email: string
}

type AuthProviderProps = {
    children: ReactNode
}

type SignUpProps = {
    name: string,
    email: string,
    password: string
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {

    const [user, setUser] = useState<userProps>();

    // se tiver alguma informação armazenada no user, a constante receberá o valor true
    // do contrário, será false
    const isAuthenticated = !!user;

    async function signIn({email, password}: SignInProps) {
        // é uma requisição que pode dar certo, mas pode dar errado tambem
        try {
            const response = await api.post('/login', {
                email,
                password
            });

            console.log(response.data);

            const {id, name, token} = response.data;
            
            setCookie(undefined, '@champizza.token', token, {
                maxAge: 60*60*24*30, //expira emum mês
                path: "/" //quais caminhos terão acesso ao cookie
            })

            setUser({
                id,
                name,
                email,
            })

            //passar para as proximas requisições, o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success('LOGADO COM SUCESSO')
            
            //redirecionar o user para o dashboard
            Router.push(`/dashboard`);
        }
        catch(err) {
            toast.error('ERRO AO ACESSAR')
            console.log(`Erro ao acessar: ${err}`);
        }
    }

    async function signUp({name, email, password}: SignUpProps) {
        try {

            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success('CADASTRADO COM SUCESSO')

            Router.push('/');

        }catch(err){
            toast.error('ERRO AO CADASTRAR')
            console.log(`Error ao cadastrar:\n${err}`);
        }
    }
    
    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}

export function signOut() {
    try{
        destroyCookie(undefined, '@champizza.token')
        //o primeiro argumento é o contexto, o segundo é coookie que foi informado na api
        Router.push('/')
    }catch{
        console.log('erro ao deslogar');
    }
}
