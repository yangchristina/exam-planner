import localforage from "localforage"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import useForageItem from "./useForageItem"
import { isStringArray } from "@/utils"
import useForageArray from "./useForageArray"
import { editForageObjectArray } from "@/utils/forage"

export type UniqueIdentifier = string | number
export default function useForageIdArray<K, T>(
    key: string,
    isValid: (x: unknown) => boolean,
    isValidKey: (x: unknown) => boolean = isStringArray,
    defaultValue: T,
    keyBy?: keyof K
) {
    const defaultArray: { key: K, value: T }[] = []
    const { items: keys, isLoading: isLoadingKeys, set: setKeyV, add: addKey, remove: removeKeyV } = useForageArray<K>(
        key,
        isValidKey,
        []
    )

    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState<{ key: K, value: T }[]>(defaultArray)

    useEffect(() => {
        async function init() {
            const items = await Promise.all(keys.map(async (key) => localforage.getItem(((keyBy ? key[keyBy] : key) as number | string).toString())))
            const validItems = items.map(x=>isValid(x) ? x : defaultValue) as T[]
            setItems(validItems.map((x, i) => ({ key: keys[i], value: x })))
            setIsLoading(false)
            console.log("in init", {items, validItems, keys})
        }
        if (!isLoadingKeys) init()
    }, [isLoadingKeys, keys])

    function getKeyIndex(id: any) {
        return keys.findIndex(k => (keyBy ? k[keyBy] : k) === id)
    }

    async function setValue(id: any, value: T) {
        console.log("IN SET VALUE", id, value)
        if (!isValid(value)) throw new Error("invalid set value")
        const keyIndex = getKeyIndex(id)
        setItems(p => {
            console.log("P", p)
            console.log("P after", p.map((x, i) => i === keyIndex ? { ...x, value } : x))
            return p.map((x, i) => i === keyIndex ? { ...x, value } : x)
        })
        await localforage.setItem(id.toString(), value)
        console.log("IN SET VALUE DONE", id, value)
        console.log(await localforage.getItem(id))
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