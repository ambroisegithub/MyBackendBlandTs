export const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "My Portfolio BackEnd",
        description: "My digital branding",
        version: "1.0.0",
        contact: {
          name: "muhayimana ambroise",
          email: "muhayimana21@gmail.com",
          url: "web.com",
        },
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "apiKey",
            scheme: "bearer",
            bearerFormat: "JWT",
            name: "Authorization",
            in: "header",
          },
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["src/Docs/*ts"],
  };
  