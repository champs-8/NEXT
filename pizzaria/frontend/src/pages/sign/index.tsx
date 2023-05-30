import { useState, FormEvent, useContext } from "react"
import Head from "next/head"
import logoImg from "../../../public/logo.png" //forma correta dese importar um imagem
import styles from "../../styles/home.module.scss"
import Image from "next/image" // tag para se trabalhar com imagem, inves do html
import Link from "next/link"
import {Input} from "../../components/ui/Input"
import {Button} from "../../components/ui/Button"
import { AuthContext } from "@/contexts/AuthContext"

export default function Sign() {
  const {signUp} = useContext(AuthContext)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //Formevent, para o TS entender que estamos passando o evento como parametro
  async function handleSingUp(event: FormEvent) {
    event.preventDefault();

    if(name ===''|| email === '' || password === '') {
      alert('Preencha todos os dados');
      return;
    }
    setLoading(true);

    let data = {
      name,
      email,
      password
    }
    
    await signUp(data);

    setLoading(false)
  }

  return (

    <>
    <Head>
      <title>Faça seu cadastro</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="logo Champs pizzaria" id={styles.logo}/>
      <div className={styles.login}>

        <h1>Criando sua conta</h1>
        <form onSubmit={handleSingUp}>
          <Input placeholder="Digite seu nome" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          <Input placeholder="Digite seu email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="Digite sua senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

          {/* enquanto tiver carregando */}
          <Button type="submit" loading={loading}> Cadastrar</Button>
        </form>

        {/* no link sempre precisa utilizar o href */}
        <Link href='/' legacyBehavior><a className={styles.text}>Já possui conta? Faça o login</a></Link>
      </div>
    </div>
    </> //frag, uma tag sem definição
  )
}
