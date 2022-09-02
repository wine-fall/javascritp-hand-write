/**
 * 2. Promise _allSettled
 * 自己实现一个 Promise.allSettled
 * 传入一个数组，每个元素为异步请求
 * 返回一个Promise，当所有请求完成后，在 then 里可以拿到所有的结果
 * 结果的格式为: 
 * [
 *  {status: "fulfilled", value: 1},
 *  {status: "fulfilled", value: 2},
 *  {status: "rejected", value: 3},
 * ]
 */

const createPromise = (time, flag) => {
    return new Promise((resolve, rejected) => {
        setTimeout(() => {
            if (flag) {
                resolve(time);
            } else {
                rejected(time);
            }
        }, time);
    })
}
const list = [
    () => createPromise(1000, true),
    () => createPromise(200, true),
    () => createPromise(1000, false),
    () => createPromise(400, true),
]
Promise._allSettled = function(promises) {
    const n = promises.length;
    return new Promise((resolve) => {
        const list = Array.from({length: n});
        let idx = 0;
        for (let i = 0; i < n; i++) {
            const p = promises[i];
            p().then((value) => {
                list[i] = {status: "fulfilled", value}
            }).catch((value) => {
                list[i] = {status: "rejected", value}
            }).finally(() => {
                idx++;
                if (idx === n) {
                    resolve(list); 
                }
            })
        }
    })
}
Promise._allSettled(list).then((result) => {
    console.log(result);
});
// [
//     {status: "fulfilled", value: 1},
//     {status: "fulfilled", value: 2},
//     {status: "rejected", value: 3},
// ]