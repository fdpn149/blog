import styles from "./Header.module.css"
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Header() {
    let pathname = decodeURIComponent(useLocation().pathname);

    let pathList = [<li key={-1}><a href='/blog/'>首頁</a></li>];

    if (pathname !== "/") {
        let accuPath = "/blog"
        let pathPages = pathname.split("/")

        for (let i = 1; i < pathPages.length; i++) {
            accuPath += '/' + pathPages[i];
            pathList.push(<li key={i}><a href={accuPath}>{pathPages[i]}</a></li>);
        }
    }

    return (
        <>
            <header className={styles.header}>
                <button className={styles.menu}>&#9776;</button>
                <h1>波峰小棧</h1>
                <nav>
                    <ul>
                        <li><Link to='/'>首頁</Link></li>
                        <li><Link to='/'>關於</Link></li>
                    </ul>
                </nav>
            </header>
            <ul className={styles.breadcrumb}>
                {pathList}
            </ul>
        </>)
}

export default Header;