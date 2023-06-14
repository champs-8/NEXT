import Head from "next/head";
import styles from './styles.module.scss';
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Header } from "@/components/Header";
import {FiUpload} from 'react-icons/fi'
import { ChangeEvent, useState, FormEvent } from "react";
import {setupApiClient} from '../../services/api'
import { type } from "os";
import {toast} from 'react-toastify'
 
type ItemProps = {
    id:string;
    name: string
}

//nessa interface, o item props passara um id e um name, por isso usou o array
interface CategoriesProps {
    categoryList: ItemProps[]
}

export default function Menu({categoryList}:CategoriesProps) {
    
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null)

    //se acessou a pagina e nao tem nenhuma categoria, vai abrir uma array vazio
    const [categories, setCategories] = useState(categoryList || [])

    //vai ser selecionado sempre a primeira categoria, ate trocar
    const [categorySelected, setCategorySelected] = useState(0)

    //setar informações dos inputs
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');


    function handleFile(event:ChangeEvent<HTMLInputElement>) {
        
        //se nao enviar nada, so retorna
        if(!event.target.files) {
            return;
        }
        //vai pegar a imagem
        const image = event.target.files[0];

        //se nao tiver imagem, retorna
        if(!image) {
            return;
        }
        //se for desses dois formatos, entra no prewie
        if(image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image)
            //prewie ficticia
            setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        }
    } 

    //qunado voce seleciona uma nova categoria na lista
    function handleCategory(e) {
        setCategorySelected(e.target.value)
    }

    //NAO ESQUECER DE IMPORTAR A TIPAGEM FORMEVENT
    async function handleRegister(e:FormEvent) {
        e.preventDefault();

        try{
            //criando aqui o tipo de formData-> multiPart formdata
            const data = new FormData();

            //verificando se enviou todos os dados
            if(name === ''|| price === '' || description === '' || imageAvatar === null){
                toast.error('Preencha todos os campos')
                return;
            }

            //isso tudo é enviando os dados do formulário para o banco de dados
            //acrescentar em cada info, os valores recebidos do cliente
            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupApiClient();
            await apiClient.post('/products', data);

            toast.success('Produto cadastrado')
            
            
        }catch(err){
            console.log(err);
            toast.error('Erro ao cadastrar')
        }
        setName('');
        setPrice('');
        setDescription('');
        setImageAvatar(null);
        setCategorySelected(0);
        setAvatarUrl('');
    }
    
     return(
        <>
        <Head>
            <title>Novo produto - ChamPizza</title>
        </Head>
        <div>
            <Header/>
            <main className={styles.container}>
                <h1>Novo produto</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    
                    {/* vai criar uma mascara que vau envolver a imagem do input */}
                    <label className={styles.label}>
                        <span>
                            <FiUpload size={30} color="#fff"/>
                        </span>   
                        <input type='file' accept="image/png, image/jpeg" onChange={handleFile}/>


                        {/* se deixar a tag da maneira convencional, fica quebrada
                        agora fará uma verificação condicional */}

                        {/* se tiver algo no avatarUrl, aí sim renderiza */}

                        {avatarUrl && (
                            <img 
                                className= {styles.preview}
                                src={avatarUrl}
                                alt="Foto do produto"
                                width={250}
                                height={250}
                            />
                        )}
                        
                    </label>
                    
                    {/* valor do useState da categoria selecionada */}
                    <select value={categorySelected} onChange={handleCategory}>
                        {categories.map( (item, index)=> {
                            return(

                                //vai percorrer todo o array de categoria e vai retornar
                                //as informações dentro da tag option
                                <option key={item.id} value={index}>{item.name}</option>
                            )
                        })}
                    </select>

                    <input type="text"
                        placeholder="Digite o nome do produto" 
                        className={styles.input}
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Preço do produto" 
                        className={styles.input}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descreva seu produto" 
                        className={styles.input}
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />

                    <button 
                        className={styles.buttonAdd} 
                        type="submit"> Cadastrar
                    </button>
                </form>
            </main>
        </div>
        </>
     )
}

//usuarios logados podem acessar.
export const getServerSideProps = canSSRAuth(async(ctx) => {

    //vai buscar as informações na api
    const apiClient = setupApiClient(ctx);
    const response = await apiClient.get('/categories')

    // console.log(response.data);

    
    //vai retornar para a aplicação o response da api
    return{
        props: {
            categoryList: response.data
        }
    }
})