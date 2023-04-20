import { cloneDeep } from "lodash"

export function generateNumberId(): number {
    return new Date().valueOf();
}

export function fitMinSize<T>(array: T[], minSize: number, empty: T, keyBy?: keyof T) {
    const cur = cloneDeep(array)
    const toAdd = minSize - cur.length
    if (toAdd > 0) {
        for (let i = 0; i < toAdd; i++)
            cur.push({ ...empty })
    }

    if (keyBy && cur[cur.length - 1][keyBy]) {
        cur.push({ ...empty })
    }
    return cur
}

export function handleAutoFieldArray(arr: any[], type: string | undefined, minSize: number, empty: Record<string, any>,
    append: any, remove: any,
    removeCond: (x: any) => boolean,
    appendCond: (x: any) => boolean
) {
    if (arr.length < minSize) append({ ...empty }, { shouldFocus: false })
    else if (type == 'change') {
        const toRemove = []
        for (let i = minSize - 1; i < arr.length - 1; i++)
            if (removeCond(arr[i])) toRemove.push(i) // !arr[i]?.name
        if (appendCond(arr.at(-1))) append({ ...empty }, { shouldFocus: false }) // arr.at(-1)?.name
        if (toRemove.length > 0) remove(toRemove)
    }
}
