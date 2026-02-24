import { StationType } from "@/components/metro/StationNode";

export const ANDROID_COLOR = '#3DDC84'; // Green
export const INPUT_COLOR = '#8e44ad';   // Purple
const CONNECTIONS = [
    { routeId: 'route-android', stationId: 'android_input', color: ANDROID_COLOR },
    { routeId: 'route-input', stationId: 'input_hub', color: INPUT_COLOR }
];

export const ANDROID_ROUTE = {
    id: 'route-android',
    name: 'Android App 開發',
    description: '從基礎到進階的 Android 開發與設計模式',
    color: ANDROID_COLOR,
    stations: [
        {
            id: 'android_start',
            title: '開發入門HUB',
            description: '歡迎來到 Android 開發課程中心，請選擇下方站點開始學習。',
            type: StationType.TERMINUS,
            moduleId: 'module-android',
        },
        {
            id: 'android_theme',
            title: '主題顏色',
            description: '設定與管理 App 的主題色彩系統。',
            type: StationType.NORMAL,
            moduleId: 'module-android',
            link: '/tutorials/AndroidApp開發/主題顏色'
        },
        {
            id: 'android_custom',
            title: '客製化元件',
            description: '學習如何打造獨特的 UI 元件。',
            type: StationType.NORMAL,
            moduleId: 'module-android',
            link: '/tutorials/AndroidApp開發/客製化元件'
        },
        {
            id: 'android_binding',
            title: '資料單向綁定',
            description: '理解資料流向與狀態管理。',
            type: StationType.NORMAL,
            moduleId: 'module-android',
            link: '/tutorials/AndroidApp開發/資料單向綁定'
        },
        {
            id: 'android_input',
            title: '輸入法',
            description: '實作一個屬於自己的 Android 輸入法。',
            type: StationType.INTERCHANGE,
            moduleId: 'module-android',
            link: '/tutorials/AndroidApp開發/輸入法',
            connectedRoutes: CONNECTIONS
        }
    ]
};

export const INPUT_ROUTE = {
    id: 'route-input',
    name: '輸入法與鍵盤',
    description: '深入探討 Android 輸入法框架 (IMF) 與軟鍵盤控制',
    color: INPUT_COLOR,
    stations: [
        {
            id: 'input_hub',
            title: '輸入法簡介',
            description: '輸入法框架簡介與實作準備。',
            type: StationType.INTERCHANGE,
            moduleId: 'module-input',
            link: '/tutorials/AndroidApp開發/輸入法',
            connectedRoutes: CONNECTIONS
        },
        {
            id: 'input_prerequisite',
            title: '前置作業',
            description: '設定環境與理解基本概念。',
            type: StationType.TERMINUS,
            moduleId: 'module-input',
            link: '/tutorials/AndroidApp開發/輸入法/前置作業'
        }
    ]
};


export const ROUTES = {
    'route-android': ANDROID_ROUTE,
    'route-input': INPUT_ROUTE
};
