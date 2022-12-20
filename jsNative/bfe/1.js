function curry(fn) {
  // your code here
  const ret = function() {
    if (arguments.length >= fn.length) {
      return fn(...arguments);
    } else {
      return ret.bind(null, ...arguments);
    }
  }
  return ret;
}

const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)

console.log(curriedJoin(1, 2, 3)) // '1_2_3'

console.log(curriedJoin(1)(2, 3)) // '1_2_3'

console.log(curriedJoin(1, 2)(3)) // '1_2_3'
