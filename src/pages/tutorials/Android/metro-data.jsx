// Import the sub-page components
import DynamicRouter from '@/components/router/DynamicRouter';

export const THEME_COLORS = {
    blue: '#0072CE',   // Tube Blue
    red: '#E32017',
    green: '#2ECC71',
    purple: '#9B59B6',
};

// Station Types
export const StationType = {
    NORMAL: 'NORMAL',
    INTERCHANGE: 'INTERCHANGE',
    TERMINUS: 'TERMINUS'
};

// Shared Hub Connections (The definition of the interchange)
const INPUT_METHOD_INTERCHANGE = [
    { routeId: 'route-android', stationId: 'input_method', color: THEME_COLORS.green },
    { routeId: 'route-input-method', stationId: 'input_method_hub', color: THEME_COLORS.blue },
    { routeId: 'route-advanced', stationId: 'input_method_adv', color: THEME_COLORS.red }
];

// Route Data for "App開發" (Green Line)
export const ANDROID_ROUTE = {
    id: 'route-android',
    name: 'App開發',
    color: THEME_COLORS.green,
    stations: [
        {
            id: 'theme_color',
            title: '主題顏色',
            description: '設定 App 的主要色系與風格',
            type: StationType.NORMAL,
            component: <DynamicRouter props={{ path: '/tutorials/Android/App開發/主題顏色' }} />
        },
        {
            id: 'custom_component',
            title: '客製化元件',
            description: '建立可重複使用的 UI 元件',
            type: StationType.NORMAL,
            component: <DynamicRouter props={{ path: '/tutorials/Android/App開發/客製化元件' }} />
        },
        {
            id: 'one_way_binding',
            title: '資料單向綁定',
            description: '理解 React 中的資料流向',
            type: StationType.NORMAL,
            component: <DynamicRouter props={{ path: '/tutorials/Android/App開發/資料單向綁定' }} />
        },
        {
            id: 'input_method',
            title: '輸入法',
            description: '',
            type: StationType.INTERCHANGE, // Changed to INTERCHANGE
            component: <DynamicRouter props={{ path: '/tutorials/Android/App開發/輸入法' }} />,
            connectedRoutes: INPUT_METHOD_INTERCHANGE
        }
    ]
};

// Route Data for "輸入法" (Blue Line)
export const INPUT_METHOD_ROUTE = {
    id: 'route-input-method',
    name: '輸入法開發',
    color: THEME_COLORS.blue,
    stations: [
        {
            id: 'input_method_hub', // Corresponds to 'input_method' on Android line
            title: '輸入法',
            description: '',
            type: StationType.INTERCHANGE,
            component: <DynamicRouter props={{ path: '/tutorials/Android/App開發/輸入法' }} />,
            connectedRoutes: INPUT_METHOD_INTERCHANGE
        },
        {
            id: 'preparation',
            title: '前置作業',
            description: '開發輸入法前的準備工作',
            type: StationType.TERMINUS,
            component: <DynamicRouter props={{ path: '/tutorials/Android/App開發/輸入法/前置作業' }} />
        }
    ]
};

// Route Data for "進階開發" (Red Line) - New 3rd Route
export const ADVANCED_ROUTE = {
    id: 'route-advanced',
    name: '進階開發',
    color: THEME_COLORS.red,
    stations: [
        {
            id: 'input_method_adv', // Corresponds to 'input_method' on Android line
            title: '輸入法',
            description: '',
            type: StationType.INTERCHANGE,
            component: <DynamicRouter props={{ path: '/tutorials/Android/App開發/輸入法' }} />,
            connectedRoutes: INPUT_METHOD_INTERCHANGE
        },
        {
            id: 'performance_tuning',
            title: '效能優化',
            description: '提升 App 執行效率',
            type: StationType.TERMINUS,
            component: <DynamicRouter props={{ path: '/tutorials/Android/進階開發/效能優化' }} />
        }
    ]
};

export const ROUTES = {
    'route-android': ANDROID_ROUTE,
    'route-input-method': INPUT_METHOD_ROUTE,
    'route-advanced': ADVANCED_ROUTE
};
