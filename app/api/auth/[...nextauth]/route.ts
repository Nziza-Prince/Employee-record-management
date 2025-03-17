import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

interface IUser{
    _id:string
    firstname:string
    lastname:string
    email:string
    password:string
}

const handler = NextAuth({
    session:{
        strategy:'jwt'
    },
    providers: [
         CredentialsProvider({
           name:"Credentials",
           credentials:{
               firstname:{label:"First Name",type:"text",placeholder:"Nziza"},
               lastname:{label:"Last Name",type:"text",placeholder:"Nziza"},
               email:{label:"Email",type:"email",placeholder:"Email"},
               password:{label:"Password",type:"password",placeholder:"Password"}
           },
            async authorize(credentials) {
               if(!credentials?.email || !credentials?.password){
                throw new Error("Please provide both email and password")
               }
               try{
                await dbConnect()
                const user = await User.findOne({email:credentials.email}) as IUser

                if(!user){
                    throw new Error("User with this email not found")
                    }
                const passwordMatch = await bcrypt.compare(credentials.password,user.password)
                if(!passwordMatch){
                    throw new Error("Invalid password")
                }
                return {
                    id:user._id.toString(),
                    email:user.email,
                    name:`${user.firstname} ${user.lastname}`
                }
               }catch(err:any){
                console.log("Error:",err)
                throw new Error(err.message)

               }
            }
         })
      ],
      callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user.id
                token.email=user.email
                token.name = user.name
            }
            return token
        },
        async session({session,token}){
            if(token){
                session.user = {
                    email:token.email,
                    name:token.name,
                    image:token.picture
                }
            }
            return session
        }
      },
      pages:{
        signIn:"/login"
      },
      secret:process.env.NEXT_AUTH_SECRET
})

export {handler as GET,handler as POST}



