import { StationType } from "@/components/metro/StationNode";

export const THEME_COLOR = '#3b82f6'; // Generic Blue for Android

export const ANDROID_ROUTE = {
    id: 'route-android',
    name: 'Android App 開發',
    description: '從基礎到進階的 Android 開發與設計模式',
    color: '#3DDC84', // Android Green
    stations: [
        {
            id: 'android_start',
            title: '開發入門HUB',
            description: '歡迎來到 Android 開發課程中心，請選擇下方站點開始學習。',
            type: StationType.INTERCHANGE,
            moduleId: 'module-android',
            // connectedRoutes property can be added here if we want to simulate connections, for now simple.
        },
        {
            id: 'android_theme',
            title: '主題顏色',
            description: '設定與管理 App 的主題色彩系統。',
            type: StationType.NORMAL,
            moduleId: 'module-android',
            link: '/tutorials/Android/App開發/主題顏色'
        },
        {
            id: 'android_custom',
            title: '客製化元件',
            description: '學習如何打造獨特的 UI 元件。',
            type: StationType.NORMAL,
            moduleId: 'module-android',
            link: '/tutorials/Android/App開發/客製化元件'
        },
        {
            id: 'android_binding',
            title: '資料單向綁定',
            description: '理解資料流向與狀態管理。',
            type: StationType.NORMAL,
            moduleId: 'module-android',
            link: '/tutorials/Android/App開發/資料單向綁定'
        },
        {
            id: 'android_input',
            title: '輸入法',
            description: '處理軟鍵盤與輸入框互動。',
            type: StationType.TERMINUS,
            moduleId: 'module-android',
            link: '/tutorials/Android/App開發/輸入法'
        }
    ]
};
