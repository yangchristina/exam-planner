import localforage from "localforage"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export default function useForageItem<T>(
    key: string,
    isValid: (x: unknown) => boolean,
    defaultValue: T
) {
    const [isLoading, setIsLoading] = useState(true)
    const [item, setItem] = useState(defaultValue)

    useEffect(() => {
        async function init() {
            const item = await localforage.getItem(key)
            if (isValid(item)) setItem(item as T)
            setIsLoading(false)
        }
        init()
    }, [])

    async function set(value: T) {
        if (!isValid(value)) throw new Error("invalid set value")
        setItem(value)
        await localforage.setItem(key, value)
    }

    return {
        isLoading,
        item,
        set
    }
}