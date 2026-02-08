import React from 'react';
import StationNode from './StationNode';
import './styles.css';

const MetroMap = ({
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
            <div className="metro-stations-list">

                {/* Continuous Route Line (Background) */}
                {/* 
            Positioned absolutely to run through the center of the station nodes.
        */}
                <div
                    className="metro-route-line-bg"
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
