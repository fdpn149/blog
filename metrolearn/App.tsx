import React, { useState } from 'react';
import MetroMap from './components/MetroMap';
import ContentPanel from './components/ContentPanel';
import { ROUTES, INITIAL_ROUTE_ID } from './constants';
import { Station, StationType } from './types';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  // State for the Current Line (Route)
  const [currentRouteId, setCurrentRouteId] = useState<string>(INITIAL_ROUTE_ID);
  
  // Get current route data
  const currentRoute = ROUTES[currentRouteId];
  
  // Initialize stations with the initial route
  const [stations, setStations] = useState<Station[]>(currentRoute.stations);

  // Initialize Active Station (Default to first one)
  const [activeStationId, setActiveStationId] = useState<string>(() => {
    return currentRoute.stations[0].id;
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Derive active station object and index
  const activeStationIndex = stations.findIndex(s => s.id === activeStationId);
  const activeStation = stations[activeStationIndex] || stations[0];
  const isLastStation = activeStationIndex === stations.length - 1;

  const handleStationClick = (station: Station) => {
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
          return;
        }
      }
      // If not active yet, fall through to Normal Navigation (just select it)
    }

    // 2. Normal Navigation: Select the station
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

  return (
    <div className="app-container">
      {/* Mobile Header */}
      <div className="mobile-header">
        <h1 className="mobile-title">MetroLearn</h1>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="menu-btn"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <main className="main-layout">
        {/* Left Sidebar: Metro Map */}
        <aside 
          className={`sidebar metro-scroll ${mobileMenuOpen ? 'open' : ''}`}
        >
          <div className="sidebar-header">
            <h1 
              className="route-title"
              style={{ color: currentRoute.color }}
            >
              {currentRoute.name}
            </h1>
          </div>
          
          <MetroMap 
            stations={stations} 
            currentRouteName={currentRoute.name}
            currentRouteColor={currentRoute.color}
            currentRouteId={currentRouteId} // Passed to children for logic
            activeStationId={activeStationId} 
            onStationClick={handleStationClick} 
          />
        </aside>

        {/* Right Content Area */}
        <section className="content-area">
           {/* Background Decorative Pattern */}
           <div className="bg-pattern"></div>
           
           <div className="content-wrapper">
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
};

export default App;