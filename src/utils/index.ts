export function deepValue(obj: any, pathv: string) {
    // does not support empty space key
    if (!pathv) return obj;
    const path = pathv.split('.').filter(Boolean);
    for (let i = 0, len = path.length; i < len; i++) {
        if (isInt(path[i]))
            obj = obj[parseInt(path[i])];
        else obj = obj[path[i]];
    };
    return obj;
};

export function isInt(str: string) {
    if (typeof str != "string") return false // we only process strings!
    // @ts-expect-error type coercion
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseInt(str)) // ...and ensure strings of whitespace fail
}

export function pickOneFromEachAll<T>(arr: T[][], result: T[][]) {

    let res: T[] = []
    // Number of arrays
    let n = arr.length;

    // To keep track of next element in
    // each of the n arrays
    let indices = new Array(n);

    // Initialize with first element's index
    for (let i = 0; i < n; i++)
        indices[i] = 0;

    while (true) {
        // Print current combination
        for (let i = 0; i < n; i++)
            res = [...res, arr[i][indices[i]]]
        result.push(res)
        res = []

        // Find the rightmost array that has more
        // elements left after the current element
        // in that array
        let next = n - 1;
        while (next >= 0 && (indices[next] + 1 >=
            arr[next].length))
            next--;

        // No such array is found so no more
        // combinations left
        if (next < 0)
            return;

        // If found move to next element in that
        // array
        indices[next]++;

        // For all arrays to the right of this
        // array current index again points to
        // first element
        for (let i = next + 1; i < n; i++)
            indices[i] = 0;
    }
}

export function nCrAll(n: number, r: number) {
    const arr: number[][] = []

    combinationUtil(arr, [], 0, n - 1, 0, r);

    return arr
}

function combinationUtil(arr: number[][], data: number[], start: number, end: number, index: number, r: number) {
    if (index == r) {
        arr.push([...data])
        return
    }

    for (let i = start; i <= end && end - i + 1 >= r - index; i++) {
        data[index] = i;
        combinationUtil(arr, data, i + 1, end, index + 1, r);
    }
}

// @ts-expect-error
if (import.meta.vitest) {
    // @ts-expect-error
    const { it, expect } = import.meta.vitest
    it('nCrAll', () => {
        //   expect(add()).toBe(0)
        expect(nCrAll(5, 2)).toHaveLength(10)
        expect(nCrAll(5, 1)).toHaveLength(5)
        expect(nCrAll(2, 1)).toHaveLength(2)
        expect(nCrAll(2, 1)).toStrictEqual([[0], [1]])
    })
}


export function makeMatrix<T>(w: number, h: number, val: T): T[][] {
    const arr: T[][] = [];
    for (let i = 0; i < h; i++) {
        arr[i] = [];
        for (let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}

export function makeScheduleMatrix<T>(val: T) {
    return makeMatrix(7, 48, val)
}

export function roundToTenths(num: number) {
    return Math.round(num * 10) / 10
}

export function isString2DArray(x: unknown): x is string[][] {
    if (!Array.isArray(x)) return false
    return x.every((y) => isStringArray(y))
}

export function isNumber2DArray(x: unknown): x is number[][] {
    if (!Array.isArray(x)) return false
    return x.every((y) => isNumberArray(y))
}
export function isStringArray(x: unknown): x is string[] {
    return Array.isArray(x) && x.every((y) => typeof y === 'string')
}

export function isNumberArray(x: unknown): x is number[] {
    return Array.isArray(x) && x.every((y) => typeof y === 'number')
}

export function cloneDeep<T>(val: T) {
    return JSON.parse(JSON.stringify(val)) as T
}

export function sum(arr: number[]) {
    return arr.reduce((a, b) => a + b, 0)
}

export function uniqBy<T>(a: T[], by: (x: T) => any): T[] {
    return a.filter((value, index, array) => array.findIndex((x) => by(value) === by(x)) === index)
}

export function groupBy<T>(arr: T[], key: keyof T) {
    return arr.reduce(function (r, a) {
        r[a[key]] = r[a[key]] || [];
        r[a[key]].push(a);
        return r;
    }, Object.create(null)) as Record<string, T[]>;
}

interface Interval {
    start: number,
    end: number
}
export function isOverlappingInterval(i1: Interval, i2: Interval) { // 13 13
    return (i1.start <= i2.start && i2.start < i1.end) || (i2.start <= i1.start && i1.start < i2.end)
        || (i2.start <= i1.start && i1.end <= i2.end) || (i1.start <= i2.start && i1.end >= i2.end)
}

export function isInInterval(time: number, i: Interval) {
    return i.start <= time && time < i.end
}

export function formatAvailabilities(start: number, end: number): number[] {
    const arr = []
    for (let i = start; i < end; i += 0.5) {
        arr.push(i)
    }
    return arr
}

export function mod(n: number, m: number) { //mod that always gives positive result
    return ((n % m) + m) % m;
}