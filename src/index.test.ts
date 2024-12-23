import { pluck } from './index';
import { deepStrictEqual } from 'node:assert';
import { describe, it } from 'node:test';

// Source Data
const data = [
  {
    name: 'Tanya',
    age: 24,
    address: undefined,
  },
  {
    name: 'Dewi',
    age: 13,
    address: 'Sumatra 31C',
  },
  {
    name: 'Indah',
    age: 42,
    address: null,
  },
  {
    name: 'Sonya',
    age: 22,
    address: 'Raya Menur',
  },
];

// Expected Single Key Data
const singleKeyMap = <T extends string | null | undefined>(val: T) => `Address: ${val}`;
const singleKeyArray = data.map((item) => item.address);
const singleKeyNonEmptyArray = singleKeyArray.filter((val) => val !== null && val !== undefined);
const singleKeyFormattedArray = singleKeyArray.map(singleKeyMap);
const singleKeyFormattedNonEmptyArray = singleKeyNonEmptyArray.map(singleKeyMap);
const singleKeyJoined = singleKeyArray.join(', ');
const singleKeyNonEmptyJoined = singleKeyNonEmptyArray.join(', ');
const singleKeyFormattedJoined = singleKeyFormattedArray.join(', ');
const singleKeyFormattedNonEmptyJoined = singleKeyFormattedNonEmptyArray.join(', ');

// Expected Default Multiple Key Data
const multipleKeyArray = data.map(({ address, age }) => ({ address, age }));
const multipleKeyNonEmptyArray = data.map(({ address, age }) =>
  address === null || address === undefined ? { age } : { address, age },
);
const multipleKeyFormattedArray = data.map(({ address, age }) => ({
  address: 'Jl. ' + address,
  age: 'Umur: ' + age,
}));
const multipleKeyFormattedNonEmptyArray = data.map(({ address, age }) =>
  address === null || address === undefined
    ? { age: 'Umur: ' + age }
    : {
        address: 'Jl. ' + address,
        age: 'Umur: ' + age,
      },
);

// Expected Multiple Key with Field-Array Mode Data
type FieldArrayData<T extends string | null | undefined = string | null | undefined> = {
  address: T[];
  age: number[];
};
type FormattedFieldArrayData = {
  address: string[];
  age: string[];
};

const multipleKeyFieldArray = data.reduce(
  (prev, curr) => ({
    address: [...prev.address, curr.address],
    age: [...prev.age, curr.age],
  }),
  { address: [], age: [] } as FieldArrayData,
);
const multipleKeyNonEmptyFieldArray = data.reduce(
  (prev, curr) => {
    prev.age.push(curr.age);
    if (curr.address !== null && curr.address !== undefined) prev.address.push(curr.address);

    return prev;
  },
  { address: [], age: [] } as FieldArrayData<string>,
);
const multipleKeyFormattedFieldArray = data.reduce(
  (prev, curr) => ({
    address: [...prev.address, 'Jl. ' + curr.address],
    age: [...prev.age, 'Umur: ' + curr.age],
  }),
  { address: [], age: [] } as FormattedFieldArrayData,
);
const multipleKeyFormattedNonEmptyFieldArray = data.reduce(
  (prev, curr) => {
    prev.age.push('Umur: ' + curr.age);
    if (curr.address !== null && curr.address !== undefined)
      prev.address.push('Jl. ' + curr.address);

    return prev;
  },
  { address: [], age: [] } as FormattedFieldArrayData,
);
const multipleKeyJoinedFieldArray = {
  address: multipleKeyFieldArray.address.join(', '),
  age: multipleKeyFieldArray.age.join(', '),
};
const multipleKeyNonEmptyJoinedFieldArray = {
  address: multipleKeyNonEmptyFieldArray.address.join(', '),
  age: multipleKeyNonEmptyFieldArray.age.join(', '),
};
const multipleKeyFormattedJoinedFieldArray = {
  address: multipleKeyFormattedFieldArray.address.join(', '),
  age: multipleKeyFormattedFieldArray.age.join(', '),
};
const multipleKeyFormattedNonEmptyJoinedFieldArray = {
  address: multipleKeyFormattedNonEmptyFieldArray.address.join(', '),
  age: multipleKeyFormattedNonEmptyFieldArray.age.join(', '),
};

