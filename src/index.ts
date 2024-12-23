// 1. Single key, default array
export function pluck<T, K extends keyof T>(
  data: Array<T>,
  keys: K,
  option?: {
    formatter?: undefined;
    joiner?: undefined;
    unique?: boolean;
    mode?: undefined;
    nonEmpty?: false | undefined;
  },
): Array<T[K]>;

// 2. Single key, default non-empty array
export function pluck<T, K extends keyof T>(
  data: Array<T>,
  keys: K,
  option: {
    formatter?: undefined;
    joiner?: undefined;
    unique?: boolean;
    mode?: undefined;
    nonEmpty: true;
  },
): Array<NonNullable<T[K]>>;

// 3. Single key, formatted array
export function pluck<T, K extends keyof T, F extends (value: T[K], key: K) => unknown>(
  data: Array<T>,
  keys: K,
  option: {
    formatter: F;
    joiner?: undefined;
    unique?: boolean;
    mode?: undefined;
    nonEmpty?: false | undefined;
  },
): Array<ReturnType<F>>;

// 4. Single key, formatted non-empty array
export function pluck<
  T,
  K extends keyof T,
  F extends (value: NonNullable<T[K]>, key: K) => unknown,
>(
  data: Array<T>,
  keys: K,
  option: {
    formatter: F;
    joiner?: undefined;
    unique?: boolean;
    mode?: undefined;
    nonEmpty: true;
  },
): Array<ReturnType<F>>;

// 5. Single key, default/formatted joined string
export function pluck<T, K extends keyof T, F extends ((value: T[K]) => unknown) | undefined>(
  data: Array<T>,
  keys: K,
  option: {
    formatter?: F;
    joiner: string;
    unique?: boolean;
    mode?: undefined;
    nonEmpty?: false | undefined;
  },
): string;

// 6. Single key, default/formatted joined non-empty string
export function pluck<
  T,
  K extends keyof T,
  F extends ((value: NonNullable<T[K]>, key: K) => unknown) | undefined,
>(
  data: Array<T>,
  keys: K,
  option: {
    formatter?: F;
    joiner: string;
    unique?: boolean;
    mode?: undefined;
    nonEmpty: true;
  },
): string;

// 7. Multiple keys, default array of object
export function pluck<T, K extends keyof T>(
  data: Array<T>,
  keys: Array<K>,
): Array<{ [key in K]: T[key] }>;

// 8. Multiple keys, default non-empty array of object
export function pluck<T, K extends keyof T>(
  data: Array<T>,
  keys: Array<K>,
  option: {
    formatter?: undefined;
    joiner?: undefined;
    unique?: boolean;
    mode?: undefined;
    nonEmpty: true;
  },
): Array<{ [key in K]: NonNullable<T[key]> }>;

// 9. Multiple keys, formatted array of object
export function pluck<T, K extends keyof T, F extends (value: T[K], key: K) => unknown>(
  data: Array<T>,
  keys: Array<K>,
  option: {
    formatter: F;
    joiner?: undefined;
    unique?: boolean;
    mode?: undefined;
    nonEmpty?: false | undefined;
  },
): Array<{ [key in K]: ReturnType<F> }>;

// 10. Multiple keys, formatted non-empty array of object
export function pluck<
  T,
  K extends keyof T,
  F extends (value: NonNullable<T[K]>, key: K) => unknown,
>(
  data: Array<T>,
  keys: Array<K>,
  option: {
    formatter: F;
    joiner?: undefined;
    unique?: boolean;
    mode?: undefined;
    nonEmpty: true;
  },
): Array<{ [key in K]: ReturnType<F> }>;

// 11. Multiple keys, default with field-array mode
export function pluck<T, K extends keyof T>(
  data: Array<T>,
  keys: Array<K>,
  option: {
    formatter?: undefined;
    joiner?: undefined;
    unique?: boolean;
    mode: 'field-array';
    nonEmpty?: false | undefined;
  },
): { [key in K]: Array<T[key]> };

// 12. Multiple keys, default non-empty with field-array mode
export function pluck<T, K extends keyof T>(
  data: Array<T>,
  keys: Array<K>,
  option: {
    formatter?: undefined;
    joiner?: undefined;
    unique?: boolean;
    mode: 'field-array';
    nonEmpty: true;
  },
): { [key in K]: Array<NonNullable<T[key]>> };

// 13. Multiple keys, formatted with field-array mode
export function pluck<T, K extends keyof T, F extends (value: T[K], key: K) => unknown>(
  data: Array<T>,
  keys: Array<K>,
  option: {
    formatter: F;
    joiner?: undefined;
    unique?: boolean;
    mode: 'field-array';
    nonEmpty?: false | undefined;
  },
): { [key in K]: Array<ReturnType<F>> };

// 14. Multiple keys, formatted non-empty with field-array mode
export function pluck<
  T,
  K extends keyof T,
  F extends (value: NonNullable<T[K]>, key: K) => unknown,
>(
  data: Array<T>,
  keys: Array<K>,
  option: {
    formatter: F;
    joiner?: undefined;
    unique?: boolean;
    mode: 'field-array';
    nonEmpty: true;
  },
): { [key in K]: Array<ReturnType<F>> };

// 15. Multiple keys, formatted and joined with field-array mode
export function pluck<T, K extends keyof T, F extends (value: T[K], key: K) => unknown>(
  data: Array<T>,
  keys: Array<K>,
  option: {
    formatter?: F;
    joiner: string;
    unique?: boolean;
    mode: 'field-array';
    nonEmpty?: false | undefined;
  },
): { [key in K]: string };

