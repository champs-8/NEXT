import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import styles from './styles.module.scss'
import {Header} from '../../components/Header/index'
import {FiRefreshCcw} from 'react-icons/fi'
import {setupApiClient} from '../../services/api'
import {useState} from 'react'

type OrderProps = {
    id: string,
    table: string | number,
    status: boolean,
    draft: boolean,
    name: string | null
}
interface HomeProps{
    //vai receber uma lista que cada objeto vai ter essas caracteristicas
    orders:OrderProps[];
}

export default function Dashboard({orders}:HomeProps) {
    const [orderList, setOrderList] = useState(orders||[]);

    function handleOpenModal(id:string) {
        
    }

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

                    {orderList.map(item => (
                        //react pede que a primeira propriedade do map(eu acho) seja uam key
                        <section key={item.id} className={styles.orderItem}>

                            {/* toda vez que clicar no pedido vai abrir o modal */}
                            <button onClick={()=> handleOpenModal(item.id)}>
                                <div className={styles.tag}></div>
                                <span>Mesa {item.table}</span>
                            </button>
                        </section>
                    ))}
                </article>
            </main>
        </div>
        </>
    );
}

//quando o usuario entrar na rota /dashboard, o servidor irá ate o banco de dados, 
//pela api
//pegará os dados das ordens ja feitas, retornará para o props,
//que será utilizada nas funcionalidades da pagina,-> function Dashboard()
export const getServerSideProps = canSSRAuth(async(ctx) => {
    const api = setupApiClient(ctx);
    const response = await api.get('/orders/no-draft')

    // console.log(response.data);

    return {
        props: {
            orders: response.data
        }
    }
})