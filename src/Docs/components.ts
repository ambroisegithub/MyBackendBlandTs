import { Schema } from "mongoose";

export default {
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

        schemas: {
            id: {
                type: "string",
                description: "An id of an object",
                example: "tyVgf",
            },
            Blog: {
                type: "object",
                properties: {
                    blogTitle: {
                        type: "string",
                        description: "Title of the blog",
                        example: "Sample Blog Title",
                    },
                    blogDescription: {
                        type: "string",
                        description: "Description of the blog",
                        example: "This is a sample blog description.",
                    },
                    blogDate: {
                        type: "string",
                        description: "Date of the blog",
                        example: "2024-03-22T10:00:00Z",
                    },
                    blogImage: {
                        type: "string",
                        description: "URL of the blog image",
                        example: "https://example.com/image.jpg",
                    },
                    comments: {
                        type: "array",
                        description: "Comments on the blog",
                        items: {
                            type: "object",
                            properties: {
                                blogSubject: {
                                    type: "string",
                                    description: "Subject of the comment",
                                    example: "Sample Comment Subject",
                                },
                                comment: {
                                    type: "string",
                                    description: "Content of the comment",
                                    example: "This is a sample comment.",
                                },
                                date: {
                                    type: "string",
                                    description: "Date of the comment",
                                    example: "2024-03-22T10:00:00Z",
                                },
                            },
                        },
                    },
                    likes: {
                        type: "number",
                        description: "Number of likes on the blog",
                        example: 0,
                    },
                    likedBy: {
                        type: "array",
                        description: "Users who liked the blog",
                        items: {
                            $ref: "#/components/schemas/id",
                        },
                    },
                },
            },

            ContactUs: {
                type: "object",
                properties: {
                    fullName: {
                        type: "string",
                        description: "Full name of the contact",
                        example: "Ambroise Muhayimana",
                    },
                    phoneNumber: {
                        type: "string",
                        description: "Phone number of the contact",
                        example: "1234567890",
                    },
                    emailAddress: {
                        type: "string",
                        description: "Email address of the contact",
                        example: "ambroise.muhayimana@example.com",

                    },
                    subject: {
                        type: "string",
                        description: "Subject of the contact",
                        example: "Sample Subject",
                    },
                    message: {
                        type: "string",
                        description: "Message of the contact",
                        example: "This is a sample message.",
                    },
                },
            },

            Subscribe: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        description: "Email address of the subscriber",
                        example: "ambroise.muhayimana@example.com",
                    },
                    date: {
                        type: "string",
                        description: "Date of subscription",
                        example: "2024-03-22T10:00:00Z",
                    },
                },
            },

            User: {
                type: "object",
                properties: {
                    fullName: {
                        type: "string",
                        description: "Full name of the user",
                        example: "John Doe",
                    },
                    email: {
                        type: "string",
                        description: "Email address of the user",
                        example: "ambroise.muhayimana@example.com",
                    },
                    gender: {
                        type: "string",
                        description: "Gender of the user",
                        example: "male",
                        enum: ["male", "female", "other"],
                    },
                    password: {
                        type: "string",
                        description: "Password of the user",
                        example: "password123",
                    },
                    confirmPassword: {
                        type: "string",
                        description: "Confirm password of the user",
                        example: "password123",
                    },
                    userRole: {
                        type: "string",
                        description: "Role of the user",
                        example: "user",
                        enum: ["admin", "user"],
                    },
                },
            },
        },
    },
};
