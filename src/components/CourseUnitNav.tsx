import React from 'react'
import UnitButton from './UnitButton'

const CourseUnitNav = ({ setMode }: { setMode: React.Dispatch<React.SetStateAction<number>> }) => {
    return (
        <div className="grid grid-cols-2" >
            <UnitButton color={1}>Unit 1</UnitButton>
            <UnitButton color={0}>Unit 2</UnitButton>
            <UnitButton color={0}>Unit 3</UnitButton>
            <UnitButton color={1}>Unit 4</UnitButton>
            <UnitButton color={1}>+</UnitButton>
            <button onClick={()=>setMode(1)} className={`h-10 bg-blue-300 col-span-2`} >Practice exams</button>
        </div>
    )
}

export default CourseUnitNav