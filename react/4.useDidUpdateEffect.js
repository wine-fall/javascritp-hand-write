/**
 * skip applying an effect on the first render
 * origin: https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render
 */
/**
 * 
 * @param {Function} fn 
 * @param {any[]} deps 
 */
const useDidUpdateEffect = (fn, deps) => {
    const ref = useRef(false);
    useEffect(() => {
        if (ref.current) {
            return fn();
        }
        ref.current = true;
    }, deps);
}