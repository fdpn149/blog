import React, { useState, useEffect, useRef } from 'react';
import { Application, extend } from '@pixi/react';
import { transpose, cross, multiply, inv } from 'mathjs';
import { Container, Graphics } from 'pixi.js';

extend({ Container, Graphics });

// 螢幕尺寸
const [width, height] = [1280, 720];

// 轉換函數
function _2D(x, y) {
    return [width / 2.0 + x, height / 2.0 - y];
}

function _3D(x, y, z, focalLength = 500) {
    if (z >= 0.1) {
        return _2D(focalLength * x / z, focalLength * y / z);
    }
    return null;
}

function objLoc(x, y, z, yaw, pitch, cameraPos) {
    const translated = [x - cameraPos[0], y - cameraPos[1], z - cameraPos[2]];
    const right = [Math.cos(yaw), 0, Math.sin(yaw)];
    const front = [-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)];
    const up = cross(right, front); // 計算新的 up 向量
    const mat = transpose([right, up, front]);
    const matInv = inv(mat);
    return _3D(...multiply(matInv, translated), 500);
}

// 單個立方體的基礎頂點（邊長 0.5）
const cubeVerticesBase = [
    [-0.25, -0.25, -0.25], [0.25, -0.25, -0.25], [0.25, 0.25, -0.25], [-0.25, 0.25, -0.25],
    [-0.25, -0.25, 0.25], [0.25, -0.25, 0.25], [0.25, 0.25, 0.25], [-0.25, 0.25, 0.25]
];

// 立方體邊
const cubeEdges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
];

// 生成多個立方體
const cubeCount = 20;
const cubes = Array.from({ length: cubeCount }, () => ({
    center: [
        (Math.random() - 0.5) * 10, // x: -5 到 5
        (Math.random() - 0.5) * 10, // y: -5 到 5
        (Math.random() - 0.5) * 10  // z: -5 到 5
    ]
}));

function Content() {
    const [yaw, setYaw] = useState(0); // 水平旋轉（原 angle）
    const [pitch, setPitch] = useState(0); // 俯仰角
    const [cameraPos, setCameraPos] = useState([0, 0, -10]); // 動態相機位置
    const parentRef = useRef(null);
    const cubeColors = useRef(cubes.map(() => Math.random() * 0xffffff | 0));
    const keys = useRef({ w: false, a: false, s: false, d: false }); // 跟踪按鍵狀態


    useEffect(() => {
        const handleMouseMove = (e) => {
            // 只有鎖定狀態才更新視角
            if (document.pointerLockElement === parentRef.current) {
                setYaw(prev => prev - e.movementX * 0.01); // ← yaw 改成相反方向
                setPitch(prev => {
                    const newPitch = prev + e.movementY * 0.01; // pitch 反向
                    return Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, newPitch));
                });
            }
        };

        const handleClick = () => {
            // 點擊畫面請求鎖定
            if (parentRef.current) {
                parentRef.current.requestPointerLock();
            }
        };

        const handlePointerLockChange = () => {
            // pointerlockchange 觸發時可知道是否釋放
            if (document.pointerLockElement !== parentRef.current) {
                console.log("Pointer unlocked");
                // 可以在這裡加任何釋放後要做的事，例如暫停遊戲等
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


    // 鍵盤控制移動
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

    // 相機移動邏輯
    useEffect(() => {
        let animationFrameId;
        const moveSpeed = 0.1; // 每幀移動距離

        const update = () => {
            const right = [Math.cos(yaw), 0, Math.sin(yaw)];
            const front = [-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)];

            if (keys.current.w) {
                setCameraPos(prev => [
                    prev[0] + front[0] * moveSpeed,
                    prev[1] + front[1] * moveSpeed,
                    prev[2] + front[2] * moveSpeed
                ]);
            }
            if (keys.current.s) {
                setCameraPos(prev => [
                    prev[0] - front[0] * moveSpeed,
                    prev[1] - front[1] * moveSpeed,
                    prev[2] - front[2] * moveSpeed
                ]);
            }
            if (keys.current.d) {
                setCameraPos(prev => [
                    prev[0] + right[0] * moveSpeed,
                    prev[1] + right[1] * moveSpeed,
                    prev[2] + right[2] * moveSpeed
                ]);
            }
            if (keys.current.a) {
                setCameraPos(prev => [
                    prev[0] - right[0] * moveSpeed,
                    prev[1] - right[1] * moveSpeed,
                    prev[2] - right[2] * moveSpeed
                ]);
            }
            animationFrameId = requestAnimationFrame(update);
        };
        animationFrameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationFrameId);
    }, [yaw, pitch]); // 依賴 yaw 和 pitch

    // 投影所有立方體的頂點
    const projectedCubes = cubes.map(cube => {
        const { center } = cube;
        const vertices = cubeVerticesBase.map(([x, y, z]) => [x + center[0], y + center[1], z + center[2]]);
        return vertices.map(vertex => {
            const [x, y, z] = vertex;
            return objLoc(x, y, z, yaw, pitch, cameraPos);
        });
    });

    return (
        <div ref={parentRef} style={{ width: `${width}px`, height: `${height}px` }}>
            <Application
                resizeTo={parentRef}
                width={width}
                height={height}
                color={0x01262a}
            >
                <pixiContainer>
                    <pixiGraphics
                        draw={graphics => {
                            graphics.clear();
                            projectedCubes.forEach((projectedVertices, cubeIndex) => {
                                graphics.setStrokeStyle({ width: 2, color: cubeColors.current[cubeIndex] });
                                cubeEdges.forEach(([i, j]) => {
                                    const p1 = projectedVertices[i];
                                    const p2 = projectedVertices[j];
                                    if (p1 && p2) {
                                        graphics.moveTo(p1[0], p1[1]);
                                        graphics.lineTo(p2[0], p2[1]);
                                    }
                                });
                                graphics.stroke();
                            });
                        }}
                    />
                </pixiContainer>
            </Application>
        </div>
    );
}

export default Content;