export default {
    get: {
        tags: ["Users"],
        description: "Get single user by ID",
        operationId: "getUserById",
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
        responses: {
            "200": {
                description: "User was obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/User",
                        },
                    },
                },
            },
            "404": {
                description: "User was not found",
            },
        },
    },
};
