import React from 'react'
import UnitButton, { AddUnitButton } from './UnitButton'
import useForageArray from '@/hooks/useForageArray'
import { isNumber } from 'lodash'
import { Unit, isUnit } from '@/types/Unit'

function getColorNum(i: number) {
    return (i % 4 === 0 || (i-3) % 4 === 0) ? 1 : 0
}
// TODO: Allow Delete Unit
const CourseUnitNav = ({ setMode, examId }: { setMode: React.Dispatch<React.SetStateAction<number>>, examId: string }) => {
    const { items } = useForageArray<Unit>(`${examId}-units`, isUnit)
    return (
        <div className="flex-1" >
            <div className="grid grid-cols-2" >
                {
                    items.map(({ id, name }, i) => <UnitButton key={id} onClick={() => setMode(id)}
                        color={getColorNum(i)}>
                        {name}
                    </UnitButton>)
                }
                <AddUnitButton color={getColorNum(items.length)} examId={examId} />
                <button onClick={() => setMode(1)} className={`h-10 bg-blue-300 col-span-2`} >Practice exams</button>
            </div>
        </div>
    )
}

export default CourseUnitNav