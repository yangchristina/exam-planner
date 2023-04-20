import React, { useCallback, useEffect, useState } from 'react'
import CheckList from './CheckList'
import useForageItem from '@/hooks/useForageItem'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconBar } from './Course'
import { debounce } from 'lodash'

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

const LearningGoals = ({ unitId }: { unitId: number }) => {
    // every newline is a new item
    // use a textarea to edit

    const [isEditing, setIsEditing] = useState(false)
    const { item: paragraph, set, isLoading } = useForageItem(unitId + 'learningGoals', (value: unknown) => typeof value === 'string', '')

    const [list, setList] = useState(storageToList(paragraph))
    const storage = listToStorage(list)

    const debouncedEdit = useCallback(debounce(async(para: string) => {
        setList(storageToList(para))
        await set(listToStorage(storageToList(para)))
    }, 500), [])

    useEffect(()=>{
        setList(storageToList(paragraph))
    }, [isLoading])

    return (
        <div className='p-5 flex-1 overflow-y-auto text-xs' >
            <IconBar>
                <Pencil1Icon className='h-5 w-5 z-10' onClick={() => setIsEditing(p => !p)} />
            </IconBar>
            {isEditing ?
                <textarea defaultValue={storage} className='border w-full h-full'
                    onChange={(e) => debouncedEdit(e.target.value)}
                />
                : <CheckList
                    items={list.map(({ text, checked }) => ({ html: <div>{text}</div>, checked }))}
                    handleChecked={console.log}
                />
            }
        </div>
    )
}

export default LearningGoals