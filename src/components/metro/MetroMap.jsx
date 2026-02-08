import React from 'react';
import StationNode from './StationNode';
import styles from './Metro.module.scss';

const MetroMap = ({
    stations,
    currentRouteName,
    currentRouteColor,
    currentRouteId,
    activeStationId,
    onStationClick
}) => {
    return (
        <div className={styles.mapContainer}>
            <div className={styles.stationsList}>
                {/* Visual Line Background */}
                <div
                    className={styles.routeLineBg}
                    style={{ backgroundColor: currentRouteColor }}
                />

                {stations.map((station, index) => {
                    const isActive = station.id === activeStationId;
                    const isLast = index === stations.length - 1;

                    return (
                        <StationNode
                            key={station.id}
                            station={station}
                            currentColor={currentRouteColor}
                            currentRouteId={currentRouteId}
                            isActive={isActive}
                            isLast={isLast}
                            onClick={onStationClick}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default MetroMap;
