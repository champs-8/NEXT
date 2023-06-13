import Head from "next/head";
import styles from './styles.module.scss';
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Header } from "@/components/Header";
import {FiUpload} from 'react-icons/fi'
import { ChangeEvent, useState } from "react";
 

export default function Menu() {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null)

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
    
     return(
        <>
        <Head>
            <title>Novo produto - ChamPizza</title>
        </Head>
        <div>
            <Header/>
            <main className={styles.container}>
                <h1>Novo produto</h1>

                <form className={styles.form}>
                    
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
                    
                    <select>

                        <option value="">Bebida</option>
                        <option value="">Pizza</option>
                    </select>
                    <input type="text" placeholder="Digite o nome do produto" className={styles.input}/>
                    <input type="text" placeholder="Preço do produto" className={styles.input}/>
                    <textarea placeholder="Descreva seu produto" className={styles.input}></textarea>

                    <button className={styles.buttonAdd} type="submit"> Cadastrar</button>
                </form>
            </main>
        </div>
        </>
     )
}

//usuarios logados podem acessar.
export const getServerSideProps = canSSRAuth(async(ctx) => {
    return{
        props: {}
    }
})