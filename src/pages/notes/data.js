import { StationType } from "@/components/metro/StationNode";

export const NOTES_COLOR = '#4a90e2';

export const NOTES_ROUTE = {
    id: 'route-notes',
    name: '學習筆記',
    description: '各類課程學習筆記與知識統整',
    color: NOTES_COLOR,
    stations: [
        {
            id: 'notes_start',
            title: '筆記總覽 HUB',
            description: '歡迎來到學習筆記中心，請選擇下方站點開始閱讀。',
            type: StationType.TERMINUS,
            moduleId: 'module-notes',
        },
        {
            id: 'notes_multimedia',
            title: '多媒體筆記',
            description: '多媒體系統與應用相關筆記。',
            type: StationType.NORMAL,
            moduleId: 'module-notes',
            link: '/notes/多媒體'
        }
    ]
};

export const ROUTES = {
    'route-notes': NOTES_ROUTE
};
