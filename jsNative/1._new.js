/**
 * 1. 实现一个 new
 */

/**
 * 
 * @param {Function} fn 
 */
const _new = function(fn) {
    const params = Array.from(arguments).slice(1);
    const plain = Object.create(fn.prototype);
    fn.apply(plain, params);
    return plain;
}

const Parent = function(name) {
    this.name = name;
}

Parent.prototype.sayHi = function() {
    console.log(this.name);
}

const child = _new(Parent, 'jack');

child.sayHi();
