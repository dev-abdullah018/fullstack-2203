let secureApi = (req,res,next)=>{
    // console.log("ami", req.headers)

    if(req.headers.authorization == "9&hH;5D139,"){

        next()
    }else{
        res.status(401)
        res.send({error: "Invalid api"})
    }
}

module.exports = secureApi;

