import localforage from "localforage"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import useForageItem from "./useForageItem"
import { isStringArray } from "@/utils"
import useForageArray from "./useForageArray"
import { editForageObjectArray } from "@/utils/forage"
import { uniqBy } from "lodash"

export type UniqueIdentifier = string | number
export default function useForageIdArray<K, T>(
    key: string,
    isValid: (x: unknown) => boolean,
    isValidKey: (x: unknown) => boolean = isStringArray,
    defaultValue: T,
    keyBy?: keyof K
) {
    const defaultArray: { key: K, value: T }[] = []
    const { items: keys, isLoading: isLoadingKeys, set: setKeyV, add: addKey, remove: removeKeyV, setEntire } = useForageArray<K>(
        key,
        isValidKey,
        []
    )

    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState<{ key: K, value: T }[]>(defaultArray)

    useEffect(() => {
        async function init() {
            if (uniqBy(keys, x => keyBy ? x[keyBy] : x).length !== keys.length) {
                setEntire(uniqBy(keys, x => keyBy ? x[keyBy] : x))
            }
            const items = await Promise.all(keys.map(async (key) => localforage.getItem(((keyBy ? key[keyBy] : key) as number | string).toString())))
            const validItems = items.map(x=>isValid(x) ? x : defaultValue) as T[]
            setItems(validItems.map((x, i) => ({ key: keys[i], value: x })))
            setIsLoading(false)
        }
        if (!isLoadingKeys) init()
    }, [isLoadingKeys, keys])

    function getKeyIndex(id: any) {
        return keys.findIndex(k => (keyBy ? k[keyBy] : k) === id)
    }

    async function setValue(id: any, value: T) {
        if (!isValid(value)) throw new Error("invalid set value")
        const keyIndex = getKeyIndex(id)
        setItems(p => {
            return p.map((x, i) => i === keyIndex ? { ...x, value } : x)
        })
        await localforage.setItem(id.toString(), value)
    }

    async function setKey(id: any, key: K) {
        if (!isValidKey(key)) throw new Error("invalid set value")
        const keyIndex = getKeyIndex(id)
        setKeyV(keyIndex, key)
        setItems(p => {
            return p.map((x, i) => i === keyIndex ? { ...x, key } : x)
        })
    }

    async function removeKey(id: any) {
        const keyIndex = getKeyIndex(id)
        removeKeyV(keyIndex)
    }

    return {
        isLoading: isLoading && isLoadingKeys,
        item: items,
        setValue,
        setKey,
        addKey,
        removeKey
    }
}