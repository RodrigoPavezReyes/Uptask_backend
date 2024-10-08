import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import { connectDB } from "./config/db"
import projectRoutes from "./routes/projectRoutes"
import { corsConfig } from "./config/cors"

dotenv.config()
connectDB()


const app = express()
app.use(cors(corsConfig))


//Loggin
app.use(morgan('dev'))

//Lee datos de formulario
app.use(express.json())



//Routes
app.use("/api/projects",projectRoutes)


export default app