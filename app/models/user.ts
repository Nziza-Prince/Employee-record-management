import mongoose,{Schema,Document,Model} from 'mongoose'

interface User{
    firstname:string
    lastname:string
    email:string
    password:string
    createdAt:Date
    updatedAt:Date
}

interface UserDocument extends User ,Document{}

const userSchema:Schema = new Schema<UserDocument>({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
})

// Automatically update `updatedAt` before saving a document
userSchema.pre('save', function (next) {
    if (!this.isNew) {
      this.updatedAt = new Date();
    }
    next();
  });
  
  // Update `updatedAt` for update operations
userSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
    this.set({ updatedAt: new Date() });
    next();
  });

const User:Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User',userSchema)
export default User