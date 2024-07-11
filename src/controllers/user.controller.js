import { asyncHandler } from "../../utils/asyncHandler.js";
import { APIError } from "../../utils/APIerror.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { APiResponse } from "../../utils/APiResponse.js";

const registerUser = asyncHandler(async( req, res)=>{
     // get user details from frontend
     //validation - not empty
     // check if user already exists: email, username
     //check for images 
     // upload them to cloudnary,avatar 
     // crate user object - create entry in db 
     // remove password and refresh token field from response 
     // check for user creation 

     const {fullName, email, username, password} = req.body
     console.log("email : ",email);
    //  if(fullName === ""){
    //        throw new APIError (400, "full name is required")
    //  }
            /* OR */
    
    if(
        [fullName, email, username , password].some((field) => field?.trim()==="")
    )
    {
        throw new APIError(400, "All fields are required")
    }

    const  existedUser = User.findOne({
        $or: [{username},{email}]
    })

    if (existedUser){
        throw new APIError(409, "user with email and with name already exists ")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath =  req.files?.coverImage[0]?.path


    if(!avatarLocalPath){
        throw new APIError(400,"avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new APIError (400 , "avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase() 

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refresh"
    )

    if(!createdUser){
        throw new APIError(500,"something went wrong while regitering the user" )
    }


    return res.status(201)


    // res.status(200).json({

    //     message: "chai aur code"
    // })
})

export {registerUser}