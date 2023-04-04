import Head from "next/head"
import logoImg from "/public/logo.png" //forma correta dese importar um imagem
import styles from "../styles/home.module.scss"
import Image from "next/image" // tag para se trabalhar com imagem, inves do html
import {Input} from "../pages/components/ui/Input"
import {Button} from "../pages/components/ui/Button"

export default function Home() {
  return (
    //titulo dinamico

    <>
    <Head>
      <title>Champizza - Faça seu login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="logo Champs pizzaria" id={styles.logo}/>
      <div className={styles.login}>
        <form>
          <Input placeholder="Digite seu usuário" type="text"/>
          <Input placeholder="Digite sua senha" type="password"/>

          {/* enquanto tiver carregando */}
          <Button type="submit" loading={false}> Cadastrar</Button>
        </form>
      </div>
    </div>
    </> //frag, uma tag sem definição
  )
}
