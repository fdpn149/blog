import './Header.module.scss'
import { Link } from 'react-router-dom'

function Header() {
    return <header>
        <h1>波峰的小棧</h1>
        <nav>
            <ul>
                {/* <li><Link to="/1" className="text-white mx-2">Android 輸入法</Link></li>
                    <li><Link to="/2" className="text-white mx-2">React 學習筆記</Link></li> */}
                <li><a href='#'>首頁</a></li>
                <li><a href='#'>關於</a></li>
            </ul>
        </nav>
    </header>
}

export default Header;