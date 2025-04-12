import { z } from "zod";
import { requiredString } from "../util/util";


export const activitySchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    date: z.coerce.date({
        required_error: 'Date is required',
        invalid_type_error: 'Date is required'
    }),
    location: z.object({
        venue: requiredString('City'),
        city: z.string().optional(),
        latitude: z.coerce.number(),
        longitude: z.coerce.number(),
    })


})

export type ActivitySchema = z.infer<typeof activitySchema>;