import { RequestHandler } from "express";

export default ():RequestHandler=>{
     return (req,res,next)=>{
        res.send("Permission Denied");
     }
}