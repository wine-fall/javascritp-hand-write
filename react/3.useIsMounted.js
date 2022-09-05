/**
 * ensure the component is mounted
 * origin: https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
 * problem: You are setting the state after the promise resolves, which can cause this code to run after the component has unmounted.
 * example:
 * -- when you need do some async operator in useEffect while the deps is empty
 * -- code:
 * ```
 * function Book() {
        const isMounted = useIsMounted();
        ...
        useEffect(() => {
            asyncOperation().then(data => {
                if (isMounted.current) {
                    setState(data);
                }
            })
        });
        ...
    }
 * ```
 */

export function useIsMounted() {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {isMounted.current = false;};
    }, []);

    return isMounted;
}