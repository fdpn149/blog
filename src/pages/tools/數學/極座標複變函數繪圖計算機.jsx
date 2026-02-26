import React, { useEffect, useState, useRef, useMemo } from 'react';
import { complex, abs, arg, pi, unit, multiply, tan, divide, cos } from 'mathjs';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, zoomTransform } from 'd3-zoom';
import styles from './MathTools.module.scss';

const PolarComplexPlot = () => {
    const [angleDeg, setAngleDeg] = useState(0);
    const [autoScale, setAutoScale] = useState(false);
    const [fixedScale, setFixedScale] = useState(10);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

    // Handle responsive container
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver(entries => {
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                // Polar plot is usually square-ish, but rect is fine
                setDimensions({ width, height: Math.max(400, height) });
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Generate Points
    const chartData = useMemo(() => {
        const phiRad = unit(angleDeg, 'deg').toNumber('rad');

        const evaluate = (thetaDeg) => {
            const thetaRad = unit(thetaDeg, 'deg').toNumber('rad');
            const z = complex({ r: thetaRad, phi: phiRad });
            const y = multiply(tan(z), divide(1, cos(z)));
            let rMag = Number(abs(y));
            if (!Number.isFinite(rMag) || rMag > 1e6) {
                rMag = null;
            }
            return { thetaDeg, z, y, rMag };
        };

        const thetaMin = 0;
        const thetaMax = 720;
        const initialSteps = 720; // Every 1 degree initially
        const stepSize = (thetaMax - thetaMin) / initialSteps;

        let initialPoints = [];
        for (let i = 0; i <= initialSteps; i++) {
            initialPoints.push(evaluate(thetaMin + i * stepSize));
        }

        const validMags = initialPoints.map(p => p.rMag).filter(m => m !== null && m < 1e6);
        validMags.sort((a, b) => a - b);
        let p95 = 10, p50 = 1, trueMax = 10, trueMin = 0;
        if (validMags.length > 0) {
            p95 = validMags[Math.floor(validMags.length * 0.95)];
            p50 = validMags[Math.floor(validMags.length * 0.50)];
            trueMax = validMags[validMags.length - 1];
            trueMin = validMags[0];
        }

        let calculatedMax = trueMax > 1000 ? Math.max(p95 * 2, p50 * 5) : trueMax;
        if (calculatedMax <= 0) calculatedMax = 1;

        let viewMax = autoScale ? calculatedMax : fixedScale;

        let points = [initialPoints[0]];
        const MAX_DEPTH = 14;
        const R_THRESHOLD = viewMax / 300;
        const CUTOFF_MAG = viewMax * 10;
        const MIN_DTHETA = (thetaMax - thetaMin) / 50000;

        const adaptiveSample = (p1, p2, depth) => {
            let subdivide = false;
            const m1 = p1.rMag !== null ? p1.rMag : 1e6;
            const m2 = p2.rMag !== null ? p2.rMag : 1e6;

            if (depth < MAX_DEPTH && Math.abs(p2.thetaDeg - p1.thetaDeg) > MIN_DTHETA) {
                if (Math.min(m1, m2) < CUTOFF_MAG) {
                    const re1 = p1.y.re ?? (typeof p1.y === 'number' ? p1.y : 0);
                    const im1 = p1.y.im ?? 0;
                    const re2 = p2.y.re ?? (typeof p2.y === 'number' ? p2.y : 0);
                    const im2 = p2.y.im ?? 0;
                    const dist = Math.hypot(re1 - re2, im1 - im2);

                    if (dist > R_THRESHOLD) {
                        subdivide = true;
                    }
                }
            }

            if (subdivide) {
                const midTheta = (p1.thetaDeg + p2.thetaDeg) / 2;
                const pMid = evaluate(midTheta);
                adaptiveSample(p1, pMid, depth + 1);
                adaptiveSample(pMid, p2, depth + 1);
            } else {
                points.push(p2);
            }
        };

        for (let i = 1; i <= initialSteps; i++) {
            adaptiveSample(initialPoints[i - 1], initialPoints[i], 0);
        }

        const renderCutoff = viewMax * 1.5;
        const finalPoints = [];
        points.forEach(p => {
            if (p.rMag !== null && p.rMag < renderCutoff) {
                let pAngle = 0;
                try {
                    const pa = arg(p.y);
                    pAngle = pa < 0 ? 2 * pi + pa : pa;
                } catch (e) { }

                // Convert polar (r, theta) to cartesian (x, y) relative to center
                const r = Number(p.rMag.toFixed(10));
                const thetaRad = unit(p.thetaDeg, 'deg').toNumber('rad');

                finalPoints.push({
                    x: r * Math.cos(thetaRad),
                    y: r * Math.sin(thetaRad),
                    color: hsvToRgbString(pAngle / (2 * pi), 1, 1)
                });
            }
        });

        return { points: finalPoints, viewMax };
    }, [angleDeg, autoScale, fixedScale]);

    // Canvas Rendering & D3 Zoom
    const d3ZoomRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const { width, height } = dimensions;
        const { points, viewMax } = chartData;

        // Ensure canvas physical size matches CSS size for sharp rendering
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        // Calculate scale to fit `viewMax * 1.2` into the smallest dimension
        const paddingRatio = 1.2;
        const radiusBound = viewMax * paddingRatio;
        const minDim = Math.min(width, height);

        // Data boundaries (centered at 0,0)
        const dataXMin = -radiusBound;
        const dataXMax = radiusBound;
        const dataYMin = -radiusBound;
        const dataYMax = radiusBound;

        // Map data X,Y to Screen X,Y, scaling proportionately
        // Center of canvas
        const cx = width / 2;
        const cy = height / 2;
        const scale = (minDim / 2) / radiusBound;

        const mapX = (x) => cx + x * scale;
        const mapY = (y) => cy - y * scale; // Invert Y

        const drawGrid = (transform, textColor, borderColor) => {
            ctx.lineWidth = 1;
            ctx.strokeStyle = borderColor;
            ctx.fillStyle = textColor;
            ctx.font = '10px sans-serif';

            const center = {
                x: transform.applyX(cx),
                y: transform.applyY(cy)
            };

            // Calculate dynamic step for rings
            const pixelsPerUnit = scale * transform.k;
            const targetStep = 80 / pixelsPerUnit;
            const power = Math.floor(Math.log10(targetStep));
            let rStep = Math.pow(10, power);
            if (targetStep / rStep >= 5) rStep *= 5;
            else if (targetStep / rStep >= 2) rStep *= 2;

            // Draw concentric circles
            const maxR = viewMax * 1.5;
            for (let rData = rStep; rData <= maxR; rData += rStep) {
                const rScreen = rData * scale * transform.k;

                ctx.beginPath();
                ctx.arc(center.x, center.y, rScreen, 0, 2 * Math.PI);
                ctx.stroke();

                ctx.fillText(parseFloat(rData.toPrecision(3)), center.x + rScreen + 2, center.y - 2);
            }

            // Draw angle rays (every 45 degrees)
            for (let deg = 0; deg < 360; deg += 45) {
                const rad = deg * (Math.PI / 180);
                const outerR = maxR; // Max length

                // End point in data space
                const xEnd = outerR * Math.cos(rad);
                const yEnd = outerR * Math.sin(rad);

                // End point in screen space
                const px = transform.applyX(mapX(xEnd));
                const py = transform.applyY(mapY(yEnd));

                ctx.beginPath();
                ctx.moveTo(center.x, center.y);
                ctx.lineTo(px, py);
                ctx.stroke();

                // Add angle labels
                const labelPx = transform.applyX(mapX(xEnd * 1.05));
                const labelPy = transform.applyY(mapY(yEnd * 1.05));

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${deg}°`, labelPx, labelPy);
            }
            ctx.textAlign = 'start';
            ctx.textBaseline = 'alphabetic';
        };

        const draw = () => {
            const transform = zoomTransform(canvas);

            ctx.clearRect(0, 0, width, height);

            // Fetch current CSS theme colors
            const computedStyle = getComputedStyle(document.body);
            const textColor = computedStyle.getPropertyValue('--text-color').trim() || '#fff';
            // Use border color but lower opacity for faint grid lines
            const borderColorRaw = computedStyle.getPropertyValue('--border-color').trim() || 'rgba(255, 255, 255, 0.4)';

            // We can't easily parse var() or complex values universally here cleanly without a parser, 
            // but we can trust the computed color is either rgb/rgba/#hex. 
            // In typical globals.scss, border-color is a rgba or hex.
            // Let's just use it directly, Canvas handles it well.
            const borderColor = borderColorRaw;

            // Draw polar grid
            drawGrid(transform, textColor, borderColor);

            // Draw points
            points.forEach(p => {
                const px = transform.applyX(mapX(p.x));
                const py = transform.applyY(mapY(p.y));

                // Viewport culling
                if (px >= -2 && px <= width + 2 && py >= -2 && py <= height + 2) {
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(px, py, 2, 0, 2 * Math.PI);
                    ctx.fill();
                }
            });
        };

        const zoomBehavior = zoom()
            .scaleExtent([0.1, 50])
            .on('zoom', draw);

        d3ZoomRef.current = zoomBehavior;
        select(canvas).call(zoomBehavior);

        // Initial draw
        draw();

    }, [chartData, dimensions]);

    const handleResetView = () => {
        const canvas = canvasRef.current;
        if (canvas && d3ZoomRef.current) {
            select(canvas).transition().duration(500).call(d3ZoomRef.current.transform, zoomIdentity);
        }
    };

    return (
        <section className={styles.mathSection}>
            <h3>r∠c = f(θ∠φ)</h3>
            <p>{"0° ≤ c(color hue) < 360°"}</p>
            <div className={styles.sliderContainer}>
                <label>
                    <span className={styles.sliderLabelText}>φ (deg): {angleDeg.toFixed(1)}</span>
                    <input
                        type="range"
                        min="0"
                        max="359.9"
                        step="0.1"
                        value={angleDeg}
                        onChange={e => setAngleDeg(parseFloat(e.target.value))}
                    />
                </label>

                <div className={styles.controlPanel}>
                    <label className={styles.controlLabel}>
                        <label className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                checked={autoScale}
                                onChange={e => setAutoScale(e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                        畫面自適應
                    </label>
                    {!autoScale && (
                        <label className={styles.controlLabel}>
                            <span>半徑範圍:</span>
                            <input
                                className={`${styles.input} ${styles.fixedScaleInput}`}
                                type="number"
                                value={fixedScale}
                                onChange={e => {
                                    const val = parseFloat(e.target.value);
                                    if (!isNaN(val) && val > 0) setFixedScale(val);
                                }}
                                min="0.1"
                                step="any"
                            />
                        </label>
                    )}
                    <button
                        onClick={handleResetView}
                        className={`${styles.buttonSecondary} ${styles.alignRight}`}
                    >
                        重設視角
                    </button>
                </div>
            </div>
            <div
                ref={containerRef}
                className={styles.canvasContainer}
            >
                <canvas
                    ref={canvasRef}
                    className={`${styles.canvas} ${styles.polar}`}
                />
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

export default PolarComplexPlot;
