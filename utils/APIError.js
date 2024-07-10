class APIError extends Error{
    constructor(
     statusCode,
     message: "Something went wrong",
     errors : [],
    stack = "",
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null 
        this.message = message
        this.success = false;
        this.errors = errors


        // to analise errro in files we use stack 
        if(stack){
          this.stack =  stack   //statck
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}
export {APIError}