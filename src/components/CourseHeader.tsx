import { Exam } from '@/types/Course'
import { differenceInCalendarDays, format } from 'date-fns'
import React from 'react'

const CourseHeader = ({ title, setMode, exam, subtitle }: { setMode: React.Dispatch<React.SetStateAction<number>>, title?: string, exam: Exam, subtitle?: string }) => {
  return (
    <div className={`h-16 pt-6 pb-2 bg-sky-100 relative`} >
      <div className='h-10 w-10 bg-amber-50	absolute top-2 left-2 rounded-md flex items-center justify-center text-lg	border border-black'>
        {differenceInCalendarDays(exam.dateStart, new Date())}
      </div>
      {subtitle && <h3 className='text-slate-500 text-xs text-center mx-auto absolute top-0 left-0 right-0 mt-2 underline'>{subtitle}</h3>}
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