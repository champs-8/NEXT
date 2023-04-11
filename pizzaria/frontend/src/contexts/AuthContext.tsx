import { type } from "os";
import { createContext, ReactNode, useState } from "react"; 

type AuthContextData = {
    user: userProps,
    isAuthenticated: boolean,
    signIn : (credentials: SingInProps) => Promise<void>;
}

type SingInProps = {
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

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {

    const [user, setUser] = useState<userProps>();

    // se tiver alguma informação armazenada no user, a constante receberá o valor true
    // do contrário, será false
    const isAuthenticated = !!user;

    async function signIn() {
        alert('clicou no login')
    }

    
    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

