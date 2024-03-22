export default {
    post: {
        tags: ["Auth"],
        description: "Login user",
        operationId: "loginUser",
        requestBody: {
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        properties:{
                            email:{type:"string",format:"email", example:"admin@gmail.com", description:"Enter your email"},
                            password:{type:"string", example:"P@ssword" ,minLength:6}
                        },
                        required:["email","password"]
                    }
                }
            }
        },
        responses: {
            "200": {
                description: "User was logged in",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/User",
                        },
                    },
                },
            },
            "400": {
                description: "Bad Request",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "Please fill all required fields",
                        },
                    },
                },
            },
            "404": {
                description: "User not found",
            },
            "401": {
                description: "Invalid credentials",
            },
        },
    },
};
