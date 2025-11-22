import React from 'react';
import { extend } from '@pixi/react';
import { Container, Graphics } from 'pixi.js';
import { CameraProvider } from './Camera';
import Stage from './Stage';

extend({ Container, Graphics });

function Content() {

    return <CameraProvider>
        <Stage />
    </CameraProvider>
}

export default Content;