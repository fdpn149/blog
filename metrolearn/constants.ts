import { Route, StationType } from './types';

// Vibrant "Metro" Palette - Updated for Test Scenario
export const THEME_COLORS = {
  blue: '#0072CE',   // Tube Blue
  red: '#E32017',    // Tube Red
  green: '#2ECC71',  // Tube Green (Updated to requested test hex)
  purple: '#9B59B6', // Tube Purple (Updated to requested test hex)
  slate: '#64748b',
  grey: '#E6E6E6',   // Inactive track color
};

// Shared Connection Data: Used by all routes to ensure the Hub links to everyone
const HUB_CONNECTIONS = [
  { routeId: 'route-blue', stationId: 'hub_blue', color: THEME_COLORS.blue },
  { routeId: 'route-red', stationId: 'hub_red', color: THEME_COLORS.red },
  { routeId: 'route-green', stationId: 'hub_green', color: THEME_COLORS.green },
  { routeId: 'route-purple', stationId: 'hub_purple', color: THEME_COLORS.purple }
];

// Route 1: The Blue Line
const BLUE_ROUTE: Route = {
  id: 'route-blue',
  name: 'LOGIC & BASIC STRUCTURES',
  description: '',
  color: THEME_COLORS.blue,
  stations: [
    {
      id: 'blue_1',
      title: 'WELCOME ABOARD',
      description: 'Introduction to the course format and expectations.',
      type: StationType.TERMINUS,
      moduleId: 'module-1'
    },
    {
      id: 'blue_2',
      title: 'LOGIC GATES',
      description: 'Understanding boolean logic and basic gates.',
      type: StationType.NORMAL,
      moduleId: 'module-1'
    },
    {
      id: 'hub_blue',
      title: 'DATA STRUCTURES HUB',
      description: 'Major Interchange: Switch between Blue, Red, Green, and Purple lines.',
      type: StationType.INTERCHANGE,
      moduleId: 'module-1',
      connectedRoutes: HUB_CONNECTIONS
    },
    {
      id: 'blue_4',
      title: 'ADVANCED BOOLEAN',
      description: 'Complex logic expressions and simplification.',
      type: StationType.NORMAL,
      moduleId: 'module-1'
    }
  ]
};

// Route 2: The Red Line
const RED_ROUTE: Route = {
  id: 'route-red',
  name: 'ALGORITHMS & COMPLEXITY',
  description: '',
  color: THEME_COLORS.red,
  stations: [
    {
      id: 'red_1', 
      title: 'BINARY BASICS',
      description: 'Pre-requisite math for algorithms.',
      type: StationType.NORMAL,
      moduleId: 'module-2'
    },
    {
      id: 'hub_red', 
      title: 'DATA STRUCTURES HUB',
      description: 'Major Interchange: Switch between Blue, Red, Green, and Purple lines.',
      type: StationType.INTERCHANGE,
      moduleId: 'module-2',
      connectedRoutes: HUB_CONNECTIONS
    },
    {
      id: 'red_3',
      title: 'ALGORITHM AVENUE',
      description: 'Sorting and searching algorithms explained.',
      type: StationType.NORMAL,
      moduleId: 'module-2'
    },
    {
      id: 'red_4',
      title: 'RECURSION LOOP',
      description: 'Understanding self-referential functions.',
      type: StationType.NORMAL,
      moduleId: 'module-2'
    }
  ]
};

// Route 3: The Green Line
const GREEN_ROUTE: Route = {
  id: 'route-green',
  name: 'DESIGN PATTERNS',
  description: '',
  color: THEME_COLORS.green,
  stations: [
    {
      id: 'green_1',
      title: 'SINGLETON STATION',
      description: 'Introduction to creational patterns.',
      type: StationType.NORMAL,
      moduleId: 'module-3'
    },
    {
      id: 'hub_green',
      title: 'DATA STRUCTURES HUB',
      description: 'Major Interchange: Switch between Blue, Red, Green, and Purple lines.',
      type: StationType.INTERCHANGE,
      moduleId: 'module-3',
      connectedRoutes: HUB_CONNECTIONS
    },
    {
      id: 'green_3',
      title: 'OBSERVER OUTPOST',
      description: 'Handling events and subscriptions.',
      type: StationType.TERMINUS,
      moduleId: 'module-3'
    }
  ]
};

// Route 4: The Purple Line
const PURPLE_ROUTE: Route = {
  id: 'route-purple',
  name: 'DEVOPS & DEPLOYMENT',
  description: '',
  color: THEME_COLORS.purple,
  stations: [
    {
      id: 'hub_purple',
      title: 'DATA STRUCTURES HUB',
      description: 'Major Interchange: Switch between Blue, Red, Green, and Purple lines.',
      type: StationType.INTERCHANGE,
      moduleId: 'module-4',
      connectedRoutes: HUB_CONNECTIONS
    },
    {
      id: 'purple_2',
      title: 'DOCKER DOCK',
      description: 'Containerization basics.',
      type: StationType.TERMINUS,
      moduleId: 'module-4'
    }
  ]
};

export const ROUTES: Record<string, Route> = {
  'route-blue': BLUE_ROUTE,
  'route-red': RED_ROUTE,
  'route-green': GREEN_ROUTE,
  'route-purple': PURPLE_ROUTE
};

export const INITIAL_ROUTE_ID = 'route-blue';