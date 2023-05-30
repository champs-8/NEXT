import Head from "next/head"
import logoImg from "../../public/logo.png" //forma correta dese importar um imagem
import styles from "../styles/home.module.scss" // trabalhar com estilos
import Image from "next/image" // tag para se trabalhar com imagem, inves do html
import Link from "next/link"
import {Input} from "../components/ui/Input"
import {Button} from "../components/ui/Button" 
import { AuthContext } from "@/contexts/AuthContext"
import { FormEvent, useContext, useState } from 'react'
import {toast} from 'react-toastify'

export default function Home() {
  //usar o contexto que importou
  const {signIn} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //loading so vai ser true quando clicar no botao
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    //verifica se o usuario passou algum dado
    if (email === '' || password === '' ) {
      toast.warning('PREENCHA OS CAMPOS')
      return;
    }

    //se tiver passado, vai carregar o loading
    setLoading(true);
    
    let data = {
      email,
      password
    };

    //é uma promisse, vai consumir uma API, entao precisa do await
    await signIn(data);

    setLoading(false);
  }

  return (
    //titulo dinamico

    <>
    <Head>
      <title>Champizza - Faça seu login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="logo Champs pizzaria" id={styles.logo} priority={true}/>
      <div className={styles.login}>
        <form onSubmit={handleLogin}>

          {/* o value vai ser o valor do useState 
          onchange é toda vez que digita algo la dentro da caixa,
          e será configurado no set... o e.target.value, que é o que foi digitado */}
          <Input placeholder="Digite seu usuário" type="text" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <Input placeholder="Digite sua senha" type="password" value={password} onChange={ (e) => setPassword(e.target.value) }/>

          {/* enquanto tiver carregando */}
          <Button type="submit" loading={loading}> Acessar</Button>
        </form>

        {/* no link sempre precisa utilizar o href */}
        {/* legacyBehavior serve para poder usar uma ancora dentro do link */}
        <Link legacyBehavior href='/sign'><a className={styles.text}>Não possui uma conta? Cadastre-se</a></Link>
      </div>
    </div>
    </> //frag, uma tag sem definição
  )
}
