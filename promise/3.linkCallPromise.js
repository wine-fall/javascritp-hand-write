/**
 * mock ajax request
 */

 const timeout = time => new Promise((resolve) => {
    setTimeout(resolve, time);
}); 

/**
 * 3. 链式调用
 * 实现 promise 的链式调用
 * 传入一个数组，元素为异步函数，当前一个执行完成后再去执行下一个
 */

const createPromise = (time, order) => {
    return timeout(time).then(() => {
        console.log(order);
    })
}
const list = [
    () => createPromise(1000, 1),
    () => createPromise(200, 2),
    () => createPromise(3000, 3),
    () => createPromise(400, 4),
]

const callList = (list) => {
    let p = Promise.resolve();
    for (let i = 0; i < list.length; i++) {
        p = p.then(() => {
            return list[i]();
        });
    }
}

callList(list);
