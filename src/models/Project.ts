import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose";
import { ITask } from "./Task";


export interface IProject extends Document {   ////Esto es de typescript
    projectName : string,
    clientName : string,
    description : string,
    tasks: PopulatedDoc<ITask & Document>[]
}


const ProjectSchema: Schema = new Schema({   //Esto es el Schema de mongoose
    projectName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    clientName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    tasks:[
        {
            type:Types.ObjectId,
            ref: "Task"
        }
    ]
},{timestamps:true})

///conexion entre typescrip y mongoose <ProjectType>


const Project = mongoose.model<IProject>("Project", ProjectSchema)
export default Project

