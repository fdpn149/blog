import { MainLayout } from "@/components";

function NotFound() {
    return (
        <MainLayout>
            <section style={{ textAlign: 'center', padding: '100px 20px' }}>
                <h1>404</h1>
                <p>Page Not Found</p>
            </section>
        </MainLayout>
    )
}

export default NotFound;