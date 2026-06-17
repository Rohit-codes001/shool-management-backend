import express from 'express'
import { BookADemo } from "../Controlers/AllformsControler.js";
import limiter from "../middleware/Ratelimiter.js";

let bookdemoroute =   express.Router()

bookdemoroute.post('/Book-Free-Demo',limiter  ,BookADemo);


export default bookdemoroute

