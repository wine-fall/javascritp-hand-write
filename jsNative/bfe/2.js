
// This is a JavaScript coding problem from BFE.dev 

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
    // your code here
    const _ = arguments.callee.placeholder;
    const ret = function() {
        const args = Array.from(arguments);
        if (args.length >= fn.length && args.every(item => item !== _)) {
          return fn(...args);
        } else {
          return function() {
            const params = Array.from({length: fn.length}).map((i, idx) => idx < args.length ? args[idx] : _);
            const newArg = Array.from(arguments);
            let p1 = 0;
            let p2 = 0;
            while (p2 < newArg.length) {
                while (params[p1] !== _ && p1 < params.length) {
                    p1++;
                }
                if (newArg[p2] !== _) {
                    params[p1] = newArg[p2];
                }
				p1++;
                p2++;
            }
            return ret(...params);
          }
        }
    }
    return ret;
}


curry.placeholder = Symbol()

const  join = (a, b, c) => {
    return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)
const _ = curry.placeholder

console.log(curriedJoin(_,_,3,4)(1,_)(2,5)) // '1_2_3'

console.log(curriedJoin(_, 2)(1, 3)) // '1_2_3'

console.log(curriedJoin(_, _, _)(1)(_, 3)(2)) // '1_2_3'

const curried = curry(join)(1, 2)

console.log(curried(3));
console.log(curried(4));
  
  
  