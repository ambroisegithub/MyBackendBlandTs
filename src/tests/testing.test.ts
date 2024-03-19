import supertest from "supertest";
import { app, server, connectToDatabase } from "./index.test";
import { User } from "../Models/UserModel";
import bcrypt from "bcryptjs";
import UserMiddleware from "../Middlewares/UserMiddleware";
import { Authorization } from "../Middlewares/Authorization";
import path from "path";
import fs from "fs";
import { Blog } from "../Models/BlogModel";
import jwt from "jsonwebtoken";
const request = supertest(app);
beforeAll(async () => {
  await connectToDatabase();
});

// Delete all data from the database
afterAll(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  server.close();
});
describe("User Signup", () => {


  it("creates a new user with valid data", async () => {
    const userData = {
      fullName: "Ambroise Muhayimana",
      email: "ambroise@muhayimana.com",
      gender: "male",
      password: "password123",
      confirmPassword: "password123",
      userRole: "user",
    };

    const response = await request.post("/api/user/signup").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.message).toBe("User successfully added");

    // Verify if the user was actually saved in the database
    const savedUser = await User.findOne({ email: userData.email });
    expect(savedUser).toBeDefined();
    expect(savedUser!.fullName).toBe(userData.fullName);
    expect(savedUser!.email).toBe(userData.email);
    expect(savedUser!.gender).toBe(userData.gender);
    expect(savedUser!.userRole).toBe(userData.userRole);

    // Verify password encryption
    const isPasswordValid = await bcrypt.compare(
      userData.password,
      savedUser!.password
    );
    expect(isPasswordValid).toBe(true);
  });

  it("returns 400 with error message for invalid user data", async () => {
    const invalidUserData = {
      fullName: "Ambroise Muhayimana",
      email: "invalidemail",
      gender: "male",
      password: "pass",
      confirmPassword: "pass",
    };

    const response = await request
      .post("/api/user/signup")
      .send(invalidUserData);

    expect(response.status).toBe(400);
    expect(response.text).toContain("must be a valid email");
  });

  it("returns 409 with error message for existing user", async () => {
    const existingUserData = {
      fullName: "Existing User",
      email: "ambroise@muhayimana.com",
      gender: "female",
      password: "password123",
      confirmPassword: "password123",
    };

    const response = await request
      .post("/api/user/signup")
      .send(existingUserData);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("This user already exists");
  });

  // Test for getting all users
  it("gets all users", async () => {
    const response = await request.get("/api/user/all");

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  // Test for getting single user by ID
  it("gets single user by ID", async () => {
    // Assuming there is a user created in the database already
    const existingUser = await User.findOne({});
    if (!existingUser) {
      throw new Error("No user found in the database");
    }

    const response = await request.get(`/api/user/${existingUser._id}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("fullName", existingUser.fullName);
    expect(response.body.data).toHaveProperty("email", existingUser.email);
    expect(response.body.data).toHaveProperty("gender", existingUser.gender);
    expect(response.body.data).toHaveProperty("userRole", existingUser.userRole);
  });

// Test for getting single user by ID when user is not found
it("returns 404 when user is not found", async () => {
  // Generate a random non-existing user ID
  const nonExistingUserId = "609df8e15715ab2374e0e29f";

  // Make a request to get user by non-existing ID
  const response = await request.get(`/api/user/${nonExistingUserId}`);

  // Assertions
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty("message", "User not found");
});
// Test for updating user
it("updates user data", async () => {
  // Assuming there is a user created in the database already
  const existingUser = await User.findOne({});
  if (!existingUser) {
    throw new Error("No user found in the database");
  }

  const updatedData = {
    fullName: "Updated Name",
    email: "updatedemail@example.com",
    gender: "other",
    password: "newpassword123",
    confirmPassword: "newpassword123",
    userRole: "admin",
  };

  const response = await request
    .put(`/api/user/${existingUser._id}`)
    .send(updatedData);

  expect(response.status).toBe(200);
  expect(response.body.data).toHaveProperty("fullName", updatedData.fullName);
  expect(response.body.data).toHaveProperty("email", updatedData.email);
  expect(response.body.data).toHaveProperty("gender", updatedData.gender);
  expect(response.body.data).toHaveProperty("userRole", updatedData.userRole);

  // Verify that no validation errors occur
  expect(response.body).not.toHaveProperty("error");

  // Verify that the user is found and updated successfully
  const updatedUser = await User.findById(existingUser._id);
  expect(updatedUser).toBeTruthy();
  expect(updatedUser!.fullName).toBe(updatedData.fullName);
  expect(updatedUser!.email).toBe(updatedData.email);
  expect(updatedUser!.gender).toBe(updatedData.gender);
  expect(updatedUser!.userRole).toBe(updatedData.userRole);
});

// Test for updating user with invalid data
it("returns 400 with error message for invalid user data during update", async () => {
  // Assuming there is a user created in the database already
  const existingUser = await User.findOne({});
  if (!existingUser) {
    throw new Error("No user found in the database");
  }

  const invalidData = {
    fullName: "", // invalid data
    email: "updatedemail@example.com",
    gender: "other",
    password: "newpassword123",
    confirmPassword: "newpassword123",
    userRole: "admin",
  };

  const response = await request
    .put(`/api/user/${existingUser._id}`)
    .send(invalidData);

  expect(response.status).toBe(400);
  expect(response.text).toContain("\"fullName\" is not allowed to be empty");

  // Verify that no user is updated with invalid data
  const userAfterUpdate = await User.findById(existingUser._id);
  expect(userAfterUpdate).toBeTruthy();
  expect(userAfterUpdate!.fullName).not.toBe("");
});

// Test for updating user that doesn't exist
it("returns 404 when updating non-existing user", async () => {
  // Generate a random non-existing user ID
  const nonExistingUserId = "609df8e15715ab2374e0e29f";

  const updatedData = {
    fullName: "Updated Name",
    email: "updatedemail@example.com",
    gender: "other",
    password: "newpassword123",
    confirmPassword: "newpassword123",
    userRole: "admin",
  };

  const response = await request
    .put(`/api/user/${nonExistingUserId}`)
    .send(updatedData);

  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty("message", "User not found");
});



it("deletes user", async () => {
  // Assuming there is a user created in the database already
  const existingUser = await User.findOne({});
  if (!existingUser) {
    throw new Error("No user found in the database");
  }

  const response = await request.delete(`/api/user/${existingUser._id}`);

  expect(response.status).toBe(204);

  // Verify if the user was actually deleted from the database
  const deletedUser = await User.findById(existingUser._id);
  expect(deletedUser).toBeNull();
});

// Test for attempting to delete a user that doesn't exist
it("returns 404 when attempting to delete non-existing user", async () => {
  // Generate a random non-existing user ID
  const nonExistingUserId = "609df8e15715ab2374e0e29f";

  const response = await request.delete(`/api/user/${nonExistingUserId}`);

  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty("message", "User not found");
});
    let token:string;
    
    it("should log in a user", async () => {
    // Create a user first
    const userData = {
      fullName: "Ambroise Muhayimana",
      email: "ambroise@muhayimana.com",
      gender: "male",
      password: "password123",
      confirmPassword: "password123",
      userRole: "user",
    };

    await request.post("/api/user/signup").send(userData);

    const res = await request.post("/api/user/login").send({
   
      email: "ambroise@muhayimana.com",
      password: "password123"
    });
    console.log("Login Response:", res.body);
    expect(res.status).toEqual(200); 
    expect(res.body).toHaveProperty("message", "Login successful");
    expect(res.body).toHaveProperty("token");
  });
    
    
    it("should return 401 for Invalid credentials", async () => {
      const res = await request.post("/api/user/login").send({
      email: "ambroise@muhayimana.com",
      password: "invalid"
      });
      console.log("Invalid Credentials Response:", res.body);
      expect(res.status).toEqual(401);
      expect(res.body).toHaveProperty("message", "Invalid credentials");
    });
    
    
    it("should return 404 when an email not found", async () => {
      const res = await request.post("/api/user/login").send({
        email: "invalid@test.com",
        password: "password"
      });
      console.log("Email Not Found Response:", res.body);
      expect(res.status).toEqual(404);
      expect(res.body).toHaveProperty("message", "User not found");
    });
    
    it("should return 404 when a password does not match", async () => {
      const res = await request.post("/api/user/login").send({
      email: "ambroise@muhayimana.com",
      password: "wrongpassword"
      });
      console.log("Password Does Not Match Response:", res.body);
      expect(res.status).toEqual(401);
      expect(res.body).toHaveProperty("message", "Invalid credentials");
    });
    
    
  })
  
  

  describe("Authorization Middleware", () => {
    let token: string;
  
    beforeEach(() => {
      const mockUser = new User({
        email: "test@test.com",
        fullName: "Test User",
        password: "password123",
        userRole: "admin",
      });
      token = jwt.sign({ id: mockUser._id }, process.env.JWT_SECRET || "");
    });
  

    it("should return 401 for non-admin user", async () => {
      // Change the user role to 'user' to simulate non-admin user
      const mockUser = new User({
        email: "test@test.com",
        fullName: "Test User",
        password: "password123",
        userRole: "user",
      });
      const token = jwt.sign({ id: mockUser._id }, process.env.JWT_SECRET || "");
  
      const req: any = {
        headers: {
          authorization: token,
        },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
  
      await Authorization(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "This action is permitted only for admins.",
      });
      expect(next).not.toHaveBeenCalled();
    });
  

  
    it("should return 401 for expired token", async () => {
      const expiredToken = jwt.sign(
        { id: "mockusers._id" },
        process.env.JWT_SECRET || "",
        { expiresIn: 0 }
      );
      const req: any = {
        headers: {
          authorization: expiredToken,
        },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
  
      await Authorization(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Check if your token is valid.",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
  
  describe("User Middleware", () => {
    let token: string;
  
    beforeEach(() => {
      const mockUser = new User({
        email: "test@test.com",
        fullName: "Test User",
        password: "password123",
        userRole: "user",
      });
      token = jwt.sign({ id: mockUser._id }, process.env.JWT_SECRET || "");
    });
  
    it("should return 401 for invalid token", async () => {
      const req: any = {
        headers: {
          authorization: "invalidToken",
        },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
  
      await UserMiddleware(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid token",
      });
      expect(next).not.toHaveBeenCalled();
    });
  
    it("should return 401 for expired token", async () => {
      const expiredToken = jwt.sign(
        { id: "mockusers._id" },
        process.env.JWT_SECRET || "",
        { expiresIn: 0 }
      );
      const req: any = {
        headers: {
          authorization: expiredToken,
        },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
  
      await UserMiddleware(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Token expired",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });


  describe("Blog API Testing", () => {
    let adminToken:string;
     let existingBlog: any;
    beforeAll(async () => {
       // Create an admin user
       const adminUser = new User({
         email: "admin@example.com",
         fullName: "Admin User",
         gender:"male",
         password: "admin123",
         userRole: "admin",
       });
       await adminUser.save();
   
       // Generate a JWT token for the admin user
       adminToken = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET || "", {
         expiresIn: "20h",
       });
       
  // Create an example blog
  existingBlog = new Blog({
    blogTitle: "Example Blog",
    blogDescription: "This is an example blog",
    blogDate: new Date().toISOString(),
    blogImage: "test.jpeg",
  });
  await existingBlog.save();
    });
   
    it("should create a new blog with valid data when user is an admin", async () => {
       const blogData = {
         blogTitle: "Test Blog",
         blogDescription: "This is a test blog",
         blogDate: new Date().toISOString(),
         blogImage: "test.jpeg",
       };
   
       // Ensure the file exists at the specified path
       const filePath = path.join(__dirname, "test.jpeg");
       if (!fs.existsSync(filePath)) {
         throw new Error("Test file not found");
       }
   
       const response = await request
         .post("/api/blog/post-blog")
         .set("Authorization", `${adminToken}`)
         .field("blogTitle", blogData.blogTitle)
         .field("blogDescription", blogData.blogDescription)
         .field("blogDate", blogData.blogDate)
         .attach("blogImage", filePath);
   
       expect(response.status).toBe(201);
       expect(response.body).toHaveProperty("message", "Blog successfully created");
       expect(response.body).toHaveProperty("data");
       expect(response.body.data).toHaveProperty("blogTitle", blogData.blogTitle);
       expect(response.body.data).toHaveProperty("blogDescription", blogData.blogDescription);
       expect(response.body.data).toHaveProperty("blogDate", new Date(blogData.blogDate).toISOString());
       expect(response.body.data).toHaveProperty("blogImage", expect.stringContaining("https://res.cloudinary.com"));
                 
    });


    it("should return 200 when updating an existing blog with valid data including a new image", async () => {
      // Prepare the update data
      const updateData = {
         blogTitle: "Updated Title",
         blogDescription: "Updated Description",
         blogDate: new Date().toISOString(),
      };
     
      // Ensure the file exists at the specified path
      const filePath = path.join(__dirname, "update.jpeg");
      if (!fs.existsSync(filePath)) {
         throw new Error("Test image file not found");
      }
     
      // Perform the request with the file attached
      const response = await request
         .put(`/api/blog/update-blog/${existingBlog._id}`)
         .set("Authorization", `${adminToken}`)
         .field("blogTitle", updateData.blogTitle)
         .field("blogDescription", updateData.blogDescription)
         .field("blogDate", updateData.blogDate)
         .attach("blogImage", filePath);
     
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Blog successfully updated");
      expect(response.body.data).toHaveProperty("blogTitle", updateData.blogTitle);
      expect(response.body.data).toHaveProperty("blogDescription", updateData.blogDescription);
      expect(response.body.data).toHaveProperty("blogDate", updateData.blogDate);
      // Assuming the updated blog image URL is returned in the response
      expect(response.body.data).toHaveProperty("blogImage");
      expect(response.body.data.blogImage).toBeDefined();
      expect(response.body.data.blogImage).toMatch(/^https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\//);
     });
     
     
     
     
     it("should return 404 when updating a non-existent blog", async () => {
      const nonExistentBlogId = "609df8e15715ab2374e0e29f"; // Use a non-existent ID
      const updateData = {
         blogTitle: "Updated Title",
         blogDescription: "Updated Description",
         blogDate: new Date().toISOString(),
      };
     
      const response = await request
         .put(`/api/blog/update-blog/${nonExistentBlogId}`)
         .set("Authorization", `${adminToken}`)
         .send(updateData);
     
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Blog not found");
     });
     
     
     it("should return 500 for internal server error during blog update", async () => {
      jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error output
      jest.spyOn(Blog, "findByIdAndUpdate").mockRejectedValue(new Error("Internal Server Error"));
     
      const updateData = {
         blogTitle: "Updated Title",
         blogDescription: "Updated Description",
         blogDate: new Date().toISOString(),
      };
     
      const response = await request
         .put(`/api/blog/update-blog/${existingBlog._id}`)
         .set("Authorization", `${adminToken}`)
         .send(updateData);
     
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error", "Internal Server Error");
     });
     
     
      
     it("should return 404 when updating a non-existent blog", async () => {
       const nonExistentBlogId = "609df8e15715ab2374e0e29f"; // Use a non-existent ID
       const updateData = {
          blogTitle: "Updated Title",
          blogDescription: "Updated Description",
          blogDate: new Date().toISOString(),
       };
      
       const response = await request
          .put(`/api/blog/update-blog/${nonExistentBlogId}`)
          .set("Authorization", `${adminToken}`)
          .send(updateData);
      
       expect(response.status).toBe(404);
       expect(response.body).toHaveProperty("message", "Blog not found");
      });

    // Test for getting all blogs
it("should retrieve all blogs and return success", async () => {
  const response = await request.get("/api/blog/getall-blog");
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("data");
  expect(response.body.data).toBeInstanceOf(Array);
});

// Test for getting a single blog by ID
it("should retrieve a single blog and return success", async () => {
  const response = await request.get(`/api/blog/getone-blog/${existingBlog._id}`);
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("data");
  expect(response.body.data).toHaveProperty("blogTitle");
  expect(response.body.data).toHaveProperty("blogDescription");
  expect(response.body.data).toHaveProperty("blogDate");
  expect(response.body.data).toHaveProperty("blogImage");
});

// Test for deleting a blog
it("should delete a blog and return success", async () => {
  const response = await request.delete(`/api/blog/delete-blog/${existingBlog._id}`)
    .set("Authorization", `${adminToken}`);
  expect(response.status).toBe(204);
});


it("should return 400 if blog data is invalid", async () => {
  const invalidBlogData = {
    blogTitle: "", // Invalid data
    blogDescription: "This is an invalid blog",
    blogDate: new Date().toISOString(),
    blogImage: "invalid.png",
  };

  const filePath = path.join(__dirname, "invalid.png");
  if (!fs.existsSync(filePath)) {
    throw new Error("Invalid file not found");
  }

  const response = await request
    .post("/api/blog/post-blog")
    .set("Authorization", `${adminToken}`)
    .field("blogTitle", invalidBlogData.blogTitle)
    .field("blogDescription", invalidBlogData.blogDescription)
    .field("blogDate", invalidBlogData.blogDate)
    .attach("blogImage", filePath);

  expect(response.status).toBe(400);
  expect(response.text).toContain("\"blogTitle\" is not allowed to be empty");
});

it("should return 400 if no file is uploaded", async () => {
  const blogData = {
    blogTitle: "Test Blog",
    blogDescription: "This is a test blog",
    blogDate: new Date().toISOString(),
    blogImage: "test.png",
  };

  const response = await request
    .post("/api/blog/post-blog")
    .set("Authorization", `${adminToken}`)
    .field("blogTitle", blogData.blogTitle)
    .field("blogDescription", blogData.blogDescription)
    .field("blogDate", blogData.blogDate);

  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty("message", "Please upload a file");
});

// Error handling test
it("should return 500 for internal server error", async () => {
  jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error output
  jest.spyOn(Blog.prototype, "save").mockRejectedValue(new Error("Internal Server Error"));

  const blogData = {
    blogTitle: "Test Blog",
    blogDescription: "This is a test blog",
    blogDate: new Date().toISOString(),
    blogImage: "test.png",
  };

  const filePath = path.join(__dirname, "test.png");
  if (!fs.existsSync(filePath)) {
    throw new Error("Test file not found");
  }

  const response = await request
    .post("/api/blog/post-blog")
    .set("Authorization", `${adminToken}`)
    .field("blogTitle", blogData.blogTitle)
    .field("blogDescription", blogData.blogDescription)
    .field("blogDate", blogData.blogDate)
    .attach("blogImage", filePath);

  expect(response.status).toBe(500);
  expect(response.body).toHaveProperty("error", "Internal Server Error");
});





 
 it("should return 404 when retrieving a non-existent blog", async () => {
  const nonExistentBlogId = "609df8e15715ab2374e0e29f"; // Use a non-existent ID
 
  const response = await request.get(`/api/blog/getone-blog/${nonExistentBlogId}`);
 
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty("message", "Blog not found");
 });

 
 it("should return 404 when deleting a non-existent blog", async () => {
  const nonExistentBlogId = "609df8e15715ab2374e0e29f"; // Use a non-existent ID
 
  const response = await request.delete(`/api/blog/delete-blog/${nonExistentBlogId}`)
     .set("Authorization", `${adminToken}`);
 
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty("message", "Blog not found");
 });



// Error handling test for getAllBlogs
it("should return 500 for internal server error during retrieving all blogs", async () => {
  jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error output
  jest.spyOn(Blog, "find").mockRejectedValue(new Error("Internal Server Error"));

  const response = await request.get("/api/blog/getall-blog");
  expect(response.status).toBe(500);
  expect(response.body).toHaveProperty("error", "Internal Server Error");
});

// Error handling test for getOneBlog
it("should return 500 for internal server error during retrieving a single blog", async () => {
  jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error output
  jest.spyOn(Blog, "findById").mockRejectedValue(new Error("Internal Server Error"));

  const response = await request.get(`/api/blog/getone-blog/${existingBlog._id}`);
  expect(response.status).toBe(500);
  expect(response.body).toHaveProperty("error", "Internal Server Error");
});

// Error handling test for deleteBlog
it("should return 500 for internal server error during blog deletion", async () => {
  jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error output
  jest.spyOn(Blog, "findByIdAndDelete").mockRejectedValue(new Error("Internal Server Error"));

  const response = await request.delete(`/api/blog/delete-blog/${existingBlog._id}`)
    .set("Authorization", `${adminToken}`);
  expect(response.status).toBe(500);
  expect(response.body).toHaveProperty("error", "Internal Server Error");
});
 
  });

