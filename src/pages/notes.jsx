import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainLayout, MetroMap, ContentPanel } from '@/components';
import styles from '@/components/layout/MainLayout.module.scss';
import metroStyles from '@/components/metro/Metro.module.scss';

import { ROUTES, NOTES_ROUTE } from './notes/data';
import { StationType } from '@/components/metro/StationNode';

function Page() {
    const navigate = useNavigate();
    const location = useLocation();

    const getInitialRouteId = () => {
        const pathname = decodeURIComponent(location.pathname);
        for (const [routeId, routeData] of Object.entries(ROUTES)) {
            if (routeData.stations.some(s => s.link === pathname)) {
                return routeId;
            }
        }
        return NOTES_ROUTE.id;
    };

    const [currentRouteId, setCurrentRouteId] = useState(getInitialRouteId);
    const [stations, setStations] = useState(ROUTES[currentRouteId].stations);
    const [activeStationId, setActiveStationId] = useState(() => {
        const pathname = decodeURIComponent(location.pathname);
        const found = ROUTES[currentRouteId].stations.find(s => s.link === pathname);
        return found ? found.id : ROUTES[currentRouteId].stations[0].id;
    });

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const activeStationIndex = stations.findIndex(s => s.id === activeStationId);
    const activeStation = stations[activeStationIndex] || stations[0];
    const isLastStation = activeStationIndex === stations.length - 1;

    const currentRoute = ROUTES[currentRouteId];

    React.useEffect(() => {
        const pathname = decodeURIComponent(location.pathname);
        let foundStation = null;
        let foundRouteId = null;

        const candidates = [];
        for (const [routeId, routeData] of Object.entries(ROUTES)) {
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
                foundStation = candidates[0].station;
                foundRouteId = candidates[0].routeId;
            }
        }

        if (foundStation && foundRouteId) {
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
        if (station.type === StationType.INTERCHANGE && station.connectedRoutes && station.connectedRoutes.length > 1) {
            if (activeStationId === station.id) {
                const currentRouteIndex = station.connectedRoutes.findIndex(r => r.routeId === currentRouteId);
                if (currentRouteIndex !== -1) {
                    const nextRouteIndex = (currentRouteIndex + 1) % station.connectedRoutes.length;
                    const nextRouteConfig = station.connectedRoutes[nextRouteIndex];
                    setCurrentRouteId(nextRouteConfig.routeId);
                    setStations(ROUTES[nextRouteConfig.routeId].stations);
                    setActiveStationId(nextRouteConfig.stationId);
                    return;
                }
            }
        }

        setActiveStationId(station.id);

        if (station.link) {
            navigate(station.link);
        } else {
            navigate('/notes');
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
                <div>
                    <h1 className={styles.brandTitle}>波峰小棧</h1>
                    <p className={styles.brandSubtitle}>Metro Learning Station</p>
                </div>
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
}

export default Page;
