import React, {ReactNode, createContext, useState} from "react";

type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
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

//nosso contexto vai respeitar essas tipagens acima
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {

    //essa constante vai respeitar a tipagem do user
    const [user, setUser] = useState<UserProps>({
        email: 'samara@',
        id: '123',
        name: 'samara',
        token: '123123123'
    })

    //se o user tiver algum name, é porque foi feito o login,
    // as !! transforma a constante em um tipo booleano.
    const isAuthenticated = !!user.name

    return(
        <AuthContext.Provider value={{user, isAuthenticated}}>
            
            {/* todas as paginas vao passar por aqui,
            e o contexto deve ficar por volta da aplicação */}

            {children}
        </AuthContext.Provider>
    );
}