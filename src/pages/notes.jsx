import React from 'react';
import { MetroRouteLayout } from '@/components';
import { ROUTES, NOTES_ROUTE } from './notes/data';

function Page() {
    return (
        <MetroRouteLayout
            routes={ROUTES}
            defaultRouteId={NOTES_ROUTE.id}
            basePath="/notes"
        />
    );
}

export default Page;
