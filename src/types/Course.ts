import { hoursToMilliseconds, startOfHour } from "date-fns";
import { nanoid } from "nanoid";
import { z } from "zod";

export interface Checkable {
    checked: boolean;
    [x: string]: any;
}
export type Progress = number // completed / total

export const ExamFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    dateStart: z.date(),
    durationInHours: z.coerce.number(),
})

export type ExamForm = z.infer<typeof ExamFormSchema>

export const ExamSchema = z.object({
    id: z.string(),
    name: z.string(),
    dateStart: z.number(),
    dateEnd: z.number(),
})
export type Exam = z.infer<typeof ExamSchema>

export function isExam(obj: unknown): obj is Exam {
    return ExamSchema.safeParse(obj).success
}

export function convertExamToExamForm(exam: Exam): ExamForm {
    const { dateStart, dateEnd, ...rest } = exam
    let durationInHours = (dateEnd - dateStart) / hoursToMilliseconds(1)
    durationInHours = Math.round(durationInHours * 10) / 10

    return {
        ...rest,
        dateStart: new Date(dateStart),
        durationInHours
    }
}

export function convertExamFormToExam(examForm: ExamForm): Exam {
    const { dateStart, durationInHours, ...rest } = examForm
    const dateEnd = dateStart.getTime() + hoursToMilliseconds(durationInHours)
    return { ...rest, dateStart: dateStart.getTime(), dateEnd }
}

export function generateNewExamForm(): ExamForm {
    const dateStart = startOfHour(Date.now())
    return {
        id: nanoid(),
        name: '',
        dateStart,
        durationInHours: 2.5
    }
}


export function generateNewExam() {
    const dateStart = startOfHour(Date.now()).getTime()
    return {
        id: nanoid(),
        name: '',
        dateStart,
        dateEnd: dateStart + hoursToMilliseconds(1),
    }
}
