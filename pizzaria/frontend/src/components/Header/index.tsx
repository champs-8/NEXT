import styles from './styles.module.scss';
import Link from 'next/link'
import { AuthContext } from '@/contexts/AuthContext';
import {useContext} from 'react'
import {FiLogOut} from 'react-icons/fi'

export function Header() {

    const {signOut} = useContext(AuthContext);
    
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href={'/dashboard'}>
                    <img src='/logo.png' width={200} height={50} />
                </Link>
                <nav className={styles.menuNav}>
                    <Link legacyBehavior href={'/category'}>
                        <a>Categoria</a>
                    </Link>
                    <Link legacyBehavior href={'/menu'}>
                        <a>Cardápio</a>
                    </Link>
                    <button onClick={signOut}>
                        <FiLogOut color='#fff' size={24}/>
                    </button>
                </nav>
            </div>
        </header>
    )
}