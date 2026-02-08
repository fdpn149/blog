import React from 'react';
import { Station, StationType } from '../types';

interface StationNodeProps {
  station: Station;
  currentColor: string; // The color of the current active line
  currentRouteId: string; // Need ID to calculate gradient segments
  isActive: boolean;    // Is this the currently selected station?
  isLast: boolean;
  onClick: (station: Station) => void;
}

const StationNode: React.FC<StationNodeProps> = ({ 
  station, 
  currentColor,
  currentRouteId,
  isActive,
  isLast, 
  onClick 
}) => {
  const { type, title, connectedRoutes } = station;
  
  const isInterchange = type === StationType.INTERCHANGE;

  // CSS Class for dimensions
  const nodeClass = isInterchange ? 'node-large' : 'node-normal';
  const labelClass = isInterchange ? 'label-large' : 'label-small';
  
  // DYNAMIC GRADIENT LOGIC
  const getStationGradient = (): string => {
    // If not interchange or no connections, use default logic later
    if (!connectedRoutes || connectedRoutes.length < 2) return '';

    const total = connectedRoutes.length;
    
    // 1. Find the index of the current active route
    const currentIndex = connectedRoutes.findIndex(r => r.routeId === currentRouteId);
    
    // Safety check
    if (currentIndex === -1) return ''; 

    const currentRoute = connectedRoutes[currentIndex];
    let gradientParts: string[] = [];
    
    // 2. Calculate the Right Hemisphere (0deg to 180deg)
    // We need to fit (N-1) routes into 180 degrees.
    const step = 180 / (total - 1);

    // Loop through the "Next" routes visually
    for (let j = 1; j < total; j++) {
      // Use Modulo (%) to cycle through the array safely
      const targetIndex = (currentIndex + j) % total;
      const targetRoute = connectedRoutes[targetIndex];

      const startAngle = (j - 1) * step;
      const endAngle = j * step;

      // Construct: "Color StartDeg EndDeg"
      gradientParts.push(`${targetRoute.color} ${startAngle}deg ${endAngle}deg`);
    }

    // 3. Add the Left Hemisphere (180deg to 360deg) - Always Current Color
    gradientParts.push(`${currentRoute.color} 180deg 360deg`);

    return `conic-gradient(${gradientParts.join(', ')})`;
  };

  const gradientBg = isInterchange ? getStationGradient() : '';

  // BORDER / BACKGROUND LOGIC
  let containerStyle: React.CSSProperties = {};
  
  if (isInterchange && gradientBg) {
    containerStyle = {
      background: gradientBg,
      padding: '6px' // Simulates the border thickness/ring
    };
  } else {
    // Normal Station Logic: Solid Border
    containerStyle = {
      borderColor: currentColor,
      borderWidth: '5px',
      borderStyle: 'solid',
      backgroundColor: 'white'
    };
  }

  return (
    <div className="station-node">
      
      {/* Left Column: The Track & Node */}
      <div className="node-track-col">
        
        {/* The Station Node (Circle) */}
        <button
          onClick={() => onClick(station)}
          className={`node-button ${nodeClass} ${isActive && !isInterchange ? 'active-scale' : ''}`}
          style={containerStyle}
          aria-label={`Select station: ${title}`}
        >
          {/* Inner Circle (White Background) acting as Mask */}
          <div className="node-inner">
             
             {/* ACTIVE STATE DOT */}
             {isActive && (
                <div 
                  className="active-dot"
                  style={{ backgroundColor: currentColor }} 
                />
             )}
          </div>
        </button>

      </div>

      {/* Right Column: Station Name */}
      <div className="node-label-col">
        <div className="node-label-wrapper">
          <h3 
            className={`node-label ${labelClass} ${isActive ? 'active' : 'inactive'}`}
          >
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default StationNode;