import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import MetroMap from '@/components/metro/MetroMap';
import ContentPanel from '@/components/metro/ContentPanel';
import styles from '@/components/metro/Metro.module.scss';

import { ROUTES, ANDROID_ROUTE } from './data';
import { StationType } from '@/components/metro/StationNode';

function Page() {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper: Determine initial route based on URL
    const getInitialRouteId = () => {
        const pathname = decodeURIComponent(location.pathname);
        if (pathname === '/tutorials/Android/App開發/輸入法') {
            return 'route-input'; // Default to Purple for this shared URL
        }

        // Find any matching route
        for (const [routeId, routeData] of Object.entries(ROUTES)) {
            if (routeData.stations.some(s => s.link === pathname)) {
                return routeId;
            }
        }
        return ANDROID_ROUTE.id; // Default Green
    };

    // State for Config
    const [currentRouteId, setCurrentRouteId] = useState(getInitialRouteId);

    // State for Stations (derived from route)
    const [stations, setStations] = useState(ROUTES[currentRouteId].stations);

    // Initialize Active Station
    const [activeStationId, setActiveStationId] = useState(() => {
        const pathname = decodeURIComponent(location.pathname);
        // Try to find station in the determined currentRouteId
        const found = ROUTES[currentRouteId].stations.find(s => s.link === pathname);
        return found ? found.id : ROUTES[currentRouteId].stations[0].id;
    });

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Derive active station object and index
    const activeStationIndex = stations.findIndex(s => s.id === activeStationId);
    const activeStation = stations[activeStationIndex] || stations[0];
    const isLastStation = activeStationIndex === stations.length - 1;

    const currentRoute = ROUTES[currentRouteId];

    // Sync State with URL
    React.useEffect(() => {
        const pathname = decodeURIComponent(location.pathname);
        let foundStation = null;
        let foundRouteId = null;

        // Search for station matching the current path
        const candidates = [];
        for (const [routeId, routeData] of Object.entries(ROUTES)) {
            const station = routeData.stations.find(s => s.link === pathname);
            if (station) {
                candidates.push({ routeId, station });
            }
        }

        if (candidates.length > 0) {
            // Priority 1: Match current route (Context Preservation)
            // If the URL matches a station in the CURRENT route, we assume the user intends to stay here
            // unless they explicitly switched (which is handled by handleStationClick setting state).
            const currentRouteMatch = candidates.find(c => c.routeId === currentRouteId);

            if (currentRouteMatch) {
                foundStation = currentRouteMatch.station;
                foundRouteId = currentRouteMatch.routeId;
            } else {
                // Priority 2: New Context (e.g. Back button or external link to different route)
                // If the URL does NOT match current route, we must switch.

                // Special Case for Input Method shared URL if we were NOT on a valid path
                if (pathname === '/tutorials/Android/App開發/輸入法') {
                    foundRouteId = 'route-input';
                    foundStation = ROUTES['route-input'].stations.find(s => s.link === pathname);
                } else {
                    foundStation = candidates[0].station;
                    foundRouteId = candidates[0].routeId;
                }
            }
        }

        // If found, update state
        if (foundStation && foundRouteId) {
            // Only update if actually different to prevent loops or overriding manual switch
            if (currentRouteId !== foundRouteId) {
                setCurrentRouteId(foundRouteId);
                setStations(ROUTES[foundRouteId].stations);
            }
            if (activeStationId !== foundStation.id) {
                setActiveStationId(foundStation.id);
            }
        }
    }, [location.pathname, currentRouteId]);

    const handleStationClick = (station) => {
        // 1. Interchange Logic
        if (station.type === StationType.INTERCHANGE && station.connectedRoutes && station.connectedRoutes.length > 1) {

            // Logic: 
            // - If currently at this station ID (Active), then click implies "Switch Route".
            // - BUT, we must ensure we are viewing the station in the context of the CURRENT route.
            // - If we are at the transfer station, but maybe the URL sync just put us there, 
            //   the user might be clicking to *confirm* or *see* the content (Selection).
            // - The user wants: "Click 1 = Select (Show Content), Click 2 = Switch Route".

            // Check if we are already active at this station AND the visual selection is settled.
            if (activeStationId === station.id) {
                // Find current route index in the connected list
                const currentRouteIndex = station.connectedRoutes.findIndex(r => r.routeId === currentRouteId);

                if (currentRouteIndex !== -1) {
                    // Cycle to next route
                    const nextRouteIndex = (currentRouteIndex + 1) % station.connectedRoutes.length;
                    const nextRouteConfig = station.connectedRoutes[nextRouteIndex];

                    console.log(`Switching to route: ${nextRouteConfig.routeId}`);

                    // Execute Switch
                    setCurrentRouteId(nextRouteConfig.routeId);
                    setStations(ROUTES[nextRouteConfig.routeId].stations);
                    // Critical: Update active station ID to the one defined in the connection config 
                    // (usually the same ID, but good to be explicit for the new route's context)
                    setActiveStationId(nextRouteConfig.stationId);

                    // Note: We do NOT reset URL here anymore, we let the URL stay as is (shared link) 
                    // or let the user click again. 
                    // Updating state triggers re-render, showing new route color/title.
                    return;
                }
            }
        }

        // 2. Normal Navigation & URL Update
        // Always set active first (Click 1 behavior)
        setActiveStationId(station.id);

        if (station.link) {
            navigate(station.link);
        } else {
            // If no link (e.g. some hubs if they didn't have one), reset to base? 
            // Actually, for consistency, maybe we shouldn't reset if we want to stay "in context".
            // But previous requirement was to reset. Let's keep it safe.
            navigate('/tutorials/Android/App開發');
        }

        setMobileMenuOpen(false);
    };

    const handleNextStation = () => {
        if (isLastStation) return;
        const nextStation = stations[activeStationIndex + 1];
        if (nextStation) {
            handleStationClick(nextStation);
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