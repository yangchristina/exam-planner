import { Exam } from '@/types/Course'
import { differenceInCalendarDays, format } from 'date-fns'
import React from 'react'

const CourseHeader = ({ title, setMode, exam }: { setMode: React.Dispatch<React.SetStateAction<number>>, title?: string, exam: Exam }) => {
  return (
    <div className={`h-16 pt-6 pb-2 bg-sky-100 relative`} >
      <div className='h-10 w-10 bg-amber-50	absolute top-2 left-2 rounded-md flex items-center justify-center text-lg	border border-black'>
        {differenceInCalendarDays(exam.dateStart, new Date())}
      </div>
      <h1 onClick={()=>setMode(0)} className='text-xl text-center mx-auto'>{title || 'CPSC 320'}</h1>
      <div className='absolute bottom-2 right-2 text-sm	'>
        <u>
          Exam date
        </u>
        <br />
        {format(exam.dateStart, 'MMMM d')}
      </div>
    </div>
  )
}

export default CourseHeader