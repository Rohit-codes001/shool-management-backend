import express from 'express'

const SchoolRegisterroute =  express.Router()
import {RegisterAschool} from '../Controlers/AllformsControler.js'

SchoolRegisterroute.post('/schoolRegistration' , RegisterAschool)

export default SchoolRegisterroute