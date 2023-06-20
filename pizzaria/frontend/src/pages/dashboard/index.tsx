import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import styles from './styles.module.scss'
import {Header} from '../../components/Header/index'
import {FiRefreshCcw} from 'react-icons/fi'

export default function Dashboard() {
    return (
        <>
        <Head>
            <title>Painel - ChamPizza</title>
        </Head>
        <div>
            <Header/>
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Ultimos pedidos</h1>
                    <button>
                        <FiRefreshCcw color="#3fffa3" size={25}/>
                    </button>
                </div>

                <article className={styles.listOrders}>
                    <section className={styles.orderItem}>
                        <button>
                            <div className={styles.tag}></div>
                            <span>Mesa 30</span>
                        </button>
                    </section>
                </article>
            </main>
        </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async(ctx) => {
    return {
        props: {}
    }
})