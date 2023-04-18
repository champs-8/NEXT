import axios, {AxiosError} from "axios";
import { error } from "console";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "@/contexts/AuthContext";

export function setupApiClient(ctx = undefined) {
    // se nao fornecer o contexto, ctx será undefined
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            Authorization: `Bearer ${cookies['@champizza.token']}`
        }
    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response.status === 401) {
            // qualquer erro 401 (não autorizado, devemos deslogar o usuario)
            if(typeof window !== undefined) {
                //chamar função de logout
                signOut();
            }else{
                return Promise.reject(new AuthTokenError());
            }
        }

        return Promise.reject(error);
    })

}