import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import MetroMap from '@/components/metro/MetroMap';
import ContentPanel from '@/components/metro/ContentPanel';
import '@/components/metro/styles.css';

import { ANDROID_ROUTE } from './data';

function Page() {
    const navigate = useNavigate();

    // State
    const [stations, setStations] = useState(ANDROID_ROUTE.stations);
    // Initialize Active Station (Default to first one)
    const [activeStationId, setActiveStationId] = useState(stations[0].id);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Derive active station object and index
    const activeStationIndex = stations.findIndex(s => s.id === activeStationId);
    const activeStation = stations[activeStationIndex] || stations[0];
    const isLastStation = activeStationIndex === stations.length - 1;

    const handleStationClick = (station) => {
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
        <div className="metro-app-container">
            {/* Mobile Header */}
            <div className="metro-mobile-header">
                <h1 className="metro-mobile-title">MetroLearn: Android</h1>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="metro-menu-btn"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <main className="metro-main-layout">
                {/* Left Sidebar: Metro Map */}
                <aside
                    className={`metro-sidebar metro-scroll ${mobileMenuOpen ? 'open' : ''}`}
                >
                    <div className="metro-sidebar-header">
                        <h1
                            className="metro-route-title"
                            style={{ color: ANDROID_ROUTE.color }}
                        >
                            {ANDROID_ROUTE.name}
                        </h1>
                    </div>

                    <MetroMap
                        stations={stations}
                        currentRouteName={ANDROID_ROUTE.name}
                        currentRouteColor={ANDROID_ROUTE.color}
                        currentRouteId={ANDROID_ROUTE.id}
                        activeStationId={activeStationId}
                        onStationClick={handleStationClick}
                    />
                </aside>

                {/* Right Content Area */}
                <section className="metro-content-area">
                    {/* Background Decorative Pattern */}
                    <div className="metro-bg-pattern"></div>

                    <div className="metro-content-wrapper">
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