// Expected Multiple Key with Nested-Array Mode Data
type NestedArrayData<T extends string | null | undefined = string | null | undefined> = [
  T[],
  number[],
];
type FormattedNestedArrayData = [string[], string[]];

const multipleKeyNestedArray = data.reduce(
  (prev, curr) =>
    [
      [...prev[0], curr.address],
      [...prev[1], curr.age],
    ] as NestedArrayData,
  [[], []] as NestedArrayData,
);
const multipleKeyNonEmptyNestedArray = data.reduce(
  (prev, curr) => {
    prev[1].push(curr.age);
    if (curr.address !== null && curr.address !== undefined) prev[0].push(curr.address);

    return prev;
  },
  [[], []] as NestedArrayData,
);
const multipleKeyFormattedNestedArray = data.reduce(
  (prev, curr) =>
    [
      [...prev[0], 'Jl. ' + curr.address],
      [...prev[1], 'Umur: ' + curr.age],
    ] as FormattedNestedArrayData,
  [[], []] as FormattedNestedArrayData,
);
const multipleKeyFormattedNonEmptyNestedArray = data.reduce(
  (prev, curr) => {
    prev[1].push('Umur: ' + curr.age);
    if (curr.address !== null && curr.address !== undefined) prev[0].push('Jl. ' + curr.address);

    return prev;
  },
  [[], []] as FormattedNestedArrayData,
);
const multipleKeyJoinedNestedArray = [
  multipleKeyNestedArray[0].join(', '),
  multipleKeyNestedArray[1].join(', '),
];
const multipleKeyNonEmptyJoinedNestedArray = [
  multipleKeyNonEmptyNestedArray[0].join(', '),
  multipleKeyNonEmptyNestedArray[1].join(', '),
];
const multipleKeyFormattedJoinedNestedArray = [
  multipleKeyFormattedNestedArray[0].join(', '),
  multipleKeyFormattedNestedArray[1].join(', '),
];
const multipleKeyFormattedNonEmptyJoinedNestedArray = [
  multipleKeyFormattedNonEmptyNestedArray[0].join(', '),
  multipleKeyFormattedNonEmptyNestedArray[1].join(', '),
];

describe('Single Key Pluck', () => {
  it('1. should return as list of addresses ((string | null | undefined)[])', () => {
    const plucked = pluck(data, 'address');
    deepStrictEqual(plucked, singleKeyArray);
  });

  it('2. should return as list of non-empty addresses (string[])', () => {
    const plucked = pluck(data, 'address', { nonEmpty: true });
    deepStrictEqual(plucked, singleKeyNonEmptyArray);
  });

  it('3. should return as list of formatted addresses (string[])', () => {
    const plucked = pluck(data, 'address', {
      formatter: (val) => `Address: ${val}`,
    });
    deepStrictEqual(plucked, singleKeyFormattedArray);
  });

  it('4. should return as list of formatted non-empty addresses (string[])', () => {
    const plucked = pluck(data, 'address', {
      nonEmpty: true,
      formatter: (val) => `Address: ${val}`,
    });
    deepStrictEqual(plucked, singleKeyFormattedNonEmptyArray);
  });

  it('5. should return as joined addresses (string)', () => {
    const plucked = pluck(data, 'address', { joiner: ', ' });
    deepStrictEqual(plucked, singleKeyJoined);
  });

  it('6.1. should return as joined non-empty addresses (string)', () => {
    const plucked = pluck(data, 'address', {
      joiner: ', ',
      nonEmpty: true,
    });
    deepStrictEqual(plucked, singleKeyNonEmptyJoined);
  });

  it('6.2. should return as joined formatted addresses (string)', () => {
    const plucked = pluck(data, 'address', {
      joiner: ', ',
      formatter: (val) => `Address: ${val}`,
    });
    deepStrictEqual(plucked, singleKeyFormattedJoined);
  });

  it('6.3. should return as joined formatted non-empty addresses (string)', () => {
    const plucked = pluck(data, 'address', {
      joiner: ', ',
      nonEmpty: true,
      formatter: (val) => `Address: ${val}`,
    });
    deepStrictEqual(plucked, singleKeyFormattedNonEmptyJoined);
  });
});

