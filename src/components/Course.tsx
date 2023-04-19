import React from 'react'
import CourseUnitNav from './CourseUnitNav'
import CourseHeader from './CourseHeader'
import ProgressBar from './ProgressBar'

const Course = () => {
    return (
        <div className="w-96 h-96 mx-auto bg-white rounded-xl shadow-lg flex flex-col items-stretch border-2" >
            <CourseHeader />
            <CourseUnitNav />
            <ProgressBar />
        </div>
    )
}

export default Course