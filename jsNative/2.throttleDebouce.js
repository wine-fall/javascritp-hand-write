/**
 * 2. 实现 debouce 和 throttle
 */

const throttle = (fn, delay) => {
    let timer = null;
    let flag = false;
    return function(...args) {
        if (flag) {
            flag = false;
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                console.log('yes settimeout')
                fn(...args);
                flag = true;
            }, delay);
        } else if (!timer) {
            console.log('no settimeout')
            fn(...args);
            flag = true;
        }
    }
}
const debounce = (fn, delay) => {
    let timer = null;
    return function(...args) {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
            clearTimeout(timer);
        }, delay);
    }
}
// const btn = document.getElementById('btn');
// const cb = (e) => {
//     console.log(e);
//     console.log('click')
// }
// btn.addEventListener('click', debounce(cb, 1000));