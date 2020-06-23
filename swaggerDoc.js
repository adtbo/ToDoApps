const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "to do API",
        description: "to do API Information",
        contact: {
          name: "Developer"
        },
        servers: ["/"]
      },
    },
    apis: ['routes/todo.js']
};

const specs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
