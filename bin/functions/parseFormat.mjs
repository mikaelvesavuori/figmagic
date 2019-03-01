export function parseFormat(value) {
  if (value === undefined) {
    return "mjs";
  } else {
    if (value.toLowerCase() === "mjs" || value.toLowerCase() === "js") {
      return value.toLowerCase();
    } else return "mjs";
  }
}
