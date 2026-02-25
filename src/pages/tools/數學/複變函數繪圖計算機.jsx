import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { range, complex, abs, arg, pi, unit } from 'mathjs';
import styles from './MathTools.module.scss';
import { exp } from 'mathjs';
import { sin } from 'mathjs';
import { divide } from 'mathjs';
import { tan } from 'mathjs';
import { asin } from 'mathjs';

const ComplexPlot = () => {
    const [angleDeg, setAngleDeg] = useState(0);
    const [plotData, setPlotData] = useState([]);

    useEffect(() => {
        const x = range(-10, 10, 20 / 1000).toArray();

        const angleRad = unit(angleDeg, 'deg').toNumber('rad');
        const xPolar = x.map(r => complex({ r, phi: angleRad }));
        const yComplex = xPolar.map(z => z);
        const yAbs = yComplex.map(y => {
            const val = Number(abs(y));
            // Filter out Infinity, NaN, or extremely large values
            if (!Number.isFinite(val) || val > 1e6) {
                return null;
            }
            return Number(val.toFixed(10));
        });
        const phase = yComplex.map(y => {
            const p = arg(y);
            return p < 0 ? 2 * pi + p : p;
        });
        const hue = phase.map(p => p / (2 * pi));
        const colors = hue.map(h => hsvToRgbString(h, 1, 1));

        setPlotData([{
            x,
            y: yAbs,
            mode: 'markers',
            type: 'scatter',
            marker: {
                color: colors,
                size: 4
            }
        }]);
    }, [angleDeg]);

    return (
        <section className={styles.mathSection}>
            <h3>y∠c = f(x∠θ)</h3>
            <p>{"0° ≤ c(color hue) < 360°"}</p>
            <div className={styles.sliderContainer}>
                <label>
                    <span>θ (deg): {angleDeg.toFixed(1)}</span>
                    <input
                        type="range"
                        min="0"
                        max="359.9"
                        step="0.1"
                        value={angleDeg}
                        onChange={e => setAngleDeg(parseFloat(e.target.value))}
                    />
                </label>
            </div>
            <div style={{ width: '100%', margin: 'auto', overflowX: 'auto', overflowY: 'hidden', borderRadius: 'var(--radius-lg, 8px)' }}>
                <div style={{ minWidth: '600px', height: '400px' }}>
                    <Plot
                        data={plotData}
                        layout={{
                            title: 'func(x) with angle-controlled complex input',
                            xaxis: { title: 'x', automargin: true },
                            yaxis: { title: '|func(xValue)|', automargin: true, rangemode: 'tozero' },
                            autosize: true,
                            margin: { l: 40, r: 20, t: 40, b: 40 }
                        }}
                        useResizeHandler={true}
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
            </div>
        </section>
    );
};

// HSV to RGB string, same logic as Python version
function hsvToRgbString(h, s, v) {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r = 0, g = 0, b = 0;

    switch (((i % 6) + 6) % 6) {
        case 0: [r, g, b] = [v, t, p]; break;
        case 1: [r, g, b] = [q, v, p]; break;
        case 2: [r, g, b] = [p, v, t]; break;
        case 3: [r, g, b] = [p, q, v]; break;
        case 4: [r, g, b] = [t, p, v]; break;
        case 5: [r, g, b] = [v, p, q]; break;
    }

    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

export default ComplexPlot;
