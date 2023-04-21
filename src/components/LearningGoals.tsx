import React, { useEffect, useRef, useState } from 'react'
import CheckList from './CheckList'
import { CheckCircledIcon, CheckIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { IconBar } from './Course'
import { FullUnit } from '@/types/Unit'
import { useOutsideAlerter } from '@/hooks/useOutsideAlerter'

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

const LearningGoals = ({ unitId, examId, unit, debouncedEdit, setChecked }: {
    unitId: number, examId: string, unit: FullUnit, debouncedEdit: any, setChecked: (id: number, index: number, checked: boolean) => void
}) => {
    // every newline is a new item
    // use a textarea to edit

    const outsideAlertRef = useRef(null);
    const outsideAlertOmitRef = useRef(null);
    useOutsideAlerter(outsideAlertRef, () => setIsEditing(false), [outsideAlertOmitRef]);

    const { storage, list } = unit.learningGoals

    const [isEditing, setIsEditing] = useState(false)
    // const { item: paragraph, set, isLoading } = useForageItem(`${examId}-${unitId}-learningGoals`, (value: unknown) => typeof value === 'string', '')

    useEffect(() => {
        console.log("CHANGED", isEditing)
        console.log()
    }, [isEditing])

    return (
        <div className='px-6 py-4 flex-1 overflow-y-auto text-xs' >
            <IconBar>
                <Pencil1Icon ref={outsideAlertOmitRef} className='h-5 w-5 z-50 hover:text-green-700 hover:scale-110'
                    onClick={() => setIsEditing(p=>!p)}
                />
            </IconBar>
            {isEditing ?
                <div className='relative w-full h-full'>
                    <textarea ref={outsideAlertRef} defaultValue={storage} className='border w-full h-full resize-none p-'
                        onChange={(e) => debouncedEdit(unitId, e.target.value)}
                    />
                    <CheckCircledIcon className='absolute bottom-2 right-2 hover:text-green-600' />
                </div>
                : <CheckList
                    items={list.map(({ text, checked }) => ({ html: <div>{text}</div>, checked }))}
                    handleChecked={async (index, checked) => {
                        // const newList = list.map((item, i) => i === index ? { ...item, checked } : item)
                        setChecked(unitId, index, checked)
                    }}
                />
            }
        </div>
    )
}

export default LearningGoals