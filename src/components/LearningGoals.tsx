import React, { useEffect, useRef, useState } from 'react'
import CheckList from './CheckList'
import { CheckCircledIcon, CheckIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { IconBar } from './Course'
import { FullUnit } from '@/types/Unit'
import { useOutsideAlerter } from '@/hooks/useOutsideAlerter'


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
        <div className='px-6 relative py-4 flex-1 overflow-y-auto text-xs' >
            <IconBar>
                <Pencil1Icon ref={outsideAlertOmitRef} className='h-5 w-5 z-50 hover:text-green-700 hover:scale-110'
                    onClick={() => setIsEditing(p => !p)}
                />
            </IconBar>
            {list.length === 0 && !isEditing ? <div className='m-auto absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-gray-400'>
                Click the pencil to add learning goals
            </div> : null}
            {
                isEditing ?
                    <div className='relative w-full h-full'>
                        <textarea ref={outsideAlertRef} defaultValue={storage} className='border w-full h-full resize-none p-2'
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