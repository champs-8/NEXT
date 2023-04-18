import { type } from "os";
import { createContext, ReactNode, useState } from "react"; 
import {destroyCookie} from 'nookies'
import router from 'next/router'

type AuthContextData = {
    user: userProps,
    isAuthenticated: boolean,
    signIn : (credentials: SignInProps) => Promise<void>;
    signOut : () => void;
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

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {

    const [user, setUser] = useState<userProps>();

    // se tiver alguma informação armazenada no user, a constante receberá o valor true
    // do contrário, será false
    const isAuthenticated = !!user;

    async function signIn({email, password}: SignInProps) {
        console.log(`Email: ${email}`);
        console.log(`password: ${password}`);
    }

    
    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export function signOut() {
    try{
        destroyCookie(undefined, '@champizza.token')
        //o primeiro argumento é o contexto, o segundo é coookie que foi informado na api
        router.push('/')
    }catch{
        console.log('erro ao deslogar');
    }
}
