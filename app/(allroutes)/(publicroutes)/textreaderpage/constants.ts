import * as z from 'zod'

export const formSchema = z.object({
    payload: z.string().min(1, {
        message: "Payload is required"
    })
})