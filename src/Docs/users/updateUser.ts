export default {
    put: {
        tags: ["Users"],
        description: "Update user",
        operationId: "updateUser",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    type: "string",
                },
                required: true,
            },
        ],
        requestBody: {
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        properties:{
                            fullName:{type:"string"},
                            email:{type:"string",format:"email"},
                            gender:{type:"string",enum:["male","female"]},
                            password:{type:"string",minLength:6},
                            confirmPassword:{type:"string"}
                        }
                    }
                }
            }
        },
        responses: {
            "200": {
                description: "User was updated",
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
        },
    },
};
