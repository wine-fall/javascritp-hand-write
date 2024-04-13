/**
 * mock ajax request
 */

const mockAjax = (time, order) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(order);
        }, time);
    });
};

/**
 * 1 - 并发控制
 * 实现一个类 Schedule
 * 初始化传入一个 num 为最大并发量
 * 达到同时并发数不能超过该最大并发量，若小于则从队列中取出下一个异步来执行
 */
class Schedule{

    constructor(maxNum){
        this.list = [];
        this.maxNum = maxNum;
        this.cnt = 0;
    }
    
    add(promiseCreator){
        this.list.push(promiseCreator);
        this.excute();
    }

    excute(){
        if (this.list.length && this.cnt < this.maxNum){
            this.cnt++;
            const promise = this.list.shift();
            promise().finally(() => {
                this.cnt--;
                this.excute();
            });
        }
    }
}

const schedule = new Schedule(2);

/**
 * @param {{() => Promise}[]} promises 
 * @param {number} maxNum
 * @returns {Promise}
 */
const control = (promises, maxNum) => {
    const queue = [...promises];
    const n = promises.length;
    return new Promise((resolve, reject) => {
        let c = 0;
        const ret = [];
        const run = () => {
            if (ret.length === n) {
                resolve(ret);
                return;
            }
            if (queue.length && c < maxNum) {
                c++;
                const fn = queue.shift();
                fn().then((v) => {
                    ret.push(v);
                }).catch((err) => {
                    reject(err);
                }).finally(() => {
                    c--;
                    run();
                });
            }
        };
        for (let i = 0; i < promises.length; i++) {
            run();
        };
    });
};

const tasks = [
    [1000, 1],
    [500, 2],
    [600, 3],
    [400, 4]
];

// for (let i = 0; i < tasks.length; i++) {
//     schedule.add(() => mockAjax(...tasks[i]));
// };

// control(tasks.map((input) => () => mockAjax(...input)), 2).then((res) => {
//     console.log(res);
// });
class RequestManager {

    constructor(opt) {
        this.opt = opt;
        this.queue = [];
        this.concurrentRequests = 0;
        this.retryMap = new Map();
    }
  
    enqueue([fn, res, rej, handleRetry]) {
        this.queue.push([fn, res, rej, handleRetry]);
        this.retryMap.set(fn, 0);
        this.run();
    }

    run() {
        const {maxConcurrentRequests, maxRetries} = this.opt;
        if (this.concurrentRequests < maxConcurrentRequests && this.queue.length) {
            this.concurrentRequests += 1;
            const [fn, res, rej] = this.queue.shift();
            fn().then((val) => {
                res(val);
            }).catch((err) => {
                if (this.retryMap.get(fn) < maxRetries) {
                    this.retryMap.set(fn, this.retryMap.get(fn) + 1);
                    this.queue.push([fn, res, rej]);
                    handleRetry(err);
                }
                rej(err);
            }).finally(() => {
                this.concurrentRequests -= 1;
                this.run();
            });
        }
    }
}


  
async function main() {
    const requestManager = new RequestManager({
        maxConcurrentRequests: 2,
        maxRetries: 3,
    });
    // 2, 1, 3, 4
  
    const requests = task.map(([timeout, val]) => mockAjax(timeout, val));
    // 错误重试，以及每个 Promsie 的状态被外层处理
    for (const request of requests) {
        const res = (v) => {
            console.log('Result is: ', v);
        };
        const rej = v => {
            console.log('Error is: ', v);
        };

        const handleRetry = v => {
            console.log('Retry is: ', v);
        };
        requestManager.enqueue([request, res, rej, handleRetry]);
    }
}

main();
  
  

// 2 1 3 4
