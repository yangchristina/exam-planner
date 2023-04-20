import { isStringArray } from "@/utils"
import localforage from "localforage"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

/**
 * each item in the array gets its own key
 * @param groupKey
 * @param isValid
 * @returns
 */
export default function useForageSortedArray<T>(
    groupKey: string,
    isValid: (x: unknown) => boolean,
    defaultArray: T[] = []
) {
    const [isLoading, setIsLoading] = useState(true)
    const [order, setOrder] = useState<string[]>([])
    const [itemMap, setItemMap] = useState<Record<string, T>>({})

    async function reset() {
        const curOrder = [...order]
        setOrder([])
        setItemMap({})
        const promises = curOrder.map(x => localforage.removeItem(groupKey + '-' + x))
        promises.push(localforage.removeItem(groupKey + '-order'))
        await Promise.all(promises) 
        await Promise.all(defaultArray.map(x => add(x))) // needs to wait for previous await to finish
        return curOrder
    }

    useEffect(() => {
        async function init() {
            let order: string[] | null = await localforage.getItem(groupKey + '-order')            
            if (!isStringArray(order)) {
                // order should be [] here, since default
                order = await reset();
            } else {
                setOrder(order)
            }
            for (const key of order) {
                const item = await localforage.getItem(groupKey + '-' + key)
                if (!isValid(item)) {
                    console.log(item)
                    remove(key)
                    // throw new Error("invalid item")
                }

                setItemMap(prev => ({ ...prev, [key]: item as T }))
            }
            setIsLoading(false)
        }
        init()
    }, [])

    async function reorder(newOrder: string[]) {
        if (!newOrder.every(x => typeof x === 'string'))
            throw new Error("invalid order")
        setOrder(newOrder)
        await localforage.setItem(groupKey + '-order', newOrder)
    }

    async function set(key: string, value: T) {
        if (!isValid(value)) throw new Error("invalid set value")
        setItemMap(p => ({ ...p, [key]: value }))
        await localforage.setItem(groupKey + '-' + key, value)
    }

    async function add(val: T) {
        const key = Math.random().toString(36).substring(2, 11)
        await Promise.all([set(key, val), reorder([...order, key])])
    }

    async function remove(key: string) {
        setItemMap(p => {
            const { [key]: _, ...rest } = p
            return rest
        })
        reorder(order.filter(x => x !== key))
        await localforage.removeItem(groupKey + '-' + key)
    }

    return {
        isLoading,
        order,
        itemMap,
        set,
        reorder,
        reset,
        add, 
        remove,
        items: order?.map(x => itemMap[x]) || []
    }
}