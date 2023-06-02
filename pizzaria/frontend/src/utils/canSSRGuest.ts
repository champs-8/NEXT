import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import {parseCookies} from 'nookies'

//usuário visitantes podem acesar somente.
//se estiver logado, nao poderá acessar a pagina de login
//pelo que entendi, o generic <P> é para tipar e obrigar algo a usar o mesmo tipo
export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext):Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        //se tiver token logado, nao poderá ir para a página de login

        if(cookies['@champizza.token']) {
            return {
                //redirecionar
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
        
        return await fn(ctx)
    }
}