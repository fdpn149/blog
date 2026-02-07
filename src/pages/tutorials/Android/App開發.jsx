import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MetroMap from '@/components/metro/MetroMap';
import ContentPanel from '@/components/metro/ContentPanel';
import { ROUTES, ANDROID_ROUTE, StationType } from './metro-data';
import { Menu, X } from 'lucide-react';
import Header from "@/components/header/Header";
import { useTheme } from "@/hooks/useTheme";

/* 
  Replicates the layout associated with the "Metro Style" 
  from the local metrolearn project.
*/

function Page() {
    // Theme Hook
    const theme = useTheme();

    // Current Route Data (Single Route for this page: Android Line)
    // URL Integration
    const location = useLocation();
    const navigate = useNavigate();

    // Helper to find station by path
    const findStationByPath = (path, routeIdToCheck) => {
        const decodedPath = decodeURIComponent(path);

        // 1. Try to find in CURRENT route first (to avoid ambiguity with interchange stations sharing same path)
        if (routeIdToCheck && ROUTES[routeIdToCheck]) {
            const currentRouteStations = ROUTES[routeIdToCheck].stations;
            for (const station of currentRouteStations) {
                if (station.component.props && station.component.props.props && station.component.props.props.path === decodedPath) {
                    return { routeId: routeIdToCheck, stationId: station.id };
                }
            }
        }

        // 2. Search in all routes if not found in current
        const allRoutes = Object.values(ROUTES);
        for (const route of allRoutes) {
            // Skip current route as we already checked it
            if (routeIdToCheck && route.id === routeIdToCheck) continue;

            for (const station of route.stations) {
                if (station.component.props && station.component.props.props && station.component.props.props.path === decodedPath) {
                    return { routeId: route.id, stationId: station.id };
                }
            }
        }
        return null;
    };

    // Initialize State based on URL
    // Pass null as currentRouteId is not yet initialized
    const msg = findStationByPath(location.pathname, null);
    const initialRouteId = msg ? msg.routeId : ANDROID_ROUTE.id;
    const initialStationId = msg ? msg.stationId : ANDROID_ROUTE.stations[0].id;

    // Current Route Data (Single Route for this page: Android Line)
    // State for the Current Line (Route)
    const [currentRouteId, setCurrentRouteId] = useState(initialRouteId);

    const currentRoute = ROUTES[currentRouteId];

    // Initialize Stations based on current route
    // Note: When route changes, we need to update stations
    const [stations, setStations] = useState(currentRoute.stations);

    // activeStationId state
    const [activeStationId, setActiveStationId] = useState(initialStationId);

    // Effect to sync URL change (e.g. back button) to State
    useEffect(() => {
        // Pass currentRouteId to resolve ambiguity based on current context
        const found = findStationByPath(location.pathname, currentRouteId);
        if (found) {
            if (found.routeId !== currentRouteId) {
                setCurrentRouteId(found.routeId);
                setStations(ROUTES[found.routeId].stations);
            }
            if (found.stationId !== activeStationId) {
                setActiveStationId(found.stationId);
            }
        }
    }, [location.pathname, currentRouteId]);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Derived State
    const activeStationIndex = stations.findIndex(s => s.id === activeStationId);
    const activeStation = stations[activeStationIndex] || stations[0];
    const isLastStation = activeStationIndex === stations.length - 1;

    // Handlers
    const handleStationClick = (station) => {
        // 1. Interchange Logic (Multi-Route Cycle)
        if (station.type === StationType.INTERCHANGE && station.connectedRoutes && station.connectedRoutes.length > 1) {

            // Check if we are already at this station (Active)
            if (activeStationId === station.id) {

                // Find current route index in the connection list
                const currentRouteIndex = station.connectedRoutes.findIndex(r => r.routeId === currentRouteId);

                if (currentRouteIndex !== -1) {
                    // Calculate Next Route (Cycle: +1 % length)
                    const nextRouteIndex = (currentRouteIndex + 1) % station.connectedRoutes.length;
                    const nextRouteConfig = station.connectedRoutes[nextRouteIndex];

                    console.log(`Cycling Route: From ${currentRouteId} to ${nextRouteConfig.routeId}`);

                    // Execute Switch
                    setCurrentRouteId(nextRouteConfig.routeId);
                    setStations(ROUTES[nextRouteConfig.routeId].stations);

                    // Set active station to the ID mapped on the NEW route
                    setActiveStationId(nextRouteConfig.stationId);

                    // Update URL!
                    const targetStation = ROUTES[nextRouteConfig.routeId].stations.find(s => s.id === nextRouteConfig.stationId);
                    if (targetStation && targetStation.component.props && targetStation.component.props.props && targetStation.component.props.props.path) {
                        navigate(targetStation.component.props.props.path);
                    }

                    return;
                }
            }
            // If not active yet, fall through to Normal Navigation (just select it)
        }

        // 2. Normal Navigation: Select the station
        setActiveStationId(station.id);
        setMobileMenuOpen(false);

        // Update URL
        if (station.component.props && station.component.props.props && station.component.props.props.path) {
            navigate(station.component.props.props.path);
        }
    };

    const handleNextStation = () => {
        if (isLastStation) return;
        const nextStation = stations[activeStationIndex + 1];
        if (nextStation) {
            setActiveStationId(nextStation.id);
            // Update URL
            if (nextStation.component.props && nextStation.component.props.props && nextStation.component.props.props.path) {
                navigate(nextStation.component.props.props.path);
            }
        }
    };

    return (
        // Apply 'dark' class if theme is dark
        <div className={`flex flex-col h-screen overflow-hidden font-sans ${theme === 'dark' ? 'dark' : ''} bg-slate-50 dark:bg-slate-950 transition-colors duration-300`}>
            <Header />
            {/* Mobile Header (Only visible on mobile, distinct from global header) */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 z-50">
                <h1 className={`font-bold text-lg text-slate-800 dark:text-slate-100 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
                    {currentRoute.name}
                </h1>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md cursor-pointer"
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            <main className="flex flex-1 overflow-hidden relative">
                {/* Left Sidebar: Metro Map */}
                <aside
                    className={`
            absolute md:relative z-40 
            w-full md:w-[320px] md:flex-none
            bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto metro-scroll
            transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
                >
                    <div className="sticky top-0 bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-sm z-10 p-6 border-b border-gray-100 dark:border-gray-800 shadow-sm">
                        <h1
                            className="text-3xl font-black tracking-tighter leading-none uppercase break-words"
                            style={{ color: currentRoute.color }}
                        >
                            {currentRoute.name}
                        </h1>
                    </div>

                    <MetroMap
                        stations={stations}
                        currentRouteColor={currentRoute.color}
                        currentRouteId={currentRouteId}
                        activeStationId={activeStationId}
                        onStationClick={handleStationClick}
                    />
                </aside>

                {/* Right Content Area */}
                <section className="flex-1 h-full min-w-0 p-0 overflow-hidden relative bg-slate-50 dark:bg-slate-950">
                    {/* Background Decorative Pattern */}
                    <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                            color: theme === 'dark' ? '#94a3b8' : '#475569'
                        }}>
                    </div>

                    <div className="relative z-10 h-full w-full">
                        <ContentPanel
                            station={activeStation}
                            isLastStation={isLastStation}
                            onNext={handleNextStation}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Page;