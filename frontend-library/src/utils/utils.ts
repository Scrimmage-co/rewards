/**
 * Creates a buffer that will emit the values after the given time.
 */
export const createBufferTime = <T>(
    time: number,
    subscriber: (values: T[]) => void,
): ((value: T) => void) => {
    let buffer: T[] = [];
    let timeout;

    const emitBuffer = () => {
        subscriber(buffer);
        buffer = [];
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    };

    return (value: T) => {
        buffer.push(value);
        if (timeout === null) {
            timeout = setTimeout(emitBuffer, time);
        }
    };
};
