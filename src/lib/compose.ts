/**
 * Composes a series of functions into a single function.
 * The functions are executed from right to left.
 *
 * For example, compose(f, g, h)(value) is equivalent to f(g(h(value))).
 *
 * @param functions - A list of functions to compose.
 * @returns A new function that is the composition of the provided functions.
 */
export const compose = <T>(
  ...functions: Array<(arg: T) => T>
): ((initialValue: T) => T) => {
  return functions.reduceRight(
    (composedFunction, currentFunction) => {
      return (initialValue: T) =>
        composedFunction(currentFunction(initialValue));
    },
    (initialValue: T) => initialValue // Identity function as the initial value
  );
};
