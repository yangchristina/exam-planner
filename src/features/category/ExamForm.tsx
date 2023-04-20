import { Button, Input } from '@/components'
import Dialog from '@/components/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ButtonsBar, ErrorText, Form } from './styles'
import { Exam, ExamForm, ExamFormSchema, ExamSchema, convertExamFormToExam, convertExamToExamForm, generateNewExam, generateNewExamForm } from '@/types/Course'
import { DateTimePicker } from '@mantine/dates';
import localforage from 'localforage'
import { isExam } from '@/types/Course'
import { uniqBy } from '@/utils'

const ExamForm = ({ children, section }: { children: JSX.Element, section?: Exam, }) => {
    const [open, setOpen] = useState(false)
    const { handleSubmit, register, reset, control, watch, formState: { errors, isSubmitting } } = useForm({
        defaultValues: formDefaults(),
        resolver: zodResolver(ExamFormSchema)
    });

    function formDefaults() {
        return {
            ...generateNewExamForm(),
            ...(section ? convertExamToExamForm(section) : {})
        } as ExamForm
    }

    console.log("durationInHours: ", watch('durationInHours'))

    return (
        <Dialog title={'Exam form'} open={open} setOpen={setOpen} trigger={children || <Button>Add Section</Button>} >
            <Form css={{ paddingTop: 25, paddingBottom: 0 }} onSubmit={handleSubmit(async (values) => {
                const newExam = convertExamFormToExam(values)
                setOpen(false)
                reset(formDefaults())
                localforage.setItem(values.id, newExam)
                let data = await localforage.getItem('exams')
                let exams: Exam[] = Array.isArray(data) ? data.filter(isExam) as Exam[] : []
                const index = uniqBy(exams, (x) => x.id).findIndex(x => x.id === newExam.id)
                if (-1 !== index) {
                    exams[index] = newExam
                } else {
                    exams = [...exams, newExam]
                }
                localforage.setItem('exams', exams)
            })} >
                <Input {...register('name')} placeholder='ex. CPSC 310' title='Section name:' label={'Name:'} >
                    {errors.name?.message && <ErrorText>{errors.name?.message}</ErrorText>}
                </Input>

                <Controller
                    name="dateStart"
                    control={control}
                    render={({ field }) => <DateTimePicker {...field} error={errors.dateStart?.message} />}
                />


                <Input {...register('durationInHours')} type='number' min={0.5} max={999} step={0.5} placeholder='(in hrs)' title='Duration' label={'Duration (hrs):'} >
                    {errors.durationInHours?.message && <ErrorText>{errors.durationInHours?.message}</ErrorText>}
                </Input>

                <ButtonsBar>
                    <Button id='submit' disabled={isSubmitting} name='submit' color={'success'} type='submit' >Submit</Button>
                </ButtonsBar>
            </Form>
        </Dialog >
    )
}

export default ExamForm