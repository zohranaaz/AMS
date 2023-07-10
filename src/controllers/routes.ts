import { Application } from "express";
import userController from "./userController";
import employeeController from "./employeeController";

export default function addRoutes(express: Application): Application{

    express.use(`/users`, userController.routes);
    express.use(`/employee`, employeeController.routes);

    return express;
}
 
 
 
