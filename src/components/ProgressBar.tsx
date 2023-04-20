import { styled } from '@/stitches.config'
import React from 'react'
import ItemProgress from './ItemProgress'

//  SMALL (checklist) AND LARGE VERSIONS (course)
const ProgressBar = () => {
  return (
    <div className='bottom-0 w-full'>
      <End>
        <Center><ItemProgress width={'90%'} progress={70} /></Center>
      </End>
    </div>
  )
}

export default ProgressBar

const Center = styled('div', {
  center: 'row',
  marginBottom: '10%',
})

const End = styled('section', {
  display: 'flex',
  height: 'stretch',
  flexDirection: 'column',
  justifyContent: 'end',
})