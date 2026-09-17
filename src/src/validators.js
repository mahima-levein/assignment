const VALID_PRIORITIES = ["low", "medium", "high"];

function validateTask(input) {
  const { title, priority = "medium" } = input;

  if (!title || title.length < 3 || title.length > 100) {
    throw new Error("Invalid title");
  }

  if (!VALID_PRIORITIES.includes(priority)) {
    throw new Error("Invalid priority");
  }

  return { title, priority };
}

module.exports = { validateTask };
