import React, { useState, useEffect, useRef } from 'react';
import { Application, extend } from '@pixi/react';
import { transpose, cross, multiply, inv, add } from 'mathjs';
import { Container, Graphics } from 'pixi.js';

extend({ Container, Graphics });

class Camera {
    constructor() {
        this.position = [0, 0, -10];
        this.yaw = 0;
        this.pitch = 0;
        this.mouseMoveSpeed = 0.01;
        this.keyPressMoveSpeed = 0.1;
    }

    mouseMove(movementX, movementY) {
        this.yaw -= movementX * this.mouseMoveSpeed;
        const newPitch = this.pitch + movementY * this.mouseMoveSpeed;
        this.pitch = Math.max(-Math.PI / 2 + this.mouseMoveSpeed, Math.min(Math.PI / 2 - this.mouseMoveSpeed, newPitch));
    }

    keyPressMove(keys) {
        const right = [Math.cos(this.yaw), 0, Math.sin(this.yaw)];
        const front = [-Math.sin(this.yaw) * Math.cos(this.pitch), Math.sin(this.pitch), Math.cos(this.yaw) * Math.cos(this.pitch)];

        if (keys.w) {
            this.position = [
                this.position[0] + front[0] * this.keyPressMoveSpeed,
                this.position[1] + front[1] * this.keyPressMoveSpeed,
                this.position[2] + front[2] * this.keyPressMoveSpeed
            ];
        }
        if (keys.s) {
            this.position = [
                this.position[0] - front[0] * this.keyPressMoveSpeed,
                this.position[1] - front[1] * this.keyPressMoveSpeed,
                this.position[2] - front[2] * this.keyPressMoveSpeed
            ];
        }
        if (keys.d) {
            this.position = [
                this.position[0] + right[0] * this.keyPressMoveSpeed,
                this.position[1] + right[1] * this.keyPressMoveSpeed,
                this.position[2] + right[2] * this.keyPressMoveSpeed
            ];
        }
        if (keys.a) {
            this.position = [
                this.position[0] - right[0] * this.keyPressMoveSpeed,
                this.position[1] - right[1] * this.keyPressMoveSpeed,
                this.position[2] - right[2] * this.keyPressMoveSpeed
            ];
        }
    }
}

class Cube {
    constructor(position) {
        this.vertices = [
            [-0.25, -0.25, -0.25], [0.25, -0.25, -0.25], [0.25, 0.25, -0.25], [-0.25, 0.25, -0.25],
            [-0.25, -0.25, 0.25], [0.25, -0.25, 0.25], [0.25, 0.25, 0.25], [-0.25, 0.25, 0.25]
        ];
        this.edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ];
        this.color = Math.random() * 0xffffff | 0;
        this.position = position;
    }

    draw(graphics, camera) {
        graphics.setStrokeStyle({ width: 2, color: this.color });
        this.edges.forEach(([i, j]) => {
            const p1 = objLoc(add(this.vertices[i], this.position), camera);
            const p2 = objLoc(add(this.vertices[j], this.position), camera);
            if (p1 && p2) {
                graphics.moveTo(p1[0], p1[1]);
                graphics.lineTo(p2[0], p2[1]);
            }
        });
        graphics.stroke();
    }
}

class Manager {
    constructor() {
        this.camera = new Camera();
        this.cubes = Array.from({ length: 20 }, () => new Cube([(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]));
    }

    draw(graphics) {
        graphics.clear();
        this.cubes.forEach(cube => {
            cube.draw(graphics, this.camera);
        });
    }
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

function Content() {
    const parentRef = useRef(null);
    const keys = useRef({ w: false, a: false, s: false, d: false });
    const manager = useRef(new Manager()).current; // 使用 useRef 保持 Manager 實例
    const [, forceUpdate] = useState({}); // 用於強制重新渲染

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (document.pointerLockElement === parentRef.current) {
                manager.camera.mouseMove(e.movementX, e.movementY);
                forceUpdate({}); // 強制重新渲染
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
            manager.camera.keyPressMove(keys.current);
            forceUpdate({}); // 強制重新渲染
            animationFrameId = requestAnimationFrame(update);
        };
        animationFrameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div ref={parentRef} style={{ width: `${canvaSize.width}px`, height: `${canvaSize.height}px` }}>
            <Application
                resizeTo={parentRef}
                width={canvaSize.width}
                height={canvaSize.height}
                backgroundColor={0x01262a}
            >
                <pixiContainer>
                    <pixiGraphics
                        draw={graphics => {
                            manager.draw(graphics);
                        }}
                    />
                </pixiContainer>
            </Application>
        </div>
    );
}

export default Content;