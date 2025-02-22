import express, { Application, Request, Response } from 'express';
import dotenvFlow from 'dotenv-flow';
import { testConnection } from './repository/database';
import routes from './routes';

dotenvFlow.config();

// create express application
const app: Application = express();

export function startServer() {
    // bind routes to the app
    // /api route in url
    app.use('/api', routes);
    
    // test db connection
    testConnection();

    // PORT has to either be defined in .env file or 4000
    const PORT:number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, function() {
        console.log("Server is running on port: ", PORT);
    })
}