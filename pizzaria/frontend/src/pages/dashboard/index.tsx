import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import styles from './styles.module.scss'
import {Header} from '../../components/Header/index'
import {FiRefreshCcw} from 'react-icons/fi'
import {setupApiClient} from '../../services/api'
import {useState} from 'react'
import Modal from 'react-modal'
import { ModalOrder } from "@/components/ModalOrder";

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
export type OrderItemProps = {
    id: string,
    amount: number,
    order_id: string,
    product_id:string,
    product: {
        id:string,
        name: string,
        description: string,
        price: string,
        banner: string
    }
    order: {
        id: string,
        table: number,
        status: boolean,
        name: string|null   
    }
}

export default function Dashboard({orders}:HomeProps) {
    const [orderList, setOrderList] = useState(orders||[]);
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal() {
        setModalVisible(false)
    }
                
    async function handleOpenModal(id:string) {
        const api = setupApiClient();
        const response = await api.get('/orders/details', {
            params: {
                order_id: id
            }
        })

        setModalItem(response.data);
        setModalVisible(true);
    }

    // será mostrado o modal na pagina principal
    Modal.setAppElement('#__next');

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

                        {/* quando o modalVisible tiver TRUE, vai visualiza-lo */}
            {modalVisible && (
                <ModalOrder
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModal}
                    order={modalItem}
                />
            )}
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