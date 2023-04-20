import { FullUnit, Unit, isUnit } from '@/types/Unit'
import useForageIdArray from './useForageIdArray'
import { useCallback, useMemo, useState } from 'react'
import { debounce } from 'lodash'

export default function useUnits(examId: string) {
    const { item: keyValueItems, setValue: setLearningGoals,
        setKey: setUnit, isLoading, addKey: addUnit,
        removeKey: removeUnit,
    } = useForageIdArray<Unit, string>(
        `${examId}-units`,
        (value: unknown) => typeof value === 'string',
        isUnit,
        '',
        'id'
    )

    const unitMap: Record<number, FullUnit> = useMemo(() => {
        const map = keyValueItems.reduce((acc, { key, value }) => {
            const list = storageToList(value)
            return {
                ...acc, [key.id]: {
                    ...key, learningGoals: {
                        list,
                        storage: value,
                        progress: list.filter(({ checked }) => checked).length / list.length,
                    }
                }
            };
        }, {});
        return map
    }, [keyValueItems, isLoading])

    const unitAverageProgress = Object.values(unitMap).length > 0 ? Object.values(unitMap).reduce(
        (acc, { learningGoals: { progress } }) => acc + progress, 0
    ) / Object.values(unitMap).length : null

    const debouncedEditLearningGoals = useCallback(debounce(async (unitId: number, para: string) => {
        const list = storageToList(para)
        const storage = listToStorage(list)
        unitMap[unitId].learningGoals = { storage, list, progress: list.filter(({ checked }) => checked).length / list.length, }
        console.log("stro CALLLED", storage)
        setLearningGoals(unitId, storage)
    }, 500), [keyValueItems])

    function setChecked(id: number, index: number, checked: boolean) {
        const list = unitMap[id].learningGoals.list
        list[index].checked = checked
        const storage = listToStorage(list)
        console.log("CHECKED CALLLED", storage)
        setLearningGoals(id, storage)
        // unitMap[id].learningGoals = { storage, list, progress: list.filter(({ checked }) => checked).length / list.length, }
    }

    return {
        unitMap,
        debouncedEditLearningGoals,
        isLoading,
        addUnit,
        removeUnit,
        unitProgress: {},
        unitAverageProgress,
        setChecked,
    }
}

function storageToList(para: string) {
    return para.split("\n").filter(Boolean).map((item) => {
        const numStr = item.trim().slice(0, 2).trim()
        let text = item.trim().slice(2).trim()
        let num = numStr === '1.' ? 1 : numStr === '0.' ? 0 : null
        if (num === null) {
            num = 0
            text = item.trim()
        }
        return { checked: num === 1, text }
    })
}

function listToStorage(list: { checked: boolean, text: string }[]) {
    return list.map(({ checked, text }) => `${checked ? '1.' : '0.'} ${text}`).join("\n")
}
