import { calculate } from './RadixCalcCore.js';

self.onmessage = (e) => {
    const { type, base, decimal } = e.data;
    try {
        const result = calculate(type, base, decimal);
        self.postMessage({ success: true, result });
    } catch (err) {
        self.postMessage({ success: false, error: err.message });
    }
};
