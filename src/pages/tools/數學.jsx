import React from 'react';
import { MetroRouteLayout } from '@/components';
import { ROUTES, MATH_ROUTE } from './數學/data';

function Page() {
    return (
        <MetroRouteLayout
            routes={ROUTES}
            defaultRouteId={MATH_ROUTE.id}
            basePath="/tools/數學"
        />
    );
}

export default Page;