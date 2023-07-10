import * as express from 'express';
import * as cors from 'cors';
import addRoutes from './controllers/routes';

export class App {

    public express: express.Application;
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();

        this.express.use('/uploads',express.static('uploads'));
    }

    private middlewares(): void {
        this.express.use(express.json({
            limit: "50mb"
        }));

        this.express.use(express.urlencoded({
            limit: "50mb",
            parameterLimit: 1000,
            extended: false
        }));

        this.express.disable('x-powered-by');
        this.express.use(cors());
    }

    private routes(): void {
        addRoutes(this.express);
    }

    init() {
        this.express.listen(4000, () => {
            return console.log(`Server :: Running @ 'http://localhost:${4000}'`);
        })
    }
}