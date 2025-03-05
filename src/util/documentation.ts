import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { Application } from 'express';


// setup swagger
export function setupDocs(app: Application) {
    // define swagger
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'Book API',
            version: '1.0.0',
            description: 'A simple book API',
        },
        servers: [
            {
                url: 'http://localhost:4000/api',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'auth-token',
                },
            },
            schemas: {
                Book: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        author: { type: 'string' },
                        description: { type: 'string' },
                        genre: { type: 'string' },
                        imageURL: { type: 'string' },
                        releaseYear: { type: 'number' },
                        price: { type: 'number' },
                        stock: { type: 'number' },
                        discount: { type: 'boolean' },
                        discountPct: { type: 'number' },
                        isHidden: { type: 'boolean' },
                        _createdBy: { type: 'string' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                        registerDate: { type: 'string' },
                    },
                },
                Review: {
                    type: 'object',
                    properties: {
                        _book: { type: 'string' },
                        _createdBy: { type: 'string' },
                        rating: { type: 'number' },
                        comment: { type: 'string' },
                        createdAt: { type: 'string' },
                    },
                },
            },
        },
    };


    // swagger options
    const options = {
        swaggerDefinition,
        // path to files with OpenAPI definitions
        apis: ['**/*.ts'],
    };


    // swagger specification
    const swaggerSpec = swaggerJsdoc(options);


    // create docs route
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}