import { AppProps } from "next/app"
import '@/styles/global.scss'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    //colocar ao redor de todas as páginas, o provedor de informações de contexto
    <AuthProvider >
      <Component {...pageProps} />
      <ToastContainer autoClose={3000}/>
    </AuthProvider>
  )
}