// 16. Multiple keys, formatted and joined non-empty with field-array mode
export function pluck<
  T,
  K extends keyof T,
  F extends (value: NonNullable<T[K]>, key: K) => unknown,
>(
  data: Array<T>,
  keys: Array<K>,
  option: {
    formatter?: F;
    joiner: string;
    unique?: boolean;
    mode: 'field-array';
    nonEmpty: true;
  },
): { [key in K]: string };

// 17. Multiple keys, default with nested-array mode
export function pluck<T, K extends keyof T, KS extends Array<K>>(
  data: Array<T>,
  keys: [...KS],
  option: {
    formatter?: undefined;
    joiner?: undefined;
    unique?: boolean;
    mode: 'nested-array';
    nonEmpty?: false | undefined;
  },
): { [P in keyof KS]: Array<T[KS[P]]> };

// 18. Multiple keys, default non-empty with nested-array mode
export function pluck<T, K extends keyof T, KS extends Array<K>>(
  data: Array<T>,
  keys: [...KS],
  option: {
    formatter?: undefined;
    joiner?: undefined;
    unique?: boolean;
    mode: 'nested-array';
    nonEmpty: true;
  },
): { [P in keyof KS]: Array<NonNullable<T[KS[P]]>> };

// 19. Multiple keys, formatted with nested-array mode
export function pluck<
  T,
  K extends keyof T,
  KS extends Array<K>,
  F extends (value: T[K], key: K) => unknown,
>(
  data: Array<T>,
  keys: Array<K>,
  option: {
    formatter: F;
    joiner?: undefined;
    unique?: boolean;
    mode: 'nested-array';
    nonEmpty?: false | undefined;
  },
): { [P in keyof KS]: Array<ReturnType<F>> };

// 20. Multiple keys, formatted non-empty with nested-array mode
export function pluck<
  T,
  K extends keyof T,
  KS extends Array<K>,
  F extends (value: NonNullable<T[K]>, key: K) => unknown,
>(
  data: Array<T>,
  keys: Array<K>,
  option: {
    formatter: F;
    joiner?: undefined;
    unique?: boolean;
    mode: 'nested-array';
    nonEmpty: true;
  },
): { [P in keyof KS]: Array<ReturnType<F>> };

// 21. Multiple keys, formatted and joined with nested-array mode
export function pluck<
  T,
  K extends keyof T,
  KS extends Array<K>,
  F extends (value: T[K], key: K) => unknown,
>(
  data: Array<T>,
  keys: Array<K>,
  option: {
    formatter?: F;
    joiner: string;
    unique?: boolean;
    mode: 'nested-array';
    nonEmpty?: false | undefined;
  },
): { [P in keyof KS]: string };

// 22. Multiple keys, formatted and joined non-empty with nested-array mode
export function pluck<
  T,
  K extends keyof T,
  KS extends Array<K>,
  F extends (value: NonNullable<T[K]>, key: K) => unknown,
>(
  data: Array<T>,
  keys: Array<K>,
  option: {
    formatter?: F;
    joiner: string;
    unique?: boolean;
    mode: 'nested-array';
    nonEmpty: true;
  },
): { [P in keyof KS]: string };

// Function implementation
export function pluck<
  T,
  K extends keyof T,
  KS extends Array<K>,
  F extends ((value: T[K] | NonNullable<T[K]>, key: K) => unknown) | undefined,
>(
  data: Array<T>,
  keys: K | Array<K> | [...KS],
  option?: {
    formatter?: F;
    joiner?: string;
    unique?: boolean;
    mode?: 'field-array' | 'nested-array';
    nonEmpty?: boolean;
  },
) {
  const result: any = option?.mode === 'field-array' ? {} : [];
  const multipleKeys = Array.isArray(keys);

  const formatValue = (value: T[K], key: K) => {
    if (option?.formatter) return option.formatter(value, key);
    return value;
  };

  const validateValue = (item: T[K]) =>
    !option?.nonEmpty || (option?.nonEmpty && item !== null && item !== undefined);

  const pushToList = (list: any[], item: T[K], key: K) => {
    if (option?.unique && list.includes(item)) return;
    if (!validateValue(item)) return;

    list.push(formatValue(item, key));
  };

  if (option?.mode === 'nested-array' && multipleKeys)
    (keys as Array<K>).forEach((key) => {
      const temp: any[] = [];
      data.forEach((item) => pushToList(temp, item[key], key));
      result.push(temp);
    });
  else {
    data.forEach((item) => {
      if (!multipleKeys)
        return pushToList(result as (T[K] | ReturnType<NonNullable<F>>)[], item[keys], keys);

      if (!Array.isArray(result)) {
        if (option?.mode === 'field-array')
          (keys as Array<K>).forEach((rawKey) => {
            const key = rawKey as keyof typeof result;
            result[key] = result[key] ?? [];
            pushToList(result[key], item[rawKey], rawKey);
          });
        return;
      }

      const temp = {} as Record<K, any>;
      (keys as Array<K>).forEach((key) => {
        if (validateValue(item[key])) temp[key] = formatValue(item[key], key);
      });
      result.push(temp);
    });
  }

  if (!option?.joiner) return result;

  if (option.mode === 'nested-array' && Array.isArray(result))
    return result.map((r) => r.join(option.joiner));

  if (option.mode === 'field-array' && !Array.isArray(result)) {
    Object.keys(result).forEach((key) => (result[key] = result[key].join(option.joiner)));
    return result;
  }

  return result.join(option.joiner);
}
