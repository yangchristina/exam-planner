import Course from '@/components/Course'
import Timegrid, { MS_PER_DAY } from '@/features/calendars/timegrid'
import { startOfToday } from 'date-fns'
import { styled } from '@/stitches.config'
import { ChevronLeftIcon, ChevronRightIcon, PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import ExamForm from '@/features/category/ExamForm'
import useForageArray from '@/hooks/useForageArray'
import { Exam, isExam } from '@/types/Course'
import { useState } from 'react'

const Page = styled('div', {
  height: "100vh",
  margin: "0",
  boxSizing: 'border-box',

  gridGap: '0',
  display: "grid",
  // gridTemplateColumns: "1.1fr 3fr",
  // gridTemplateAreas: `
  //   "calendar courses"
  // `,

  // TODO: switch to breakpoints, minWidth scroll is bad
  minWidth: '1280px',
  overflowX: 'scroll',
});


export default function Home() {
  const { items, remove, add, isLoading } = useForageArray<Exam>('exams', isExam)
  const stub = () => {
    console.log('stub')
  }

  const [date, setDate] = useState(startOfToday().getTime())

  if (isLoading) return <div>Is Loading...</div>

  return (
    <Page>
      {/* <Timegrid
        containerCss={{ padding: '20px 0px 0px 20px' }}
        firstDay={date}
        days={1}
        data={items}
        handleAddItem={stub}
        handleDoubleClickDate={stub}
        // contextMenu={(item, calendarItem) => stub()} // NOTE: difference between Item and Calendar item is name not requried in TemplateRecur
        handleDateChange={stub}
        labelLeft={<ChevronLeftIcon onClick={()=>setDate(p=>p-MS_PER_DAY)} />}
        labelRight={<ChevronRightIcon onClick={()=>setDate(p=>p+MS_PER_DAY)} />}
      /> */}
      {items.length > 0 ? <div className='overflow-auto flex flex-wrap p-8 gap-y-6' >
        {
          items.map((exam, i) => <Course key={i} exam={exam} removeExam={()=>remove(i)} />)
        }
      </div> : <div className='text-xl m-auto' >Add an exam to start (top right corner)</div>}
        <ExamForm add={add}>
          <PlusCircledIcon className='absolute top-3 right-3 h-5 w-5' />
        </ExamForm>
    </Page>
  )
}
