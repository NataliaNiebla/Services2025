import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'Docu API',
            description: 'API documentation for use',
            servers: ['http://localhost'],
            schemes:
            - 'http'
            - 'https'
        },
    },
    basePath: '/',
    apis: ['src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;