import express, { Application } from 'express';
import dotenvFlow from 'dotenv-flow';
import { testConnection } from './repository/database';
import routes from './routes';
import { setupDocs } from './util/documentation';
import cors from 'cors';

dotenvFlow.config();

// create express application
const app: Application = express();

export function setupCors() {
    app.use(
        cors({
            origin: "*", // allow requests from any origin
            methods: 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE',
            allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // allow these headers
            credentials: true,
        })
    );
}

export function startServer() {

    // enable cors
    setupCors();

    // json body parser
    app.use(express.json());

    // bind routes to the app
    // /api route in url
    app.use('/api', routes);

    setupDocs(app);
    
    // test db connection
    testConnection();

    // PORT has to either be defined in .env file or 4000
    const PORT:number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, function() {
        console.log("Server is running on port: " + PORT);
    })
}