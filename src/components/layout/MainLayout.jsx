import React, { useState } from 'react';
import { Menu, X, Home, BookOpen, Settings } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './MainLayout.module.scss';

const MainLayout = ({ children, sidebar }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Determine current section for highlighting
    const isHome = location.pathname === '/';
    const isTutorials = location.pathname.startsWith('/tutorials');

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate('/');
        // Force the trailing slash in the URL bar for GitHub Pages compatibility
        window.history.replaceState(null, '', import.meta.env.BASE_URL);
    };

    return (
        <div className={styles.appContainer}>
            {/* Mobile Header */}
            <header className={styles.mobileHeader}>
                <Link to="/" className={styles.brandLink} onClick={handleHomeClick}>
                    <h1 className={styles.brandTitle}>波峰小棧</h1>
                    <p className={styles.brandSubtitle}>Metro Learning Station</p>
                </Link>
                <button
                    className={styles.menuBtn}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            <div className={styles.mainLayout}>
                {/* Sidebar Navigation */}
                <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                    {sidebar ? (
                        sidebar
                    ) : (
                        <>
                            <div className={styles.sidebarHeader}>
                                <Link to="/" className={styles.brandLink} onClick={handleHomeClick}>
                                    <h1 className={styles.brandTitle}>波峰小棧</h1>
                                    <p className={styles.brandSubtitle}>Metro Learning Station</p>
                                </Link>
                            </div>

                            <nav className={styles.navConfig}>
                                <Link to="/" className={`${styles.navItem} ${isHome ? styles.active : ''}`}>
                                    <Home size={20} className={styles.navIcon} />
                                    <span className={styles.navText}>首頁大廳</span>
                                </Link>

                                <div className={styles.navSectionLabel}>學習路線</div>

                                <Link to="/tutorials/AndroidApp開發" className={`${styles.navItem} ${isTutorials ? styles.active : ''}`}>
                                    <BookOpen size={20} className={styles.navIcon} />
                                    <span className={styles.navText}>Android App 開發</span>
                                </Link>

                                {/* Future routes can be added here */}
                                <div className={styles.navSectionLabel}>系統</div>
                                <Link to="/settings" className={`${styles.navItem}`}>
                                    <Settings size={20} className={styles.navIcon} />
                                    <span className={styles.navText}>設定</span>
                                </Link>
                            </nav>

                            <div className={styles.sidebarFooter}>
                                <p>© 2024 Bofeng</p>
                            </div>
                        </>
                    )}
                </aside>

                {/* Main Content Area */}
                <main className={styles.contentArea}>
                    {/* Background Pattern similar to Metro */}
                    <div className={styles.bgPattern} />

                    <div className={styles.contentWrapper}>
                        {children}
                    </div>
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default MainLayout;
