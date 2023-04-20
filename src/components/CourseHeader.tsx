import { Exam } from '@/types/Course'
import { differenceInCalendarDays, format } from 'date-fns'
import React from 'react'
import { ResetIcon } from '@radix-ui/react-icons'
import CourseContextMenu from './CourseContextMenu'

const CourseHeader = ({ title, setMode, exam, subtitle, removeExam, mode }: {
  setMode: React.Dispatch<React.SetStateAction<number>>, title?: string, exam: Exam, subtitle?: string
  removeExam: () => void,
  mode: number
}) => {
  return (
    <CourseContextMenu removeExam={removeExam}>
      <div className={`h-16 pt-6 pb-2 bg-sky-100 relative`} >
        <div className='h-10 w-10 bg-amber-50	absolute top-2 left-2 rounded-md flex items-center justify-center text-lg	border border-black'>
          {differenceInCalendarDays(exam.dateStart, new Date())}
        </div>
        {subtitle && <h3 className='text-slate-500 text-xs text-center mx-auto absolute top-0 left-0 right-0 mt-2 underline'>{subtitle}</h3>}
        <h1 className='text-xl text-center mx-auto relative'>
          <span className='relative'>
            {mode !== 0 && <ResetIcon onClick={() => setMode(0)} className='absolute -left-6 my-auto top-0 bottom-0 w-4 h-4 text-slate-500' />}
            {title}
          </span>
        </h1>
        <div className='absolute bottom-2 right-2 text-sm	'>
          <u>
            Exam date
          </u>
          <br />
          {format(exam.dateStart, 'MMMM d')}
        </div>
      </div>
    </CourseContextMenu>
  )
}

export default CourseHeader