describe('Default Multiple Keys Pluck', () => {
  it('7. should return as list of addresses and ages ({address: string | null | undefined, age: number}[])', () => {
    const plucked = pluck(data, ['address', 'age']);
    deepStrictEqual(plucked, multipleKeyArray);
  });

  it('8. should return as list of non-empty addresses and ages ({address: string, age: number}[])', () => {
    const plucked = pluck(data, ['address', 'age'], { nonEmpty: true });
    deepStrictEqual(plucked, multipleKeyNonEmptyArray);
  });

  it('9. should return as list of formatted addresses and ages ({address: string, age: string}[])', () => {
    const plucked = pluck(data, ['address', 'age'], {
      formatter: (val, key) => (key === 'address' ? `Jl. ${val}` : `Umur: ${val}`),
    });
    deepStrictEqual(plucked, multipleKeyFormattedArray);
  });

  it('10. should return as list of formatted non-empty addresses and ages ({address: string, age: string}[])', () => {
    const plucked = pluck(data, ['address', 'age'], {
      nonEmpty: true,
      formatter: (val, key) => (key === 'address' ? `Jl. ${val}` : `Umur: ${val}`),
    });
    deepStrictEqual(plucked, multipleKeyFormattedNonEmptyArray);
  });
});

describe('Field-Array Multiple Keys Pluck', () => {
  it('11. should return as object of array of addresses and ages ({address: (string | null | undefined)[], age: number[]})', () => {
    const plucked = pluck(data, ['address', 'age'], {
      mode: 'field-array',
    });
    deepStrictEqual(plucked, multipleKeyFieldArray);
  });

  it('12. should return as object of array of non-empty addresses and ages ({address: string[], age: number[]})', () => {
    const plucked = pluck(data, ['address', 'age'], {
      nonEmpty: true,
      mode: 'field-array',
    });
    deepStrictEqual(plucked, multipleKeyNonEmptyFieldArray);
  });

  it('13. should return as object of array of formatted addresses and ages ({address: string[], age: string[]})', () => {
    const plucked = pluck(data, ['address', 'age'], {
      mode: 'field-array',
      formatter: (val, key) => (key === 'address' ? `Jl. ${val}` : `Umur: ${val}`),
    });
    deepStrictEqual(plucked, multipleKeyFormattedFieldArray);
  });

  it('14. should return as object of array of formatted non-empty addresses and ages ({address: string[], age: string[]})', () => {
    const plucked = pluck(data, ['address', 'age'], {
      nonEmpty: true,
      mode: 'field-array',
      formatter: (val, key) => (key === 'address' ? `Jl. ${val}` : `Umur: ${val}`),
    });
    deepStrictEqual(plucked, multipleKeyFormattedNonEmptyFieldArray);
  });

  it('15.1 should return as object of joined addresses and ages ({address: string, age: string})', () => {
    const plucked = pluck(data, ['address', 'age'], {
      joiner: ', ',
      mode: 'field-array',
    });
    deepStrictEqual(plucked, multipleKeyJoinedFieldArray);
  });

  it('15.2 should return as object of joined of formatted addresses and ages ({address: string, age: string})', () => {
    const plucked = pluck(data, ['address', 'age'], {
      joiner: ', ',
      mode: 'field-array',
      formatter: (val, key) => (key === 'address' ? `Jl. ${val}` : `Umur: ${val}`),
    });
    deepStrictEqual(plucked, multipleKeyFormattedJoinedFieldArray);
  });

  it('16.1 should return as object of joined non-empty addresses and ages ({address: string, age: string})', () => {
    const plucked = pluck(data, ['address', 'age'], {
      joiner: ', ',
      nonEmpty: true,
      mode: 'field-array',
    });
    deepStrictEqual(plucked, multipleKeyNonEmptyJoinedFieldArray);
  });

  it('16.1 should return as object of joined of formatted non-empty addresses and ages ({address: string, age: string})', () => {
    const plucked = pluck(data, ['address', 'age'], {
      joiner: ', ',
      nonEmpty: true,
      mode: 'field-array',
      formatter: (val, key) => (key === 'address' ? `Jl. ${val}` : `Umur: ${val}`),
    });
    deepStrictEqual(plucked, multipleKeyFormattedNonEmptyJoinedFieldArray);
  });
});

