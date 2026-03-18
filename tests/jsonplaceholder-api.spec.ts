import { test, expect } from "@playwright/test";

test.describe("JSONPlaceholder /users", () => {
  test("GET /users - read all users", async ({ request }) => {
    const response = await request.get("/users");
    expect(response.ok()).toBeTruthy();
    const users = await response.json();
    expect(users).toBeInstanceOf(Array);
  });
});
