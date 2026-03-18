import { test, expect } from "@fixtures/test";

test.describe("JSONPlaceholder /users", () => {
  test("GET /user/{id} - read a single user", async ({ request }) => {
    const response = await request.get("/users/1");
    expect(response.ok()).toBeTruthy();
    const user = await response.json();
    expect(user).toBeInstanceOf(Object);
  });

  test("POST /users - create a new user", async ({ request }) => {
    const response = await request.post("/users", {
      headers: {
        "X-Custom-Header": "pwapi-logger",
      },
      data: {
        name: "John Doe",
        username: "johndoe",
        email: "johndoe@example.com",
      },
    });
    expect(response.ok()).toBeTruthy();
    const user = await response.json();
    expect(user).toBeInstanceOf(Object);
  });

  test("PUT /users/{id} - replace a user", async ({ request }) => {
    const response = await request.put("/users/1", {
      data: {
        name: "John Doe Updated",
        username: "johndoe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        website: "johndoe.com",
      },
    });
    expect(response.ok()).toBeTruthy();
    const user = await response.json();
    expect(user).toBeInstanceOf(Object);
  });

  test("PATCH /users/{id} - partial update a user", async ({ request }) => {
    const response = await request.patch("/users/1", {
      data: {
        email: "newemail@example.com",
      },
    });
    expect(response.ok()).toBeTruthy();
    const user = await response.json();
    expect(user).toBeInstanceOf(Object);
  });

  test("DELETE /users/{id} - delete a user", async ({ request }) => {
    const response = await request.delete("/users/1");
    expect(response.ok()).toBeTruthy();
  });
});
