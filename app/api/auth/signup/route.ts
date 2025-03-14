import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try{
        const body = await req.json()
        const {firstname,lastname,email,password} = body

        if(!firstname || !lastname || !email  || !password){
        return NextResponse.json({error:"All fields are required"},{status:400})
        }

        await dbConnect()

        const existingUser = await User.findOne({email:email})

        if(existingUser){
            return NextResponse.json({error:"User already exists"},{status:400})
        }
        const hashedPassword = await bcrypt.hash(password,10)

         await User.create({
            firstname,
            lastname,
            email,
            password:hashedPassword
        })
        
        return NextResponse.json({success:true,message:"User created successfully"},{status:201})

    }catch(err){
        console.error(err)
        return NextResponse.json(err)
    }
}