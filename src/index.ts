import 'dotenv/config'
import { App } from './app';

let app: App;
async function main() {
    
    app = new App();
    app.init();
};
main();


