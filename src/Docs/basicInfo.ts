export default {
    openapi: "3.1.0", // Specify the OpenAPI version
    info: {
       title: "My Portifolio BackEnd",
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
   };
   