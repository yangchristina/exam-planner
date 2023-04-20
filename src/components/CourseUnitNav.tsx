import React from 'react'
import UnitButton from './UnitButton'

const CourseUnitNav = ({ setMode }: { setMode: React.Dispatch<React.SetStateAction<number>> }) => {
    return (
        <div className="flex-1" >
            <div className="grid grid-cols-2" >
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