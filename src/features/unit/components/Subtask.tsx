import React, { useRef, useState } from 'react'
import { styled } from '@/stitches.config'
import { Subtask as SubtaskType, SubtaskSchema } from '@/types/Subtask'
import { Pencil1Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { useOutsideAlerter } from '@/hooks/useOutsideAlerter'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Checkbox from '@/components/Checkbox'
import InputLabel from '@/components/InputLabel'
import useChecklist from '../useChecklist'
import { BulletInputsLineWrapper, FloatableInput } from '@/components/InputList'
import { ErrorMessage } from '@hookform/error-message'

const IconBar = styled('span', {
    display: 'flex',
    marginRight: '1rem',
})

const AddSubtaskWrapperForm = styled('form', {
    flexGeneral: 'row',
    '&:not(&:hover)': {
        [`& ${IconBar}`]: {
            display: 'none',
        },
    }
})

const AddSubtaskInput = styled('input', {
    outline: 'none',
    border: 'none',
    boxShadow: 'none',
    font: 'inherit',
})

const AddSubtaskTrigger = styled('div', {
    flexGeneral: 'row',
    justifyContent: 'end',
    marginLeft: 'auto',
    marginRight: '1rem',
    marginTop: '0.3rem',
    width: 'max-content',
    '&:hover': {
        opacity: '0.7'
    },
})

const Flex = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    width: 'stretch'
})

const SubtaskRenameable = ({ index, subtask, type = "text" }: { index?: number, subtask?: SubtaskType, type?: string }) => {
    const [isEditing, setIsEditing] = useState(false)
    const outsideAlertRef = useRef(null);
    const { toggleSubtaskCompleted, removeSubtask, renameSubtask, addSubtask } = useChecklist()

    const { handleSubmit, register, } = useForm({
        defaultValues: {
            name: subtask?.name || '',
        },
        resolver: zodResolver(SubtaskSchema.omit({ completed: true }))
    });

    useOutsideAlerter(outsideAlertRef, () => setIsEditing(false));

    if (!isEditing && index === undefined) {
        return (
            <div>
                <AddSubtaskTrigger onClick={() => setIsEditing(true)} ><PlusIcon />&nbsp;add subtask</AddSubtaskTrigger>
            </div>
        )
    }

    function onSubmit(data: any) {
        const { name } = data

        setIsEditing(false)
        if (!name) return

        if (index === undefined) {
            addSubtask(name)
        } else {
            renameSubtask(index, name)
        }
    }

    const { ref, ...rest } = register('name')

    return (
        <AddSubtaskWrapperForm onSubmit={handleSubmit(onSubmit)} key={'add subtask iput'} >
            <Checkbox
                onCheckedChange={async (checked: boolean) => {
                    index !== undefined && toggleSubtaskCompleted(index, !!checked)
                }}
                defaultChecked={!!subtask?.completed || false} icon={'clear'} >
            </Checkbox>
            {isEditing ? <AddSubtaskInput
                autoFocus
                placeholder='add here'
                {...rest}
                ref={(e: any) => {
                    ref(e)
                    outsideAlertRef.current = e // you can still assign to ref
                }}
            /> :
                <Flex>
                    <InputLabel css={{ width: 'stretch' }}>
                        {subtask?.name}

                    </InputLabel>
                    <IconBar>
                        <Pencil1Icon onClick={() => setIsEditing(true)} />
                        <TrashIcon onClick={() => index !== undefined && removeSubtask(index)} />
                    </IconBar>
                </Flex>
            }
        </AddSubtaskWrapperForm>

    )
}

export default SubtaskRenameable