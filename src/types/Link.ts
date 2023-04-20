import { z } from "zod"

export const LinkSchema = z.object({
    text: z.string().optional(),
    url: z.string().url(),
    checked: z.boolean().default(false),
})

export type Link = z.infer<typeof LinkSchema>

export const LinkListSchema = z.array(LinkSchema)

export const LinkListFormSchema = z.object({
    links: z.preprocess((val: any) => preFilterArrayByField(val, 'url') || [], LinkListSchema)
})

export function isLink(obj: unknown): obj is Link {
    return LinkSchema.safeParse(obj).success
}

export function isLinkList(obj: unknown): obj is Link[] {
    return LinkListSchema.safeParse(obj).success
}

function preFilterArrayByField(val: any, field: string) {
    const arr = val?.filter((x: any) => x[field])
    if (!arr || arr.length === 0) return undefined
    return arr
}