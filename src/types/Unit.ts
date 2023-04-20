import { z } from "zod";

export const UnitSchema = z.object({
    id: z.number(),
    name: z.string()
})

export type Unit = z.infer<typeof UnitSchema>

export function isUnit(obj: unknown): obj is Unit {
    return UnitSchema.safeParse(obj).success
}