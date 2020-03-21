import { writeFile } from './writeFile.mjs';

export async function writeElements(elements) {
  await elements.map(comp => {
    console.log('COMP', comp);

    // TODO: Add folder support, e.g. `components/${NAME}`
    const HTML = comp.html;
    const CSS = comp.css;
    const NAME = comp.name; //toPascalCase(comp.name);
    const FOLDER_COMP = 'components';
    const FOLDER_STORY = 'stories';
    const METADATA = {
      element: comp.element,
      html: comp.html
    };

    // Write React component
    writeFile(HTML, FOLDER_COMP, NAME, 'component', 'jsx');

    // Write Styled component
    writeFile(CSS, FOLDER_COMP, NAME, 'style', 'jsx');

    // Write CSS
    writeFile(CSS, FOLDER_COMP, NAME, 'css', 'mjs');

    // Write Storybook component
    writeFile(CSS, FOLDER_STORY, NAME, 'story', 'js', METADATA);
  });
}
