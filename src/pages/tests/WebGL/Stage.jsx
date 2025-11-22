import React, { useState, useEffect, useRef } from 'react';
import { transpose, cross, multiply, inv, add } from 'mathjs';
import { useCamera } from './Camera';
import { Application } from '@pixi/react';
import { useMemo } from 'react';

function Cube({ pos }) {
    const [position, setPosition] = useState(pos);
    const [color, setColor] = useState(Math.random() * 0xffffff | 0);

    const camera = useCamera();

    const vertices = [
        [-0.25, -0.25, -0.25], [0.25, -0.25, -0.25], [0.25, 0.25, -0.25], [-0.25, 0.25, -0.25],
        [-0.25, -0.25, 0.25], [0.25, -0.25, 0.25], [0.25, 0.25, 0.25], [-0.25, 0.25, 0.25]
    ];

    const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    useEffect(() => {
        setPosition(pos);
    }, [pos]);

    return <pixiGraphics
        draw={graphics => {
            graphics.clear()
            graphics.setStrokeStyle({ width: 2, color: color });
            edges.forEach(([i, j]) => {
                const p1 = objLoc(add(vertices[i], position), camera);
                const p2 = objLoc(add(vertices[j], position), camera);
                if (p1 && p2) {
                    graphics.moveTo(p1[0], p1[1]);
                    graphics.lineTo(p2[0], p2[1]);
                }
            });
            graphics.stroke();
        }}
    />
}

const canvaSize = { width: 1280, height: 720 };

// 轉換函數
function _2D(x, y) {
    return [canvaSize.width / 2.0 + x, canvaSize.height / 2.0 - y];
}

function _3D(x, y, z, focalLength = 500) {
    if (z >= 0.1) {
        return _2D(focalLength * x / z, focalLength * y / z);
    }
    return null;
}

function objLoc(position, camera) {
    const translated = [position[0] - camera.position[0], position[1] - camera.position[1], position[2] - camera.position[2]];
    const right = [Math.cos(camera.yaw), 0, Math.sin(camera.yaw)];
    const front = [-Math.sin(camera.yaw) * Math.cos(camera.pitch), Math.sin(camera.pitch), Math.cos(camera.yaw) * Math.cos(camera.pitch)];
    const up = cross(right, front);
    const mat = transpose([right, up, front]);
    const matInv = inv(mat);
    return _3D(...multiply(matInv, translated), 500);
}

export default function Stage() {
    const parentRef = useRef(null);
    const keys = useRef({ w: false, a: false, s: false, d: false });
    const camera = useCamera();
    // 使用 useMemo 生成固定位置陣列，只生成一次
    const cubePositions = useMemo(() => Array.from({ length: 20 }, () => [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    ]), []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (document.pointerLockElement === parentRef.current) {
                camera.mouseMove(e.movementX, e.movementY);
            }
        };

        const handleClick = () => {
            if (parentRef.current) {
                parentRef.current.requestPointerLock();
            }
        };

        const handlePointerLockChange = () => {
            if (document.pointerLockElement !== parentRef.current) {
                console.log("Pointer unlocked");
            } else {
                console.log("Pointer locked");
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("pointerlockchange", handlePointerLockChange);
        if (parentRef.current) {
            parentRef.current.addEventListener("click", handleClick);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("pointerlockchange", handlePointerLockChange);
            if (parentRef.current) {
                parentRef.current.removeEventListener("click", handleClick);
            }
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'w' || e.key === 'W') keys.current.w = true;
            else if (e.key === 's' || e.key === 'S') keys.current.s = true;
            else if (e.key === 'd' || e.key === 'D') keys.current.d = true;
            else if (e.key === 'a' || e.key === 'A') keys.current.a = true;
        };
        const handleKeyUp = (e) => {
            if (e.key === 'w' || e.key === 'W') keys.current.w = false;
            else if (e.key === 's' || e.key === 'S') keys.current.s = false;
            else if (e.key === 'd' || e.key === 'D') keys.current.d = false;
            else if (e.key === 'a' || e.key === 'A') keys.current.a = false;
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        let animationFrameId;
        const update = () => {
            camera.keyPressMove(keys.current);
            animationFrameId = requestAnimationFrame(update);
        };
        animationFrameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationFrameId);
    }, [camera.yaw, camera.pitch]);

    return <div ref={parentRef} style={{ width: `${canvaSize.width}px`, height: `${canvaSize.height}px` }}>
        <Application
            resizeTo={parentRef}
            width={canvaSize.width}
            height={canvaSize.height}
            backgroundColor={0x01262a}>
            <pixiContainer>
                {cubePositions.map((pos, index) => (
                    <Cube key={index} pos={pos} />
                ))}
            </pixiContainer>
        </Application>
    </div>
}