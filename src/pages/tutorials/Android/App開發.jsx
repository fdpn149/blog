import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import MetroMap from '@/components/metro/MetroMap';
import ContentPanel from '@/components/metro/ContentPanel';
import styles from '@/components/metro/Metro.module.scss';

import { ROUTES, ANDROID_ROUTE } from './data';
import { StationType } from '@/components/metro/StationNode';

function Page() {
    const navigate = useNavigate();

    // State for Config
    const [currentRouteId, setCurrentRouteId] = useState(ANDROID_ROUTE.id);

    // State for Stations (derived from route)
    const [stations, setStations] = useState(ROUTES[currentRouteId].stations);

    // Initialize Active Station
    const [activeStationId, setActiveStationId] = useState(() => {
        return ROUTES[currentRouteId].stations[0].id;
    });

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Derive active station object and index
    const activeStationIndex = stations.findIndex(s => s.id === activeStationId);
    const activeStation = stations[activeStationIndex] || stations[0];
    const isLastStation = activeStationIndex === stations.length - 1;

    const currentRoute = ROUTES[currentRouteId];

    const handleStationClick = (station) => {
        // 1. Interchange Logic
        if (station.type === StationType.INTERCHANGE && station.connectedRoutes && station.connectedRoutes.length > 1) {

            // If we are already at this station (Active), then click implies "Switch Route"
            if (activeStationId === station.id) {
                // Find current route index
                const currentRouteIndex = station.connectedRoutes.findIndex(r => r.routeId === currentRouteId);

                if (currentRouteIndex !== -1) {
                    // Cycle to next route
                    const nextRouteIndex = (currentRouteIndex + 1) % station.connectedRoutes.length;
                    const nextRouteConfig = station.connectedRoutes[nextRouteIndex];

                    console.log(`Switching to route: ${nextRouteConfig.routeId}`);

                    // Execute Switch
                    setCurrentRouteId(nextRouteConfig.routeId);
                    setStations(ROUTES[nextRouteConfig.routeId].stations);
                    setActiveStationId(nextRouteConfig.stationId);
                    return;
                }
            }
        }

        // 2. Normal Navigation
        setActiveStationId(station.id);
        setMobileMenuOpen(false);
    };

    const handleNextStation = () => {
        if (isLastStation) return;
        const nextStation = stations[activeStationIndex + 1];
        if (nextStation) {
            setActiveStationId(nextStation.id);
        }
    };

    const handleNavigate = (link) => {
        if (link) {
            navigate(link);
        }
    };

    return (
        <div className={styles.appContainer}>
            {/* Mobile Header */}
            <div className={styles.mobileHeader}>
                <h1 className={styles.mobileTitle}>MetroLearn: {currentRoute.name}</h1>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={styles.menuBtn}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <main className={styles.mainLayout}>
                {/* Left Sidebar: Metro Map */}
                <aside
                    className={`${styles.sidebar} ${styles.scroll} ${mobileMenuOpen ? styles.open : ''}`}
                >
                    <div className={styles.sidebarHeader}>
                        <h1
                            className={styles.routeTitle}
                            style={{ color: currentRoute.color }}
                        >
                            {currentRoute.name}
                        </h1>
                    </div>

                    <MetroMap
                        stations={stations}
                        currentRouteName={currentRoute.name}
                        currentRouteColor={currentRoute.color}
                        currentRouteId={currentRouteId}
                        activeStationId={activeStationId}
                        onStationClick={handleStationClick}
                    />
                </aside>

                {/* Right Content Area */}
                <section className={styles.contentArea}>
                    {/* Background Decorative Pattern */}
                    <div className={styles.bgPattern}></div>

                    <div className={styles.contentWrapper}>
                        <ContentPanel
                            station={activeStation}
                            isLastStation={isLastStation}
                            onNext={handleNextStation}
                            onNavigate={handleNavigate}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Page;