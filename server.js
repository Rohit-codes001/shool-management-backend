import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectdb from './config/Connectdb.js'
import bookdemoroute from './routes/routeBookdemo.js'
import SchoolRegisterroute from './routes/routeNewSchoolRegister.js'
dotenv.config()
let port = process.env.PORT || 5000

let app = express();
app.use(cors())
app.use(express.json());
app.use('/api/freeDemo',bookdemoroute)
app.use('/api',SchoolRegisterroute)
connectdb()

app.get('/' ,(req , res)=>{
    console.log('working')
    res.send('working')
})

app.listen(port , ()=>{
    console.log('server runngin ', port)
})