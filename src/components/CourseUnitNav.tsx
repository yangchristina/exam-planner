import React from 'react'
import UnitButton from './UnitButton'

const CourseUnitNav = () => {
    return (
        <div className="grid grid-cols-2" >
            <UnitButton>Unit 1</UnitButton>
            <UnitButton>Unit 2</UnitButton>
            <UnitButton>Unit 3</UnitButton>
            <UnitButton>Unit 4</UnitButton>
        </div>
    )
}

export default CourseUnitNav