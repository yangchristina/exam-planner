import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@/stitches.config'
import { Subtask as SubtaskType } from '@/types/Subtask'
import Subtask from './Subtask'

const Container = styled('div', {
    fontSize: '1rem',
})

const SubtaskList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    marginLeft: 5,
})

const AddSubtaskTrigger = styled('div', {
    flexGeneral: 'row',
    justifyContent: 'end',
    marginLeft: 'auto',
    marginTop: '0.8rem',
    width: 'max-content',
    '&:hover': {
        opacity: '0.7'
    },
})

const Subtasks = ({ subtasks }: { subtasks: SubtaskType[]}) => {

    return (
        <Container>
            <SubtaskList >
                {subtasks?.map((subtask, i) => (
                    <Subtask key={i} subtask={subtask} index={i} />
                ))}

                    <Subtask />
            </SubtaskList>
        </Container>
    )
}

export default Subtasks