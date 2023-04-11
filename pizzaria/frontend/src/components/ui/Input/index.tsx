import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'//trabalhar com inputs
import styles from './styles.module.scss'

//quem for utilizar o componenete do input, vai passar o que quer passar de 
//propriedade nele, dentro do rest.
//vai pegar a tipagem do input nativo mesmo

interface InputProps extends InputHTMLAttributes <HTMLInputElement> {}
interface TextAreaProps extends TextareaHTMLAttributes <HTMLTextAreaElement> {}



export function Input({...rest}: InputProps) {
    return (
        <input className={styles.input} {...rest}/>
    )
};

export function TextArea({...rest}: TextAreaProps){
    return (
        <textarea className={styles.input}{...rest}></textarea>
    )
}