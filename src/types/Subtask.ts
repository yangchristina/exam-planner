import { z } from "zod"

export const SubtaskSchema = z.object({
    name: z.string(),
    completed: z.literal(0).or(z.literal(1)),
})

export type Subtask = z.infer<typeof SubtaskSchema>