describe('Nested-Array Multiple Keys Pluck', () => {
  it('17. should return as object of array of addresses and ages ([(string | null | undefined)[], number[]])', () => {
    const plucked = pluck(data, ['address', 'age'], {
      mode: 'nested-array',
    });
    deepStrictEqual(plucked, multipleKeyNestedArray);
  });

  it('18. should return as object of array of non-empty addresses and ages ([string[], number[]])', () => {
    const plucked = pluck(data, ['address', 'age'], {
      nonEmpty: true,
      mode: 'nested-array',
    });
    deepStrictEqual(plucked, multipleKeyNonEmptyNestedArray);
  });

  it('19. should return as object of array of formatted addresses and ages ([string[], string[]])', () => {
    const plucked = pluck(data, ['address', 'age'], {
      mode: 'nested-array',
      formatter: (val, key) => (key === 'address' ? `Jl. ${val}` : `Umur: ${val}`),
    });
    deepStrictEqual(plucked, multipleKeyFormattedNestedArray);
  });

  it('20. should return as object of array of formatted non-empty addresses and ages ([string[], string[]])', () => {
    const plucked = pluck(data, ['address', 'age'], {
      nonEmpty: true,
      mode: 'nested-array',
      formatter: (val, key) => (key === 'address' ? `Jl. ${val}` : `Umur: ${val}`),
    });
    deepStrictEqual(plucked, multipleKeyFormattedNonEmptyNestedArray);
  });

  it('21.1 should return as object of joined addresses and ages ([string, string])', () => {
    const plucked = pluck(data, ['address', 'age'], {
      joiner: ', ',
      mode: 'nested-array',
    });
    deepStrictEqual(plucked, multipleKeyJoinedNestedArray);
  });

  it('21.2 should return as object of joined of formatted addresses and ages ([string, string])', () => {
    const plucked = pluck(data, ['address', 'age'], {
      joiner: ', ',
      mode: 'nested-array',
      formatter: (val, key) => (key === 'address' ? `Jl. ${val}` : `Umur: ${val}`),
    });
    deepStrictEqual(plucked, multipleKeyFormattedJoinedNestedArray);
  });

  it('22.1 should return as object of joined non-empty addresses and ages ([string, string])', () => {
    const plucked = pluck(data, ['address', 'age'], {
      joiner: ', ',
      nonEmpty: true,
      mode: 'nested-array',
    });
    deepStrictEqual(plucked, multipleKeyNonEmptyJoinedNestedArray);
  });

  it('22.2 should return as object of joined of formatted non-empty addresses and ages ([string, string])', () => {
    const plucked = pluck(data, ['address', 'age'], {
      joiner: ', ',
      nonEmpty: true,
      mode: 'nested-array',
      formatter: (val, key) => (key === 'address' ? `Jl. ${val}` : `Umur: ${val}`),
    });
    deepStrictEqual(plucked, multipleKeyFormattedNonEmptyJoinedNestedArray);
  });
});
