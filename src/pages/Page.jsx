import Header from '../components/Header';
import './Page.css'

function Page(props) {

    const { pathList, children } = props

    return (
        <>
            <Header pathList={pathList} />
            <nav>

            </nav>
            <section>
                <div className='post-container'>
                    {children}
                </div>
            </section>
            <footer>

            </footer>
        </>
    );
}

export default Page;