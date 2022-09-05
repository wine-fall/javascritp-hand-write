/**
 * 实现 call apply bind
 */

Function.prototype._call = function(context) {
    const params = Array.from(arguments).slice(1);
    const obj = Object(context);
    const key = Symbol('_this');
    obj[key] = this;
    const result = obj[key](...params);
    return result;
}

const target = {
    a: 1,
    b: 2,
};
var a = function(value1, value2) {
    console.log(this);
    console.log(value1);
    console.log(value2);
}
a._call(target, '111', '222');
a.call(target, '111', '222');

