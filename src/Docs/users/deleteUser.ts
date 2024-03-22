export default {
    delete: {
        tags: ["Users"],
        description: "Delete user",
        operationId: "deleteUser",
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
            "204": {
                description: "User was deleted",
            },
            "404": {
                description: "User not found",
            },
        },
    },
};
