import Header from "@/components/header/Header";

function NotFound() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-theme-bg text-theme-text flex items-center justify-center">
                <section className="text-4xl font-bold">
                    404 - Page Not Found
                </section>
            </main>
            <footer></footer>
        </>
    )
}

export default NotFound;