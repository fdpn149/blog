import RadixWorker from './RadixWorker?worker';

export function calculate(type, base, decimal) {
    return new Promise((resolve, reject) => {
        const worker = new RadixWorker();

        const timeout = setTimeout(() => {
            worker.terminate();
            reject(new Error("無法計算"));
        }, 1000);

        worker.onmessage = (e) => {
            clearTimeout(timeout);
            if (e.data.success) {
                resolve(e.data.result);
            } else {
                reject(new Error(e.data.error));
            }
            worker.terminate();
        };

        worker.onerror = (err) => {
            clearTimeout(timeout);
            reject(err);
            worker.terminate();
        };

        worker.postMessage({ type, base, decimal });
    });
}
