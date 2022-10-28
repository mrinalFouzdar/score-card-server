const adm = require("../models/adm")

module.exports={
    validateDB:async(req,resp,next)=>{
        try {
        //    console.log("_req",req.value) 
        const {studenet_info} = req.value;
        let err= {}

        let findStudenDetails =  await adm.findStudenDetails(studenet_info)
            console.log("findStudenDetails",findStudenDetails)

            if(findStudenDetails.success){
                console.log("aa")
             return  resp.status(400).json({status:3,message:"Student already exist"})
            }else{
                console.log("next")
                next()
            }

        } catch (error) {
            console.log(error)
            resp.status(400).json({status:3,message:error.message})
        }
    }
}