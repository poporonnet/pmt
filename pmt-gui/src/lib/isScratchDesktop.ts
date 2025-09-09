/**
 * Internal stored state. Not valid until after at least one call to `setIsScratchDesktop()`.
 */
let _isScratchDesktop: boolean | undefined; // undefined = not ready yet

/**
 * Tell the `isScratchDesktop()` whether or not the GUI is running under Scratch Desktop.
 */
const setIsScratchDesktop = function (value: boolean): void {
    _isScratchDesktop = value;
};

/**
 * @returns true if it seems like the GUI is running under Scratch Desktop; false otherwise.
 * If `setIsScratchDesktop()` has not yet been called, this can return `undefined`.
 */
const isScratchDesktop = function (): boolean | undefined {
    return _isScratchDesktop;
};

/**
 * @returns false if it seems like the GUI is running under Scratch Desktop; true otherwise.
 */
const notScratchDesktop = function (): boolean {
    return !isScratchDesktop();
};

export default isScratchDesktop;
export {
    isScratchDesktop,
    notScratchDesktop,
    setIsScratchDesktop
};
