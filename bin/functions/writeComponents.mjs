import { camelize } from "./camelize.mjs";
import { formatName } from "./formatName.mjs";
import { writeFile } from "./writeFile.mjs";

export function writeComponents(components) {
  components.forEach(component => {
    let componentName = camelize(component.name);
    componentName = formatName(componentName);

    writeFile(
      `const ${componentName} = ${JSON.stringify(
        component,
        null,
        " "
      )}\n\nexport default ${componentName}`,
      "specs",
      `${componentName}.mjs`
    );
  });
}
