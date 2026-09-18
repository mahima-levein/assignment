const { validateTask } = require("../src/validators");

describe("validateTask", () => {
  test("accepts valid input", () => {
    const result = validateTask({
      title: "Complete assignment",
      priority: "high"
    });

    expect(result).toEqual({
      title: "Complete assignment",
      priority: "high"
    });
  });

  test("rejects a missing title", () => {
    expect(() => {
      validateTask({ priority: "low" });
    }).toThrow();
  });

  test("rejects a title shorter than 3 characters", () => {
    expect(() => {
      validateTask({ title: "Hi" });
    }).toThrow();
  });

  test("rejects a title longer than 100 characters", () => {
    expect(() => {
      validateTask({
        title: "a".repeat(101)
      });
    }).toThrow();
  });

  test("rejects an invalid priority", () => {
    expect(() => {
      validateTask({
        title: "Complete assignment",
        priority: "urgent"
      });
    }).toThrow();
  });

  test("uses medium as the default priority", () => {
    const result = validateTask({
      title: "Complete assignment"
    });
    expect(result.priority).toBe("medium");
  });

  test("rejects a non-string title", () => {
    expect(() => {
      validateTask({ title: 12345 });
    }).toThrow();
  });

  test("rejects a whitespace-only title", () => {
    expect(() => {
      validateTask({ title: "     " });
    }).toThrow();
  });

  test("trims surrounding whitespace from a valid title", () => {
    const result = validateTask({ title: "  Complete assignment  " });
    expect(result.title).toBe("Complete assignment");
  });
});