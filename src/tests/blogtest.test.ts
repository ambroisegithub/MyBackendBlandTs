import supertest from "supertest";
import { app, server, connectToDatabase } from "./index.test";
import { Blog } from "../Models/BlogModel";

const request = supertest(app);

beforeAll(async () => {
  await connectToDatabase();
});

// Delete all data from the database
afterAll(async () => {
  await Blog.deleteMany({});
  server.close();
});

describe("Blog CRUD Operations", () => {
    let createdBlogId: string;
  
    it("creates a new blog with valid data", async () => {
      const blogData = {
        blogTitle: "Test Blog Title",
        blogDescription: "Test Blog Description",
        blogDate: new Date(),
        blogImage: "test_image_url.jpg",
      };
  
      const response = await request.post("/api/blog").send(blogData);
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("blogTitle", blogData.blogTitle);
      expect(response.body.data).toHaveProperty("blogDescription", blogData.blogDescription);
      expect(response.body.data).toHaveProperty("blogDate");
      expect(response.body.data).toHaveProperty("blogImage", blogData.blogImage);
  
      createdBlogId = response.body.data._id;
    });
  
    it("returns 400 with error message for invalid blog data", async () => {
      const invalidBlogData = {
        // Invalid data without blogTitle
        blogDescription: "Test Blog Description",
        blogDate: new Date(),
        blogImage: "test_image_url.jpg",
      };
  
      const response = await request.post("/api/blog").send(invalidBlogData);
  
      expect(response.status).toBe(400);
      expect(response.text).toContain("blogTitle is required");
    });
  
    it("gets all blogs", async () => {
      const response = await request.get("/api/blog/all");
  
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  
    it("gets single blog by ID", async () => {
      const response = await request.get(`/api/blog/${createdBlogId}`);
  
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("_id", createdBlogId);
    });
  
    it("returns 404 when blog is not found", async () => {
      const nonExistingBlogId = "609df8e15715ab2374e0e29f";
  
      const response = await request.get(`/api/blog/${nonExistingBlogId}`);
  
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Blog not found");
    });
  
    it("updates blog data", async () => {
      const updatedBlogData = {
        blogTitle: "Updated Blog Title",
        blogDescription: "Updated Blog Description",
        blogDate: new Date(),
        blogImage: "updated_image_url.jpg",
      };
  
      const response = await request
        .put(`/api/blog/${createdBlogId}`)
        .send(updatedBlogData);
  
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("blogTitle", updatedBlogData.blogTitle);
      expect(response.body.data).toHaveProperty("blogDescription", updatedBlogData.blogDescription);
      expect(response.body.data).toHaveProperty("blogDate");
      expect(response.body.data).toHaveProperty("blogImage", updatedBlogData.blogImage);
    });
  
    it("returns 404 when updating non-existing blog", async () => {
      const nonExistingBlogId = "609df8e15715ab2374e0e29f";
  
      const response = await request.put(`/api/blog/${nonExistingBlogId}`).send({
        blogTitle: "Updated Blog Title",
        blogDescription: "Updated Blog Description",
        blogDate: new Date(),
        blogImage: "updated_image_url.jpg",
      });
  
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Blog not found");
    });
  
    it("deletes blog", async () => {
      const response = await request.delete(`/api/blog/${createdBlogId}`);
  
      expect(response.status).toBe(204);
  
      // Verify if the blog was actually deleted from the database
      const deletedBlog = await Blog.findById(createdBlogId);
      expect(deletedBlog).toBeNull();
    });
  
    it("returns 404 when attempting to delete non-existing blog", async () => {
      const nonExistingBlogId = "609df8e15715ab2374e0e29f";
  
      const response = await request.delete(`/api/blog/${nonExistingBlogId}`);
  
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Blog not found");
    });
  });
