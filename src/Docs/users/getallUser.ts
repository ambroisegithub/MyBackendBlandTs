export default {
    get: {
        tags: ["Users"],
        description: "Get all users",
        operationId: "getAllUsers",
        responses: {
            "200": {
                description: "Users were obtained",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/User",
                            },
                        },
                    },
                },
            },
        },
    },
};
