export const logPrefix = "dune-client:";

/**
 * utility sleep method.
 * @param seconds number of seconds to sleep for.
 * @returns void
 */
export function sleep(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

/**
 * Computes the difference between a given timestamp and now (in hours)
 * @param timestamp
 * @returns time difference between input `timestamp` and now (in hours)
 */
export function ageInHours(timestamp: Date | string): number {
  // Get the current date and time
  const now: Date = new Date();
  // Given date time:
  const time = new Date(timestamp);
  // Calculate the difference in milliseconds
  const resultAge: number = now.getTime() - time.getTime();
  // Convert milliseconds to hours and return
  return resultAge / (1000 * 60 * 60);
}

/**
 * Return a shallow copy of an object with defaults for keys that are undefined.
 *
 * @param obj The object to copy.
 * @param defaults The fallback values to apply to the copied object.
 * @returns A shallow copy of `obj` with undefined keys populated from `defaults`.
 */
type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export function withDefaults<T extends object>(obj: T, defaults: Partial<T>): T {
  const result = { ...obj } as Mutable<T>;
  for (const key of Object.keys(defaults) as Array<keyof T>) {
    if (result[key] === undefined) {
      const defaultValue = defaults[key];
      if (defaultValue !== undefined) {
        result[key] = defaultValue as Mutable<T>[typeof key];
      }
    }
  }
  return result as T;
}
