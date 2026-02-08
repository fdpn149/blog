import React from 'react';
import { Station } from '../types';
import StationNode from './StationNode';

interface MetroMapProps {
  stations: Station[];
  currentRouteName: string;
  currentRouteColor: string;
  currentRouteId: string; // Added prop
  activeStationId: string;
  onStationClick: (station: Station) => void;
}

const MetroMap: React.FC<MetroMapProps> = ({ 
  stations, 
  currentRouteName,
  currentRouteColor,
  currentRouteId,
  activeStationId, 
  onStationClick 
}) => {

  return (
    <div className="metro-map-container">
      
      {/* Stations List Container */}
      <div className="stations-list">
        
        {/* Continuous Route Line (Background) */}
        {/* 
            Positioned absolutely to run through the center of the station nodes.
        */}
        <div 
           className="route-line-bg"
           style={{ backgroundColor: currentRouteColor }}
        />

        {stations.map((station, index) => {
          return (
            <StationNode
              key={station.id}
              station={station}
              currentColor={currentRouteColor}
              currentRouteId={currentRouteId} // Pass ID
              isActive={station.id === activeStationId}
              isLast={index === stations.length - 1}
              onClick={onStationClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MetroMap;