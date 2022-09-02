/**
 * 1. 实现 usePrevious hook，可以拿到上一次的 state
 */

const usePrevious = (value) => {
    const ref = useRef(value);
    useEffect(() => {
        ref.current = value;
    }, [value])
    return ref.current;
}

