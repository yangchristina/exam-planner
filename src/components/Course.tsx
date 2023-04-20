import React, { useState } from 'react'
import CourseUnitNav from './CourseUnitNav'
import CourseHeader from './CourseHeader'
import ProgressBar from './ProgressBar'
import Links from './Links'
import LearningGoals from './LearningGoals'
import { styled } from '@/stitches.config'
import { Exam } from '@/types/Course'
import { Cross1Icon } from '@radix-ui/react-icons'
import { sum } from 'lodash'
import useForageItem from '@/hooks/useForageItem'
import { Link, isLinkList } from '@/types/Link'
import useForageIdArray from '@/hooks/useForageIdArray'
import useUnits from '@/hooks/useUnits'

const Overlay = styled(Cross1Icon, {
    background: "$overlay9",
    opacity: 0.6
})

const weightedAverage = (nums: number[], weights: number[]) => {
    const [sum, weightSum] = weights.reduce(
        (acc, w, i) => {
            acc[0] = acc[0] + nums[i] * w;
            acc[1] = acc[1] + w;
            return acc;
        },
        [0, 0]
    );
    return sum / weightSum;
};


// TODO: Cross out once past
const Course = ({ exam }: { exam: Exam }) => {
    const isFinished = exam.dateStart < Date.now()
    const [mode, setMode] = useState(0)
    const { item: links, set, isLoading } = useForageItem<Link[]>(`${exam.id}-practiceExams`, isLinkList, [])

    const { unitMap, addUnit, removeUnit, unitAverageProgress, setChecked, debouncedEditLearningGoals } = useUnits(exam.id)

    const practiceExamProgress = links.filter(x => x.checked).length / links.length
    const decimalProgress = mode === 0 ? weightedAverage([unitAverageProgress, practiceExamProgress], [0.5, 0.5]) : mode === 1 ? practiceExamProgress : (unitMap[mode].learningGoals.progress || 0)
    const progress = decimalProgress * 100

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="relative w-96 h-96 mx-auto bg-white rounded-xl shadow-lg flex flex-col items-stretch border-2" >
            <CourseHeader exam={exam} setMode={setMode} title={mode === 1 ? "Practice exams" : mode === 0 ? exam.name : "Learning Goals"} />
            {mode === 0 ? <CourseUnitNav removeUnit={removeUnit} units={Object.values(unitMap)} addUnit={addUnit} setMode={setMode} />
                : mode === 1 ? <Links links={links} set={set} /> :
                    <LearningGoals debouncedEdit={debouncedEditLearningGoals} unit={unitMap[mode]} setChecked={setChecked} examId={exam.id} unitId={mode} />
            }
            <ProgressBar progress={progress} />
            {isFinished && <Overlay className='absolute w-full h-full' />}
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
