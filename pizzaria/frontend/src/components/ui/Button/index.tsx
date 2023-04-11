import {ReactNode, ButtonHTMLAttributes} from 'react'
import styles from './styles.module.scss'
import {FaSpinner} from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes <HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode,
}

export function Button({loading, children, ...rest}: ButtonProps) { //todo restante de propriedade que passar, vai ser colocado no rest
    return(
        <button className={styles.button} disabled={loading} {...rest}> 
        {/* toda vez que o loading tiver true, vai desativar o botao */}

            {loading?(<FaSpinner color="#FFF" size={16} />) : (
                <a className={styles.buttonText}>{children}</a>
            )}
            {/* vai passar o nome que for declarado no index */} 
        </button>
    )
};