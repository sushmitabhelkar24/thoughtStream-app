import User from "./../models/User.js"

const postSignup = async(req,res) =>{
 const {name, email, password} = req.body;

if (!name || !email || !password){
    return res.status(400).json({
        success:false,
        message:"Name,Email & Password is required"
    });
}

const nameValidationRegex=/^[a-zA-Z ]+$/;
const emailValidationRegex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordValidationRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if(nameValidationRegex.test(name) === false){
    return res.status(400).json({
        success:false,
        message:"Name should contain alphabets and spaces"
    })
}
if(emailValidationRegex.test(email) === false){
    return res.status(400).json({
        success:false,
        message:"Email should contain lowercase,special character, digits"
    })
}
if(passwordValidationRegex.test(password) === false){
    return res.status(400).json({
        success:false,
        message:"Password must be 8 characters long which should contain atleast one uppercase, one lowercase, one digit, one special character"
    })
}

 const existingUser = await User.findOne({email});
 if(existingUser){
    return res.status(400).json({
        success:false,
        message:`Email: ${email} already exists`
    })
 }

const newUser = new User({name,email,password})

const savedUser = await newUser.save();

res.json({
    success :true,
    message:"User registered successfully",
    user:savedUser,

});

};

const postLogin = async(req,res) =>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"email and password required"
        })
    }

    const existingUser = await User.findOne({email,password});
    if(existingUser){
        return res.status(200).json({
            success:true,
            message:"User logged successfully",
            user:existingUser
        })
    }else{
        return res.status(401).json({
            success:false,
            message:"Invalid email and password",
        })
    }
};


export {postSignup ,postLogin};