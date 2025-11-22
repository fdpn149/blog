import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { range, complex, sin, abs, arg, pi, unit } from 'mathjs';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { exp } from 'mathjs';
import { divide } from 'mathjs';
import { i } from 'mathjs';
import { multiply } from 'mathjs';

const ComplexPlot = () => {
    const [angleDeg, setAngleDeg] = useState(0);
    const [plotData, setPlotData] = useState([]);

    useEffect(() => {
        const x = range(-10, 10, 20 / 1000).toArray();

        const angleRad = unit(angleDeg, 'deg').toNumber('rad');
        const xPolar = x.map(r => complex({ r, phi: angleRad }));
        const yComplex = xPolar.map(z => sin(z));
        const yAbs = yComplex.map(y => abs(y));
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

    return (<div>
        <Header />
        <main>
            <section>
                <h2>y∠c = sin(x∠θ)</h2>
                <p>{"0° ≤ c(color hue) < 360°"}</p>
                <br/>
                <label>
                        θ (deg): {angleDeg.toFixed(1)}
                        <input
                            type="range"
                            min="0"
                            max="359.9"
                            step="0.1"
                            value={angleDeg}
                            onChange={e => setAngleDeg(parseFloat(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </label>
                <div style={{ width: '90%', margin: 'auto', overflow: 'scroll'}}>
                    <Plot
                        data={plotData}
                        layout={{
                            title: 'func(x) with angle-controlled complex input',
                            xaxis: { title: 'x' },
                            yaxis: { title: '|func(xValue)|' },
                        }}
                    />
                </div>
            </section>
        </main>
        <Footer/>
    </div>
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

    switch (i % 6) {
        case 0: [r, g, b] = [v, t, p]; break;
        case 1: [r, g, b] = [q, v, p]; break;
        case 2: [r, g, b] = [p, v, t]; break;
        case 3: [r, g, b] = [p, q, v]; break;
        case 4: [r, g, b] = [t, p, v]; break;
        case 5: [r, g, b] = [v, p, q]; break;
    }

    return `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
}

export default ComplexPlot;
