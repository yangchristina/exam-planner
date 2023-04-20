import { Dispatch, SetStateAction, useEffect, useState } from "react"

export function useInternalExternalState<Type>(defaultState: Type, state?: Type, setState?: Dispatch<SetStateAction<Type>>, isValidState?: (state: Type) => boolean) {
    const [internalState, setInternalState] = useState<Type>(() => {
        if (isValidState) {
            return (state && isValidState(state)) ? state : defaultState
        }
        return state || defaultState
    }) // if state is invalid, use defaultState

    useEffect(() => {
        if (state !== undefined && state !== internalState && (isValidState ? isValidState(state) : true))
            setInternalState(state)
    }, [state])

    useEffect(() => {
        if (setState && state !== internalState)
            setState(internalState)
    }, [internalState])

    // can you have setState but not state?

    return { internalState, setInternalState }
}
