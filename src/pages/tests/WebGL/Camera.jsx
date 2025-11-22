import React from "react"
import { useState } from "react";
import { useContext } from "react"

const CameraContext = React.createContext();

export const useCamera = () => useContext(CameraContext);

export const CameraProvider = ({ children }) => {
    const [position, setPosition] = useState([0, 0, -10]);
    const [yaw, setYaw] = useState(0);
    const [pitch, setPitch] = useState(0);
    const mouseMoveSpeed = 0.01;
    const keyPressMoveSpeed = 0.1;

    const mouseMove = (movementX, movementY) => {
        setYaw(prevYaw => prevYaw - movementX * mouseMoveSpeed);
        setPitch(prevPitch => Math.max(-Math.PI / 2 + mouseMoveSpeed, Math.min(Math.PI / 2 - mouseMoveSpeed, prevPitch + movementY * mouseMoveSpeed)));
    }

    const keyPressMove = (keys) => {
        const right = [Math.cos(yaw), 0, Math.sin(yaw)];
        const front = [-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)];

        if (keys.w) {
            setPosition(prevPosition => [
                prevPosition[0] + front[0] * keyPressMoveSpeed,
                prevPosition[1] + front[1] * keyPressMoveSpeed,
                prevPosition[2] + front[2] * keyPressMoveSpeed
            ]);
        }
        if (keys.s) {
            setPosition(prevPosition => [
                prevPosition[0] - front[0] * keyPressMoveSpeed,
                prevPosition[1] - front[1] * keyPressMoveSpeed,
                prevPosition[2] - front[2] * keyPressMoveSpeed
            ]);
        }
        if (keys.d) {
            setPosition(prevPosition => [
                prevPosition[0] + right[0] * keyPressMoveSpeed,
                prevPosition[1] + right[1] * keyPressMoveSpeed,
                prevPosition[2] + right[2] * keyPressMoveSpeed
            ]);
        }
        if (keys.a) {
            setPosition(prevPosition => [
                prevPosition[0] - right[0] * keyPressMoveSpeed,
                prevPosition[1] - right[1] * keyPressMoveSpeed,
                prevPosition[2] - right[2] * keyPressMoveSpeed
            ]);
        }
    }

    const state = {
        position: position,
        yaw: yaw,
        pitch: pitch,
        mouseMove: mouseMove,
        keyPressMove: keyPressMove
    }

    return <CameraContext.Provider value={state}>{children}</CameraContext.Provider>;

}