import swaggerJSDoc from "swagger-jsdoc"; // Importamos swagger-jsdoc: este srive para definir el swagger

const swwagerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Docu API",
            description: "Documentación de la API",
            servers : ["http://localhost"],
            schemes: 
            - "http"
            - "https" 
        }
    },
    basePath: "/",
    apis: ["src/routes/*.js"]
};

const swaggerSpec=swaggerJSDoc(swwagerOptions);
export default swaggerSpec;