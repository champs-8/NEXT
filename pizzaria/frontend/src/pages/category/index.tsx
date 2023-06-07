import Head from "next/head";
import { Header } from "@/components/Header";
import styles from './styles.module.scss'
import { FormEvent, useState } from "react";

export default function Category() {

    const [name, setName] = useState('');

    async function handleRegister(event:FormEvent) {
        event.preventDefault();
        alert('Categoria '+ name);
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
                        <button type={"submit"} className={styles.button}>
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
}