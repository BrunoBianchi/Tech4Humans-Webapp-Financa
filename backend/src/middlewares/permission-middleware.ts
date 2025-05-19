import { RequestHandler } from "express";

const auth: RequestHandler = (req, res, next) => {
    res.send("Permission Denied");
};

export default auth;