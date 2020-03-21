import { writeFile } from './writeFile.mjs';

export async function writeElements(elements) {
  await elements.map(comp => {
    console.log('COMP', comp);

    const CSS = comp.css;

    // TODO: Add folder support, e.g. `components/${NAME}`
    //const NAME = toPascalCase(comp.name);
    const FOLDER = 'components';

    // Write React component
    writeFile(CSS, FOLDER, comp.name, 'component', 'jsx', comp.metadata);

    // Write Styled component, and pass metadata
    writeFile(CSS, FOLDER, comp.name, 'style', 'jsx', comp.metadata);

    // Write CSS
    writeFile(CSS, FOLDER, comp.name, 'css', 'mjs');

    // Write Storybook component
    //writeFile(CSS, FOLDER, comp.name, 'storybook', 'js');
  });
}
