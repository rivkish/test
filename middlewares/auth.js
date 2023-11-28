const jwt = require("jsonwebtoken");


exports.auth=async(req,res,next)=>{

    let token=req.header("x-api-key");
    if(!token){
        return res.status(401).json({msg:"You need to send a token"})
    }
    try{
        let tokenData=jwt.verify(token,"rivSecret")
        req.tokenData=tokenData
        next()
    }
    catch(err){
        return res.status(500).json({msg:"token not valid"})
    }
}