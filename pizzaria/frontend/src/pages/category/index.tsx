import Head from "next/head";
import { Header } from "@/components/Header";
import styles from './styles.module.scss'
import { FormEvent, useState } from "react";
import {  setupApiClient } from '../../services/api';
import { toast } from "react-toastify";
import {canSSRAuth} from '../../utils/canSSRAuth'

export default function Category() {

    const [name, setName] = useState('');

    async function handleRegister(event:FormEvent) {
        event.preventDefault();

        if(name === '') {
            return;
        }

        //requisição para a rota 
        const apiClient = setupApiClient();
        await apiClient.post('/categories', {
            name: name
        })

        toast.success('Categoria cadastrada com sucesso')
        //depois que cadastrar, vai voltar o input de categoria para vazio
        setName('');

    }
    
    return(
        <>
            <Head>
                <title>Nova categoria - ChamPizza</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>Cadastrar categorias</h1>
                    <form className={styles.form} onSubmit={handleRegister}>
                        <input className={styles.input} 
                            type="text" 
                            placeholder="Digite o nome da categoria" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                        <button type="submit" className={styles.button}>
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
}
export const getServerSideProps = canSSRAuth(async(ctx)=> {
    return {
        props: {}
    }
})