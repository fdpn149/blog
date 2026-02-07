import React from 'react';
import StationNode from './StationNode';

const MetroMap = ({
    stations,
    currentRouteColor,
    currentRouteId,
    activeStationId,
    onStationClick
}) => {

    return (
        <div className="relative flex flex-col py-8 pl-1 md:pl-2 select-none">

            {/* Stations List Container */}
            <div className="relative flex flex-col">

                {/* Continuous Route Line (Background) */}
                {/* 
            Positioned absolutely to run through the center of the station nodes.
            top-7 (1.75rem) and bottom-7 (1.75rem) align with the vertical center 
            of the first and last stations (based on min-height and padding), 
            ensuring the line appears to start/stop exactly at the dots.
        */}
                <div
                    className="absolute left-8 top-7 bottom-7 w-3.5 -translate-x-1/2 z-0 rounded-full opacity-100"
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
