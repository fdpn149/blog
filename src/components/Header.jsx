import './Header.css'

import Logo from '/logo.svg'

function Header({ pathList }) {

    let pathLis = [<li key={-1}><a href='/#'>首頁</a></li>];
    let accuPath = "/#"

    for (let i = 0; i < pathList.length; i++) {
        accuPath += '/' + pathList[i];
        pathLis.push(<li key={i}><a href={accuPath}>{pathList[i]}</a></li>);
    }

    return (
        <>
            <header>
                <div className='logo'>
                    <img src={Logo} alt='logo' />
                    <p>波峰的小棧</p>
                </div>
                <ul className='breadcrumb'>
                    {pathLis}
                </ul>
            </header>
        </>
    );
}

export default Header;