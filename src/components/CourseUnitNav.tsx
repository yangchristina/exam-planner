import React from 'react'
import UnitButton from './UnitButton'
import useForageArray from '@/hooks/useForageArray'
import { isNumber } from 'lodash'
import { Unit, isUnit } from '@/types/Unit'

// TODO: setMode unitId
const CourseUnitNav = ({ setMode, examId }: { setMode: React.Dispatch<React.SetStateAction<number>>, examId: string }) => {
    const { items } = useForageArray<Unit>(`${examId}-units`, isUnit)
    return (
        <div className="flex-1" >
            <div className="grid grid-cols-2" >
                {
                    items.map(({id, name}, i) => <UnitButton onClick={() => setMode(id)} color={1}>{name}</UnitButton>)
                }
                <UnitButton onClick={() => setMode(2)} color={1}>Unit 1</UnitButton>
                <UnitButton onClick={() => setMode(2)} color={0}>Unit 2</UnitButton>
                <UnitButton onClick={() => setMode(2)} color={0}>Unit 3</UnitButton>
                <UnitButton onClick={() => setMode(2)} color={1}>Unit 4</UnitButton>
                <UnitButton onClick={() => setMode(2)} color={1}>+</UnitButton>
                <button onClick={() => setMode(1)} className={`h-10 bg-blue-300 col-span-2`} >Practice exams</button>
            </div>
        </div>
    )
}

export default CourseUnitNav