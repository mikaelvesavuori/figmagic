import { toPascalCase } from './toPascalCase.mjs';
import { writeFile } from './writeFile.mjs';

export async function writeElements(elements, config) {
  await elements.map(comp => {
    const HTML = comp.html;
    const CSS = comp.css;
    const DESCRIPTION = comp.description || ' ';
    const NAME = toPascalCase(comp.name);
    const FOLDER = `${config.outputFolderElements}/${NAME}`;
    const METADATA = {
      element: comp.element,
      html: comp.html,
      extraProps: comp.extraProps
    };
    const TEMPLATES = config.templates;

    // Write React component
    console.log('METADATA', METADATA);
    writeFile(HTML, FOLDER, NAME, 'component', 'jsx', METADATA, TEMPLATES);

    // Write Styled component
    writeFile(CSS, FOLDER, NAME, 'style', 'jsx', null, TEMPLATES);

    // Write CSS
    writeFile(CSS, FOLDER, NAME, 'css', 'mjs', null, TEMPLATES);

    // Write Storybook component
    writeFile(CSS, FOLDER, NAME, 'story', 'js', METADATA, TEMPLATES);

    // Write description markdown file
    writeFile(DESCRIPTION, FOLDER, NAME, 'description', 'md');
  });
}
