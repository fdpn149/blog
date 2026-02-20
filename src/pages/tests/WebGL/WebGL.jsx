import React from 'react';
import { extend } from '@pixi/react';
import { Container, Graphics } from 'pixi.js';
import { CameraProvider } from './Camera';
import { MainLayout } from '@/components';
import Stage from './Stage';

extend({ Container, Graphics });

function Content() {

    return <MainLayout>
        <CameraProvider>
            <Stage />
        </CameraProvider>
    </MainLayout>
}

export default Content;