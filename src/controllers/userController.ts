import { Router, Request, Response, NextFunction } from "express";
import userService, { UserService } from "../services/userService";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import fileUpload from '../middleware/fileUpload';
import config from '../config';
import authMiddleware from "../middleware/middleware";

class UserController {
    private userService: UserService;

    public routes: Router;
    constructor() {
        this.routes = Router();
        this.userService = userService;

        this.routes.post('/', fileUpload.upload, (req, res, next) => this.post(req, res, next));
        this.routes.post('/login', (req, res, next) => this.login(req, res, next));
        this.routes.get('/',authMiddleware, (req, res, next) => this.get(req, res, next));
        this.routes.delete('/:userId',authMiddleware, (req, res, next) => this.delete(req, res, next));
    }

    private async post(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const isUserExist = await this.userService.getUser(req.body.email);
            if (isUserExist) {
                res.status(409).send({ message: "User already exist" })
            } else {
                const randomPassword = Math.random().toString(36).slice(2, 10);
                const user = {
                    user_name: req.body.user_name ? req.body.user_name : 0,
                    email: req.body.email,
                    password: "root123",
                    gender: req.body.gender
                };

                const salt = await bcrypt.genSaltSync(10);
                const hashPassword = await bcrypt.hashSync(user.password, salt);
                user.password = hashPassword;

                const userData = await this.userService.createUser(user);
                const result = await this.userService.addEmployee(req, userData.id);
                //await this.userService.addAddress(req, result.id)

                if (result) {
                    await this.userService.updateUser(result.id, userData.id);
                    res.status(201).send({ message: "User created successfully" })
                }
            }
        } catch (error) {
            res.status(500).send({ error: error });
        }
    }

    private async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const userName = req.body.emp_id;
            const password = req.body.password;

            const user = await this.userService.getUserByUserName(String(userName));
            if (user === null) {
                res.status(404).send({ message: "User not found." })
            } else {
                const role = await this.userService.getUserDetailById(user.id);
                if (bcrypt.compareSync(password, user.password)) {
                    const userData = {
                        "email": user.email,
                        "gender": user.gender,
                        "role": role,
                        "id":user.id
                    }

                    const token = jwt.sign(userData, config.jwtSecretKey, { expiresIn: 1800 });
                    const response = {
                        "token": token,
                        "expiresIn": 1800
                    }
                    res.status(200).send(response);
                } else {
                    res.status(401).send({ message: "Unauthorized" })
                }
            }
        } catch (error) {
            res.status(500).send({ error: error });
        }
    }

    private async get(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const userDetails = await this.userService.getAllUser();
            res.json(userDetails)
        } catch (error) {
            res.status(500).send({error: error});
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.params.userId
            const user = await this.userService.getUserById(userId);
            if (user) {
                await this.userService.deleteUser(userId);
                await this.userService.deleteEmployee(userId);
                res.status(205).send();
            } else {
                console.log('Not found!');
                res.status(404).send({ message: "Not found" })
            }
        } catch (error) {
            res.status(500).send({ error: error });
        }
    }
}

export default new UserController();
