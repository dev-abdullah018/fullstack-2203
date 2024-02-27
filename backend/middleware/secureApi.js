let secureApi = (req,res,next)=>{
    console.log("ami", req.headers)

    if(req.headers.authorization == "9&hH;5D139,3"){

        next()
    }else{
        res.send({error: "Invalid api"})
    }
}

module.exports = secureApi;

