import { Router, Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";
import employeeService, { EmployeeService } from "../services/employeeService";
import userService from "../services/userService";
import {EmployeeDto} from "../models/dto/employeeDto";
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const bcrypt = require('bcrypt');
import config from '../config';
import authMiddleware from "../middleware/middleware";

class EmployeeController {
    private employeeService: EmployeeService;

    public routes: Router;
    constructor() {
        this.routes = Router();
        this.employeeService = employeeService;

        this.routes.put('/punchInOut', authMiddleware, (req, res, next) => this.punchInOut(req, res, next));
        this.routes.get('/getEmployeeList', authMiddleware, (req, res, next) => this.getEmployeeList(req, res, next));
    }
    
    private punchInOut: RequestHandler = async (req, res) => {

        let punchStatus = {};
        let attendance = {};
        let statusMessage = {};
        let resData;
        let previousTime;
        let flag;
        let diff;
        let date = new Date();
        let returnData;
    
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader !== "null") {
            const token = authHeader.split(" ")[1];
            const tokenData = jwt_decode(token);
    
            console.log('token data : ',tokenData);
            if (tokenData) {
                const userId = tokenData.id;

                console.log('user id : ', userId);
                const userData = await userService.getUserById(userId);
                // const userData = await User.findOne({ where: { id: userId } });
    
                console.log('the user detail ',userData);
                let currentDate = date.toLocaleString(); // 4/9/2023, 10:27:50 PM
                let currentTime = date.toLocaleTimeString('en-GB'); // 22:27:50
                let defaultVal = 0;
                let dbDate;
                
    
                const currentDateSplit = await this.splitDate(date);
                console.log('current only date : ', currentDateSplit);
    
                if (userData) {
                    const id = userData.id.toString();
                    const employeeData = await employeeService.getEmployeeByUserId({ where: { user_id: id } });
                    const empId = employeeData.id; 
                }
                
                return

                    
                //     const checkStatus = await AttendanceHistory.findOne({
                //         where: { emp_id: empId },
                //         order: [['id', 'DESC']],
                //     });
    
                //     if (checkStatus) {
                //         dbDate = await this.splitDate(checkStatus.date);
    
                //         if(dbDate){
    
                //             if (currentDateSplit == dbDate) {
    
                //                 console.log("You can punch Out");
    
                //                 previousTime = checkStatus ? checkStatus.date : defaultVal;
                //                 diff = await this.getDiffTime(date, previousTime);
            
                //                 attendance = {
                //                     in_time: "00:00:00",
                //                     out_time: currentTime,
                //                     total_hours: diff,
                //                     date: currentDate,
                //                     status: 0,
                //                     emp_id: empId
                //                 }
            
                //                 statusMessage = "Punch Out done successfully";
            
                //             }
                //             else{
                //                 res.status(400).send({ message: "You cannot punch In for previous date"});
                //             }
                //         }
                //     }
    
                //     punchStatus = checkStatus ? checkStatus.status : 0;
                //     flag = checkStatus ? 1 : 0;
                   
    
                //     if (punchStatus == 1) {
                //         previousTime = checkStatus ? checkStatus.date : defaultVal;
                //         diff = await this.getDiffTime(date, previousTime);
    
                //         attendance = {
                //             in_time: "00:00:00",
                //             out_time: currentTime,
                //             total_hours: diff,
                //             date: currentDate,
                //             status: 0,
                //             emp_id: empId
                //         }
    
                //         statusMessage = "Punch Out done successfully";
    
                //     } else {
    
                //         previousTime = checkStatus ? checkStatus.date : defaultVal;
                //         console.log('previous time value : ',previousTime);
    
                //         diff = await this.getDiffTime(date, previousTime);
    
                //         attendance = {
                //             in_time: currentTime,
                //             out_time: "00:00:00",
                //             total_hours: checkStatus ? diff : "00:00:00",
                //             date: currentDate,
                //             status: 1,
                //             emp_id: empId
                //         }
    
                //         statusMessage = "Punch In done successfully";
                //     }
    
                //     console.log('the date attendance to insert', attendance);
                //     resData = await AttendanceHistory.create(attendance);
                    
                //     return
    
                //     let newDate;
                //     if (resData) {
                //         newDate = await this.splitDate(resData.date);
                //     }
    
                //     let data = {};
                //     let totalHours;
    
                //     if (flag == 0) {
    
                //         data = {
                //             in_time: resData.in_time,
                //             out_time: "00:00:00",
                //             total_hours: resData.total_hours,
                //             emp_id: empId,
                //             date: newDate
                //         }
    
                //         returnData = await Attendance.create(data);
                //     }
                //     else {
    
                //         const getfirstDate = await AttendanceHistory.findOne({
                //             where: { emp_id: empId },
                //             order: [['id', 'ASC']],
                //         });
    
                //         const firstDate = getfirstDate.date;
                //         const dateInFormat = firstDate.toLocaleDateString('en-US');
    
                //         const atncHistory = await AttendanceHistory.findAll({
                //             where: { emp_id: empId }
                //         });
    
                //         let sum = 0;
                //         atncHistory.forEach(function (data) {
    
                //             // date = data.date;
                //             let currentDateInFormat = data.date.toLocaleDateString('en-US');
                //             if (currentDateInFormat == dateInFormat) {
    
                //                 let t = (data.total_hours); // hh:mm:ss
                //                 let ms = Number(t.split(':')[0]) * 60 * 60 * 1000 + Number(t.split(':')[1]) * 60 * 1000 + Number(t.split(':')[2]) * 1000;
                //                 sum = sum + ms;
                //             }
    
                //         })
    
                //         totalHours = await this.converttoTimestamp(sum);
                //         if (resData.status == 0) {
                //             data = {
                //                 out_time: resData.out_time,
                //                 total_hours: totalHours,
                //                 emp_id: empId
                //             }
    
                //         } else {
                //             data = {
                //                 total_hours: totalHours,
                //                 emp_id: empId,
                //             }
                //         }
    
                //         returnData = await Attendance.update(data, { where: { emp_id: empId } });
                //     }
    
                // } else {
                //     res.status(404).send({ message: "user not found" });
                // }
    
            }
            else {
                res.status(400).json({ success: false, message: "Not Authorized" });
            }
    
            if (returnData) {
                res.status(201).send({ message: statusMessage, status: resData.status });
            }
            else {
                res.status(500).send();
            }
        }
        else {
            res.status(400).json({ success: false, message: "UnAuthorized" })
        }
    }
    

    private getDiffTime = async (time1, time2) => {

        let date1 = new Date(time1);
        let date2 = new Date(time2);
    
        let timeinMillisecond1 = date1.getTime();
        let timeinMillisecond2 = date2.getTime();
        let timeDiff = timeinMillisecond1 - timeinMillisecond2;
    
        let totalTime = await this.converttoTimestamp(timeDiff);
        return totalTime;
    
    }
    
    private converttoTimestamp = async (time) => {
    
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / 1000 / 60 / 60) % 24);
    
        const formattedTime = [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0")
        ].join(":");
    
        return formattedTime;
    }
    
    private splitDate = async (date) => {
    
        let dateToLocalString = date.toLocaleString(); // 4/9/2023, 10:27:50 PM
        let dateSplit = dateToLocalString.split(','); // [ 4/9/2023, 10:27:50 ] split into array
        let newDate = dateSplit[0]; // pull the date from 0 index of array
    
        return newDate;
    }

    private getEmployeeList: RequestHandler = async (req, res) => {

        const employee = await employeeService.findAllEmployee();
        if (employee.length === 0) {
            res.status(404).send({ message: "No attendance history found" })
        } else {
            res.status(200).jsonp(EmployeeDto.parseArray(employee));
        }
    }
}

export default new EmployeeController();
