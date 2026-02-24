import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from './MainLayout';
import MetroMap from '../metro/MetroMap';
import ContentPanel from '../metro/ContentPanel';
import styles from './MainLayout.module.scss';
import metroStyles from '../metro/Metro.module.scss';
import { StationType } from '../metro/StationNode';

const MetroRouteLayout = ({
    routes,
    defaultRouteId,
    basePath,
    onResolveConflict = null // (pathname, candidates) => { routeId, station }
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper: Determine initial route based on URL
    const getInitialRouteId = () => {
        const pathname = decodeURIComponent(location.pathname);

        // Let parent handle special cases
        if (onResolveConflict) {
            const candidates = [];
            for (const [routeId, routeData] of Object.entries(routes)) {
                const station = routeData.stations.find(s => s.link === pathname);
                if (station) {
                    candidates.push({ routeId, station });
                }
            }
            if (candidates.length > 0) {
                const resolved = onResolveConflict(pathname, candidates);
                if (resolved && resolved.routeId) {
                    return resolved.routeId;
                }
            }
        }

        // Find any matching route
        for (const [routeId, routeData] of Object.entries(routes)) {
            if (routeData.stations.some(s => s.link === pathname)) {
                return routeId;
            }
        }
        return defaultRouteId;
    };

    // State for Config
    const [currentRouteId, setCurrentRouteId] = useState(getInitialRouteId);

    // State for Stations (derived from route)
    const [stations, setStations] = useState(routes[currentRouteId].stations);

    // Initialize Active Station
    const [activeStationId, setActiveStationId] = useState(() => {
        const pathname = decodeURIComponent(location.pathname);
        const found = routes[currentRouteId].stations.find(s => s.link === pathname);
        return found ? found.id : routes[currentRouteId].stations[0].id;
    });

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Derive active station object and index
    const activeStationIndex = stations.findIndex(s => s.id === activeStationId);
    const activeStation = stations[activeStationIndex] || stations[0];
    const isLastStation = activeStationIndex === stations.length - 1;

    const currentRoute = routes[currentRouteId];

    // Sync State with URL
    useEffect(() => {
        const pathname = decodeURIComponent(location.pathname);
        let foundStation = null;
        let foundRouteId = null;

        // Search for station matching the current path
        const candidates = [];
        for (const [routeId, routeData] of Object.entries(routes)) {
            const station = routeData.stations.find(s => s.link === pathname);
            if (station) {
                candidates.push({ routeId, station });
            }
        }

        if (candidates.length > 0) {
            const currentRouteMatch = candidates.find(c => c.routeId === currentRouteId);

            if (currentRouteMatch) {
                foundStation = currentRouteMatch.station;
                foundRouteId = currentRouteMatch.routeId;
            } else {
                if (onResolveConflict) {
                    const resolved = onResolveConflict(pathname, candidates);
                    if (resolved) {
                        foundStation = resolved.station;
                        foundRouteId = resolved.routeId;
                    } else {
                        foundStation = candidates[0].station;
                        foundRouteId = candidates[0].routeId;
                    }
                } else {
                    foundStation = candidates[0].station;
                    foundRouteId = candidates[0].routeId;
                }
            }
        } else {
            foundRouteId = defaultRouteId;
            foundStation = routes[defaultRouteId].stations[0];
        }

        // If found, update state
        if (foundStation && foundRouteId) {
            if (currentRouteId !== foundRouteId) {
                setCurrentRouteId(foundRouteId);
                setStations(routes[foundRouteId].stations);
            }
            if (activeStationId !== foundStation.id) {
                setActiveStationId(foundStation.id);
            }
        }
    }, [location.pathname, currentRouteId, routes, onResolveConflict]);

    const handleStationClick = (station) => {
        // Interchange Logic
        if (station.type === StationType.INTERCHANGE && station.connectedRoutes && station.connectedRoutes.length > 1) {
            if (activeStationId === station.id) {
                const currentRouteIndex = station.connectedRoutes.findIndex(r => r.routeId === currentRouteId);

                if (currentRouteIndex !== -1) {
                    const nextRouteIndex = (currentRouteIndex + 1) % station.connectedRoutes.length;
                    const nextRouteConfig = station.connectedRoutes[nextRouteIndex];

                    setCurrentRouteId(nextRouteConfig.routeId);
                    setStations(routes[nextRouteConfig.routeId].stations);
                    setActiveStationId(nextRouteConfig.stationId);
                    return;
                }
            }
        }

        // Normal Navigation & URL Update
        setActiveStationId(station.id);

        if (station.link) {
            navigate(station.link);
        } else {
            navigate(basePath);
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

    const sidebarContent = (
        <>
            <div className={styles.sidebarHeader}>
                <a href="/" className={styles.brandLink}>
                    <h1 className={styles.brandTitle}>波峰小棧</h1>
                    <p className={styles.brandSubtitle}>Metro Learning Station</p>
                </a>
            </div>

            <div style={{ padding: '1.5rem 1.5rem 0 1.5rem' }}>
                <h1
                    className={metroStyles.routeTitle}
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
        </>
    );

    return (
        <MainLayout sidebar={sidebarContent}>
            <ContentPanel
                station={activeStation}
                isLastStation={isLastStation}
                onNext={handleNextStation}
                onNavigate={handleNavigate}
            />
        </MainLayout>
    );
};

export default MetroRouteLayout;
