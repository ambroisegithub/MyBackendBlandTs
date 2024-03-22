export default {
    post: {
        tags: ["Users"],
        description: "Add new User",
        operationId: "addUser",
        requestBody: {
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            fullName: { type: "string" },
                            email: { type: "string", format: "email" },
                            gender: { type: "string", enum: ["male", "female"] },
                            password: { type: "string", minLength: 6 },
                            confirmPassword: { type: "string" }
                            
                        },
                        required: ["fullName", "email", "gender", "password", "confirmPassword"],
                    },
                },
            },
        },
        responses: {
            "201": {
                description: "User was added",
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
            "500": {
                description: "Internal Server Error",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "An error occurred while adding the user",
                        },
                    },
                },
            },
        },
    },
};
