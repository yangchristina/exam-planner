import { z } from "zod";

export const learningGoalsListSchema = z.object({
    checked: z.boolean(),
    text: z.string(),
})

export const UnitSchema = z.object({
    id: z.number(),
    name: z.string().min(1)
})
export type Unit = z.infer<typeof UnitSchema>

export const FullUnitSchema = UnitSchema.extend({
    learningGoals: z.object({
        list: z.array(learningGoalsListSchema),
        storage: z.string(),
        progress: z.number(),
    })
})
export type FullUnit = z.infer<typeof FullUnitSchema>

export function isUnit(obj: unknown): obj is Unit {
    return UnitSchema.safeParse(obj).success
}

