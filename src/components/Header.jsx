import './Header.css'

import Logo from '/logo.svg'

function Header() {
    return (
        <>
            <header>
                <div className='logo'>
                    <svg className='wave' width="256" height="32" viewBox="0 0 256 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M128 8C128 8 136 0 144 0C148 0 154 4 160 8C166 12 172 16 176 16C184 16 192 8 192 8C192 8 200 0 208 0C212 0 218 4 224 8C230 12 236 16 240 16C248 16 256 8 256 8V32L0 32V8.00005C0 8.00005 8 4.86374e-05 16 4.86374e-05C20 4.86374e-05 26 4.00005 32 8.00005C38 12.0001 44 16.0001 48 16.0001C56 16.0001 64 8.00005 64 8.00005C64 8.00005 72 0 80 0C84 0 90 4 96 8C102 12 108 16 112 16C120 16 128 8 128 8Z" />
                    </svg>
                    <img src={Logo} alt='logo' />
                </div>
            </header>
        </>
    );
}

export default Header;