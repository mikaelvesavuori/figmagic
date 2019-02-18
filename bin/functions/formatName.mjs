export function formatName(str) {
  if (str) {
    const forbiddenCharacters = ["-", "–", "—", "|", "."];

    let fixedString = str;

    forbiddenCharacters.forEach(char => {
      fixedString = fixedString.replace(char, "");
    });

    return fixedString;
  } else console.error("No string for formatName()!");
}
