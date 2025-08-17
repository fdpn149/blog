import styles from './Header.module.scss'
import { Link } from 'react-router-dom'

function Header() {
    return (<header className={styles.header}>
        <button className={styles.menu}>&#9776;</button>
        <h1>波峰的小棧</h1>
        <nav>
            <ul>
                <li><Link to='/'>首頁</Link></li>
                <li><Link to='/'>關於</Link></li>
            </ul>
        </nav>
    </header>)
}

export default Header;