
// This is a JavaScript coding problem from BFE.dev 
// I think this question is too hard
/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
    // your code here
    return function curried(...args) {
        const complete = args.length >= fn.length && !args.slice(0, fn.length).includes(curry.placeholder);
        if(complete) return fn.apply(this, args)
        return function(...newArgs) {
          // replace placeholders in args with values from newArgs
          const res = args.map(arg => arg === curry.placeholder && newArgs.length ? newArgs.shift() : arg);
          return curried(...res, ...newArgs);
        }
    }
}


curry.placeholder = Symbol()

const  join = (a, b, c) => {
    return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)
const _ = curry.placeholder

// console.log(curriedJoin(_,_,3,4)(1,_)(2,5)) // '1_2_3'

console.log(curriedJoin(_, 2)(1, 3)) // '1_2_3'

// console.log(curriedJoin(_, _, _)(1)(_, 3)(2)) // '1_2_3'
  
  
  
  