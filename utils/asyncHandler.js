
/* STEP-2 */
//when we use promisses
const asyncHandler = (requestHandler) => {
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
    return;
}


export {asyncHandler}                    // async handler deal with heigher order function 

// const asyncHandler = ()=>{}
// const asyncHandler =  (func) => ()=>{}
// const asyncHandler =  (func) => async () =>{}


/* STEP-1 */
// when we use try catch 
// const asyncHandler =  (fn) => async (req,res, next) =>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }