import {model, Schema} from "mongoose";

const userScheme = new Schema(
    {
        name :{type:String ,requried:true},
        email:{type:String ,requried:true,unique:true},
        password:{type:String ,required:true}
    },
    {
        timestamps : true,
    }
);

const User = model("User",userScheme);

export default User;