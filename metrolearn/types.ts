
export enum StationType {
  NORMAL = 'NORMAL',
  INTERCHANGE = 'INTERCHANGE', // Represents major module switch
  TERMINUS = 'TERMINUS',
}

export interface ConnectedRoute {
  routeId: string;
  stationId: string;
  color: string;
}

export interface Station {
  id: string;
  title: string;
  description: string;
  type: StationType;
  moduleId: string;
  
  // Generic Route Switching (N-routes)
  connectedRoutes?: ConnectedRoute[];
}

export interface Route {
  id: string;
  name: string;
  description: string;
  color: string; // Main color of this route
  stations: Station[];
}

export interface GeminiResponse {
  text: string;
}
