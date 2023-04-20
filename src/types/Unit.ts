import { z } from "zod";

export const UnitSchema = z.object({
    id: z.number(),
    name: z.string().min(1)
})

export type Unit = z.infer<typeof UnitSchema>

export function isUnit(obj: unknown): obj is Unit {
    return UnitSchema.safeParse(obj).success
}