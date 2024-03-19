import supertest from "supertest";
import { app, server, connectToDatabase } from "./index.test";
import { User } from "../Models/UserModel";
import bcrypt from "bcryptjs";

const request = supertest(app);
import { Authorization } from "../Middlewares/Authorization";
import jwt from "jsonwebtoken";
import path from "path";
import fs from 'fs';
beforeAll(async () => {
  await connectToDatabase();
});

// Delete all data from the database
afterAll(async () => {
  await User.deleteMany({});
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
  



