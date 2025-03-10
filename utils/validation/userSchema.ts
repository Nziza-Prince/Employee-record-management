import {z} from 'zod' 

export const userSchema = z.object({
    firstname:z.string({message:"User name must not be empty"}).min(3,"firstname is required"),
    lastname:z.string({message:"User name must not be empty"}).min(3,"lastname is required"),
    email:z.string({message:"Email is required"}).email("Invalid email format"),
    password:z.string({message:"Password is required"}).min(4,"password must be atleast 4 characters")
})

export type UserSchema = z.infer<typeof userSchema>