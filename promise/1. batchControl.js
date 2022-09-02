/**
 * mock ajax request
 */

const timeout = time => new Promise((resolve) => {
    setTimeout(resolve, time);
}); 

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
            promise().then(() => {
                this.cnt--;
                this.excute();
            });
        }
    }
}

const schedule = new Schedule(2);

const addTask = (time, order) => {
    schedule.add(() => timeout(time).then(() => {
        console.log(order);
    }));
};

addTask(1000, 1);
addTask(500, 2);
addTask(600, 3);
addTask(400, 4);

// 2 1 3 4
