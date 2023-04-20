import React, { useState } from 'react'
import CourseUnitNav from './CourseUnitNav'
import CourseHeader from './CourseHeader'
import ProgressBar from './ProgressBar'
import Links from './Links'
import LearningGoals from './LearningGoals'
import { styled } from '@/stitches.config'
import { Exam } from '@/types/Course'
import { Cross1Icon } from '@radix-ui/react-icons'

const Overlay = styled(Cross1Icon, {
    background: "$overlay9",
    opacity: 0.6
})

// TODO: Cross out once past
const Course = ({ exam }: { exam: Exam }) => {
    const isFinished = exam.dateStart < Date.now()
    const [mode, setMode] = useState(0)
    return (
        <div className="relative w-96 h-96 mx-auto bg-white rounded-xl shadow-lg flex flex-col items-stretch border-2" >
            <CourseHeader exam={exam} setMode={setMode} title={mode === 1 ? "Practice exams" : mode === 0 ? exam.name : "Learning Goals"} />
            {mode === 0 ? <CourseUnitNav examId={exam.id} setMode={setMode} />
                : mode === 1 ? <Links /> :
                    <LearningGoals examId={exam.id} unitId={mode} />
            }
            <ProgressBar />
            {isFinished && <Overlay className='absolute w-full h-full'/>}
        </div>
    )

}

export default Course

export const IconBar = styled('span', {
    display: 'flex',
    marginRight: '1rem',
    right: 0,
    position: 'absolute'
})
