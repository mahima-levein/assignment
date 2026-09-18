const VALID_PRIORITIES = ["low", "medium", "high"];

function validateTask(input) {
  const { title, priority = "medium" } = input;

  if (typeof title !== "string") {
    throw new Error("Invalid title");
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length < 3 || trimmedTitle.length > 100) {
    throw new Error("Invalid title");
  }

  if (!VALID_PRIORITIES.includes(priority)) {
    throw new Error("Invalid priority");
  }

  return { title: trimmedTitle, priority };
}

module.exports = { validateTask };
