import mongoose, { Document, PopulatedDoc } from "mongoose";
import { ITask } from "./Task";
export interface IProject extends Document {
    projectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<ITask & Document>[];
}
declare const Project: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject> & IProject & Required<{
    _id: unknown;
}>, any>;
export default Project;
