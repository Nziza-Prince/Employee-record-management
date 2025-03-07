import {z} from 'zod'

export const recordSchema = z.object({
    firstname:z.string({message:"First Name is required"}).min(3,"First Name should be atleast 3 characters"),
    lastname:z.string({message:"Last Name is required"}).min(3,"Last Name should be atleast 3 characters"),
    email:z.string().email("Invalid email address"),
    phone:z.string({message:"Phone Number is required"}).min(10,"phone number should be 10 digits").max(10,"phone number should be 10 digits"),
    role:z.enum(["ADMIN","STAFF"],{ message: "Role must be either 'staff' or 'admin'" })
})

export type RecordSchema = z.infer<typeof recordSchema>