//somente usuários logados
//se nao tiver cookie armazenado, será redirecionado para o login

import { AuthTokenError } from '@/services/errors/AuthTokenError';
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import {parseCookies, destroyCookie} from 'nookies'

export function canSSRAuth<P>(fn:GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        //vai receber o token armazenado, se tiver algum ele poderá continuar,
        //se nao, vai ser redirecionado ao login
        
        const cookies = parseCookies(ctx);

        const token = cookies['@champizza.token'];

        if(!token) {
            return {
                redirect:{
                    destination: '/',
                    permanent: false
                }
            }
        }

        //se der algum erro com o token, ele o destruirá 
        //e voltará para a tela de login

        try{
            return await fn(ctx)
        }catch(err){
            if(err instanceof AuthTokenError){
                destroyCookie(ctx, '@champizza.token');

                return{
                    redirect:{
                        destination:'/',
                        permanent: false
                    }
                }
            }
        }
    }
}
