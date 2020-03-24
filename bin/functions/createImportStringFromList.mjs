export function createImportStringFromList(importArray) {
  let importString = ``;

  importArray.map(i => {
    importString += `import ${i} from 'tokens/${i}.mjs';\n`;
  });

  return importString;
}
