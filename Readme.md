

# Backend TypeScript API README

[![Node.js CI](https://github.com/ambroisegithub/MyBackendBlandTs/actions/workflows/node.js.yml/badge.svg)](https://github.com/ambroisegithub/MyBackendBlandTs/actions/workflows/node.js.yml)


This is a TypeScript backend API built with Express.js. It provides endpoints for various functionalities including managing blogs, comments, subscriptions, contact us messages, and user authentication.

## Installation

- repository_url=https://github.com/ambroisegithub/MyBackendBlandTs.git

1. Clone the repository:
    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:
    ```bash
    cd <project_directory>
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

## Configuration

Before running the application, make sure to set up the necessary environment variables. Create a `.env` file in the root directory and define the following variables:

MONGODB_URL=<Your Url>
PORT=9999
CLOUDINARYNAME=<Your Cloud_name>
APIKEY=<.....>
APISECRET=<.....>
JWT_SECRET=<......>
MONGODB_URL_TEST=<.....>
PORT_TEST=7777




## Endpoints

## Global Endpoint
- api/v1
- api/blog
### Blog Endpoints

#### Create a Blog
- Method: POST
- URL: `/post-blog`
- Payload: FormData with 'blogImage' field and other blog details
- Middleware: Authorization
- Controller: BlogController.createBlog

#### Update a Blog
- Method: PUT
- URL: `/update-blog/:id`
- Payload: FormData with 'blogImage' field and other updated blog details
- Controller: BlogController.updateBlog

#### Get All Blogs
- Method: GET
- URL: `/getall-blog`
- Controller: BlogController.getAllBlogs

#### Get One Blog
- Method: GET
- URL: `/getone-blog/:id`
- Controller: BlogController.getOneBlog

#### Delete a Blog
- Method: DELETE
- URL: `/delete-blog/:id`
- Controller: BlogController.deleteBlog

### Comment Endpoints

#### Add a Comment
- Method: POST
- URL: `/:blogId/comments`
- Middleware: UserMiddleware
- Controller: CommentsLikesController.addComment

#### Like a Blog
- Method: POST
- URL: `/:blogId/like`
- Middleware: UserMiddleware
- Controller: CommentsLikesController.likeBlog

### Contact Us Endpoints

#### Create a Contact Us Message
- Method: POST
- URL: `/post-contact-us`
- Controller: ContactUsController.createContactUs

#### Update a Contact Us Message
- Method: PUT
- URL: `/update-contact-us/:id`
- Controller: ContactUsController.updateContactUs

#### Get All Contact Us Messages
- Method: GET
- URL: `/getall-contact-us`
- Controller: ContactUsController.getAllContactUs

#### Get One Contact Us Message
- Method: GET
- URL: `/getone-contact-us/:id`
- Controller: ContactUsController.getOneContactUs

#### Delete a Contact Us Message
- Method: DELETE
- URL: `/delete-contact-us/:id`
- Controller: ContactUsController.deleteContactUs

### Subscription Endpoints

#### Create a Subscription
- Method: POST
- URL: `/post-subscribe`
- Controller: SubscribeController.createSubscribe

#### Update a Subscription
- Method: PUT
- URL: `/update-subscribe/:id`
- Controller: SubscribeController.updateSubscribe

#### Get All Subscriptions
- Method: GET
- URL: `/getall-subscribe`
- Controller: SubscribeController.getAllSubscriptions

#### Get One Subscription
- Method: GET
- URL: `/getone-subscribe/:id`
- Controller: SubscribeController.getOneSubscription

#### Delete a Subscription
- Method: DELETE
- URL: `/delete-subscribe/:id`
- Controller: SubscribeController.deleteSubscription

### User Endpoints

#### Create a User (Signup)
- Method: POST
- URL: `/signup`
- Controller: UserController.createUser

#### Get All Users
- Method: GET
- URL: `/all`
- Controller: UserController.getAllUsers

#### Get User by ID
- Method: GET
- URL: `/:id`
- Controller: UserController.getUserById

#### Update User
- Method: PUT
- URL: `/:id`
- Controller: UserController.updateUser

#### Delete User
- Method: DELETE
- URL: `/:id`
- Controller: UserController.deleteUser

#### User Login
- Method: POST
- URL: `/login`
- Controller: UserController.loginUser

## Running the Application

To run the application, execute the following command:

```bash
npm run start:dev

The API will start listening on the configured port (default: 3000).

Author

[Your Name]


Replace `<repository_url>` with the URL of your Git repository, and `[Your Name]` with your name or your team's name.

This README provides a comprehensive guide on how to set up, configure, run, and use your backend TypeScript API, including detailed information about each endpoint.


