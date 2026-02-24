import React from 'react';
import { MetroRouteLayout } from '@/components';
import { ROUTES, ANDROID_ROUTE } from './AndroidApp開發/data';

function Page() {
    return (
        <MetroRouteLayout
            routes={ROUTES}
            defaultRouteId={ANDROID_ROUTE.id}
            basePath="/tutorials/AndroidApp開發"
            onResolveConflict={(pathname, candidates) => {
                if (pathname === '/tutorials/AndroidApp開發/輸入法') {
                    return candidates.find(c => c.routeId === 'route-input');
                }
                return candidates[0];
            }}
        />
    );
}

export default Page;
