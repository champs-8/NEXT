import Head from "next/head"
import logoImg from "../../../public/logo.png" //forma correta dese importar um imagem
import styles from "../../styles/home.module.scss"
import Image from "next/image" // tag para se trabalhar com imagem, inves do html
import Link from "next/link"
import {Input} from "../../components/ui/Input"
import {Button} from "../../components/ui/Button"

export default function Sign() {
  return (

    <>
    <Head>
      <title>Faça seu cadastro</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="logo Champs pizzaria" id={styles.logo}/>
      <div className={styles.login}>

        <h1>Criando sua conta</h1>
        <form>
          <Input placeholder="Digite seu nome" type="text"/>
          <Input placeholder="Digite seu email" type="text"/>
          <Input placeholder="Digite sua senha" type="password"/>

          {/* enquanto tiver carregando */}
          <Button type="submit" loading={false}> Cadastrar</Button>
        </form>

        {/* no link sempre precisa utilizar o href */}
        <Link href='/' legacyBehavior><a className={styles.text}>Já possui conta? Faça o login</a></Link>
      </div>
    </div>
    </> //frag, uma tag sem definição
  )
}
