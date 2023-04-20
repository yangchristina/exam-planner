import localforage from "localforage"
import { uniqBy } from "lodash"


export async function editForageObjectArray<T>(key: string, newItem: T, isValid: (x: unknown)=> boolean, keyBy: keyof T) {
    let data = await localforage.getItem(key)
    let exams: T[] = Array.isArray(data) ? data.filter(isValid) as T[] : []
    const index = uniqBy(exams, (x) => x[keyBy]).findIndex(x => x[keyBy] === newItem[keyBy])
    if (-1 !== index) {
        exams[index] = newItem
    } else {
        exams = [...exams, newItem]
    }
    localforage.setItem(key, exams)
}