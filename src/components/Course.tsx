import React, { useState } from 'react'
import CourseUnitNav from './CourseUnitNav'
import CourseHeader from './CourseHeader'
import ProgressBar from './ProgressBar'
import UnitCheckList from '@/features/unit/UnitCheckList'
import Links from './Links'

const Course = () => {
    const [mode, setMode] = useState(0)
    return (
        <div className="relative w-96 h-96 mx-auto bg-white rounded-xl shadow-lg flex flex-col items-stretch border-2" >
            <CourseHeader setMode={setMode} title={mode === 1 ? "Practice exams" : undefined} />
            {mode === 0 && <CourseUnitNav setMode={setMode} />}
            {mode === 1 && <Links />}
            <ProgressBar />
        </div>
    )

}

export default Course