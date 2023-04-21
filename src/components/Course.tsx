import React, { useState } from 'react'
import CourseUnitNav from './CourseUnitNav'
import CourseHeader from './CourseHeader'
import ProgressBar from './ProgressBar'
import Links from './Links'
import LearningGoals from './LearningGoals'
import { styled } from '@/stitches.config'
import { Exam } from '@/types/Course'
import { ChevronLeftIcon, ChevronRightIcon, Cross1Icon, EnterFullScreenIcon, ExitFullScreenIcon } from '@radix-ui/react-icons'
import useForageItem from '@/hooks/useForageItem'
import { Link, isLinkList } from '@/types/Link'
import useUnits from '@/hooks/useUnits'
import CourseContextMenu from './CourseContextMenu'
import { mod } from '@/features/calendars/utils'

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

function modArray<T>(arr: T[], index: number) {
    return arr[mod(index, arr.length)]
}

// TODO: Cross out once past
const Course = ({ exam, removeExam }: { exam: Exam, removeExam: () => void }) => {
    const isFinished = exam.dateStart < Date.now()
    const [mode, setMode] = useState(0)
    const { item: links, set, isLoading } = useForageItem<Link[]>(`${exam.id}-practiceExams`, isLinkList, [])

    const { unitMap, addUnit, removeUnit, unitAverageProgress, renameUnit, setChecked, debouncedEditLearningGoals } = useUnits(exam.id)
    const [isExpanded, setIsExpanded] = useState(false)
    const practiceExamProgress = links.length > 0 ? links.filter(x => x.checked).length / links.length : 0
    const decimalProgress = mode === 0 ?
        weightedAverage([unitAverageProgress || 0, practiceExamProgress], links.length > 0 && unitAverageProgress ? [0.5, 0.5] : links.length > 0 ? [0, 1] : [1, 0])
        : mode === 1 ? practiceExamProgress
            : (unitMap[mode].learningGoals.progress || 0)
    const progress = decimalProgress * 100

    if (isLoading) return <div>Loading...</div>
    const units = Object.values(unitMap)
    return (
        <div style={isExpanded ? { width: '50%' } : {}} className="relative m-auto w-96">
            <div className="relative aspect-square m-auto bg-white rounded-xl shadow-lg flex flex-col items-stretch border-2" >
                <CourseHeader mode={mode} exam={exam} setMode={setMode}
                    removeExam={removeExam}
                    title={mode === 1 ? "Practice exams" : mode === 0 ? exam.name : "Learning Goals"}
                    subtitle={mode === 1 ? exam.name : mode > 2 ? unitMap[mode].name : undefined}
                />
                {mode === 0 ? <CourseUnitNav renameUnit={renameUnit} removeUnit={removeUnit} units={units} addUnit={addUnit} setMode={setMode} />
                    : mode === 1 ? <Links links={links} set={set} /> :
                        <LearningGoals debouncedEdit={debouncedEditLearningGoals} unit={unitMap[mode]} setChecked={setChecked} examId={exam.id} unitId={mode} />
                }
                <ProgressBar progress={progress} />
                {isFinished && <CourseContextMenu removeExam={removeExam}>
                    <Overlay className='absolute w-full h-full' />
                </CourseContextMenu>
                }
                {mode > 2 && <ChevronLeftIcon
                    onClick={() => setMode(p => modArray(units, units.findIndex(x => x.id === p) - 1).id)}
                    className='absolute left-1 top-0 bottom-0 my-auto'
                />
                }
                {mode > 2 && <ChevronRightIcon onClick={() => setMode(p => modArray(units, units.findIndex(x => x.id === p) + 1).id)} 
                className='absolute right-1 top-0 bottom-0 my-auto' />}
                {isExpanded ? <ExitFullScreenIcon onClick={() => setIsExpanded(false)} className='absolute h-5 w-5 right-2 bottom-2 hover:opacity-40 hover:scale-90' />
                    : <EnterFullScreenIcon onClick={() => setIsExpanded(true)} className='absolute right-2 bottom-2 hover:opacity-40  hover:scale-110' />}
            </div>
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
