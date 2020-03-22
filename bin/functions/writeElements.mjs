import { toPascalCase } from './toPascalCase.mjs';
import { writeFile } from './writeFile.mjs';

export async function writeElements(elements, config) {
  await elements.map(comp => {
    const HTML = comp.html;
    const CSS = comp.css;
    const NAME = toPascalCase(comp.name);
    const FOLDER = `${config.outputFolderElements}/${NAME}`;
    const METADATA = {
      element: comp.element,
      html: comp.html
    };
    const TEMPLATES = config.templates;

    // Write React component
    writeFile(HTML, FOLDER, NAME, 'component', 'jsx', null, TEMPLATES);

    // Write Styled component
    writeFile(CSS, FOLDER, NAME, 'style', 'jsx', null, TEMPLATES);

    // Write CSS
    writeFile(CSS, FOLDER, NAME, 'css', 'mjs', null, TEMPLATES);

    // Write Storybook component
    writeFile(CSS, FOLDER, NAME, 'story', 'js', METADATA, TEMPLATES);
  });
}
