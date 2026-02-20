import { StationType } from "@/components/metro/StationNode";

export const MATH_COLOR = '#2980b9'; // Beliz Hole Blue

export const MATH_ROUTE = {
    id: 'route-math',
    name: '應用數學工具',
    description: '實用的數學計算與視覺化工具集',
    color: MATH_COLOR,
    stations: [
        {
            id: 'math_hub',
            title: '數學工具HUB',
            description: '歡迎來到數學工具中心，請選擇下方站點開始使用。',
            type: StationType.TERMINUS,
            moduleId: 'module-math',
        },
        {
            id: 'math_radix',
            title: '進制轉換器',
            description: '快速進行二進制、十進制、十六進制等數值轉換。',
            type: StationType.NORMAL,
            moduleId: 'module-math',
            link: '/tools/數學/進制轉換器'
        },
        {
            id: 'math_complex',
            title: '複變函數繪圖',
            description: '視覺化複變函數，協助理解複雜的數學概念。',
            type: StationType.NORMAL,
            moduleId: 'module-math',
            link: '/tools/數學/複變函數繪圖計算機'
        },
        {
            id: 'math_quaternion',
            title: '四元數運算',
            description: '提供四元數的加減乘除運算功能。',
            type: StationType.NORMAL,
            moduleId: 'module-math',
            link: '/tools/數學/四元數四則運算'
        }
    ]
};

export const ROUTES = {
    'route-math': MATH_ROUTE
};
