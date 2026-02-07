import React from 'react';

const StationType = {
    NORMAL: 'NORMAL',
    INTERCHANGE: 'INTERCHANGE',
    TERMINUS: 'TERMINUS'
};

const StationNode = ({
    station,
    currentColor,
    currentRouteId,
    isActive,
    onClick
}) => {
    const { type, title, connectedRoutes } = station;

    const isInterchange = type === StationType.INTERCHANGE;

    // Dimensions
    // Node size: Interchange larger than normal
    const nodeSize = isInterchange ? 'w-11 h-11' : 'w-8 h-8';

    // DYNAMIC GRADIENT LOGIC
    const getStationGradient = () => {
        // If not interchange or no connections, use default logic later
        if (!connectedRoutes || connectedRoutes.length < 2) return '';

        const total = connectedRoutes.length;

        // 1. Find the index of the current active route
        const currentIndex = connectedRoutes.findIndex(r => r.routeId === currentRouteId);

        // Safety check
        if (currentIndex === -1) return '';

        const currentRoute = connectedRoutes[currentIndex];
        let gradientParts = [];

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
    let containerStyle = {};

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
        };
    }

    return (
        <div className="relative flex flex-row group min-h-[3.5rem] py-3 opacity-100 z-10">

            {/* Left Column: The Track & Node */}
            {/* w-16 (4rem / 64px). Center is 32px. */}
            <div className="flex flex-col items-center justify-center w-16 shrink-0 relative">

                {/* The Station Node (Circle) */}
                <button
                    onClick={() => onClick(station)}
                    className={`
            relative z-10 rounded-full transition-transform duration-200
            flex items-center justify-center
            ${nodeSize}
            hover:scale-110 cursor-pointer
            ${isActive && !isInterchange ? 'scale-110' : ''} 
            ${!isInterchange ? 'bg-white dark:bg-[#1a1a1a] shadow-sm' : ''}
          `}
                    style={containerStyle}
                    aria-label={`Select station: ${title}`}
                >
                    {/* Inner Circle (White Background) acting as Mask */}
                    <div className="w-full h-full bg-white dark:bg-[#1a1a1a] rounded-full flex items-center justify-center relative overflow-hidden">

                        {/* ACTIVE STATE DOT */}
                        {isActive && (
                            <div
                                className="rounded-full shadow-sm w-1/2 h-1/2 transition-all duration-300"
                                style={{ backgroundColor: currentColor }}
                            />
                        )}
                    </div>
                </button>

            </div>

            {/* Right Column: Station Name */}
            <div className="flex flex-col justify-center pl-1 pr-2">
                <div className="flex items-center">
                    <h3
                        className={`
              font-sans tracking-tight uppercase leading-[1.1] transition-colors duration-300
              ${isActive ? 'text-black dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400 font-medium'}
              ${isInterchange ? 'text-base md:text-lg' : 'text-sm md:text-[15px]'} 
            `}
                    >
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default StationNode;
