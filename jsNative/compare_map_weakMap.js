const usedMemory = () => {
    const used = process.memoryUsage().heapUsed;
    return Math.round(used / 1024 / 1024);
};

const useMap = () => {
    global.gc();
    let a = Array(1e6);
    const map = new Map();
    map.set(a, 111);
    console.log(`Map ${usedMemory()} M`); // 10M
    a = null;
    global.gc();
    console.log(`Map ${usedMemory()} M`); // 10M
};

const useWeakMap = () => {
    global.gc();
    let a = Array(1e6);
    const map = new WeakMap();
    map.set(a, 111);
    console.log(`WeakMap ${usedMemory()} M`); // 10M
    a = null;
    global.gc();
    console.log(`WeakMap ${usedMemory()} M`); // 3M
};

const main = () => {
    useMap();
    useWeakMap();
};

main();