const request = require("supertest");
const app = require("../app");

describe("GET /tasks", () => {
  test("returns 200 with a JSON array", async () => {
    const res = await request(app).get("/tasks");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("returns an empty array when no tasks have been created", async () => {
    const res = await request(app).get("/tasks");

    expect(res.body).toEqual([]);
  });

  test("reflects tasks created via POST /tasks", async () => {
    const created = await request(app).post("/tasks").send({ title: "Write tests" });

    const res = await request(app).get("/tasks");

    expect(res.body).toContainEqual(created.body);
  });
});

describe("DELETE /tasks/:id", () => {
  test("deletes an existing task and removes it from GET /tasks", async () => {
    const created = await request(app).post("/tasks").send({ title: "Delete me" });

    const res = await request(app).delete(`/tasks/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(created.body);

    const listRes = await request(app).get("/tasks");
    expect(listRes.body).not.toContainEqual(created.body);
  });

  test("returns 404 when the task does not exist", async () => {
    const res = await request(app).delete("/tasks/9999");

    expect(res.status).toBe(404);
  });
});
