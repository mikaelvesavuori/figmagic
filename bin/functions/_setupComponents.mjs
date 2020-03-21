import { writeFile } from './writeFile.mjs';
import { generateHtml } from './generateHtml.mjs';
import { inferCssFromComponent } from './inferCssFromComponent.mjs';
import { parseCssFromDescription } from './parseCssFromDescription.mjs';
//import { toPascalCase } from './toPascalCase.mjs';

// Returns array of objects
export function setupComponents(components, componentSheet, tokens) {
  //console.log(componentSheet.children[0].absoluteBoundingBox); ---> { x: -287, y: -367, width: 480, height: 500 }

  const COMPONENTS = (() => {
    const _MATCHES = [];

    //const CREATED_COMPONENTS = [];

    // Check all frames
    componentSheet.children.forEach(frame => {
      // Check all components in frame
      frame.children.forEach(component => {
        const newComponent = {
          ...component
        };

        const ID = component.id;
        let css = '';
        let markup = '';

        // DEMO: Only check modal
        if (component.name === 'Modal') {
          // Make recursive?
          component.children.forEach(item => {
            css += inferCssFromComponent(item);

            /*
            if (item.type.toLowerCase() === 'instance') {
              console.log('this is an instance');
              // ID of button will be 2612:8
              console.log(item.children);
            }

            if (item.type.toLowerCase() === 'group') {
              console.log('this is a group');
						}
						*/
          });

          markup += generateHtml(css);
        }

        if (components[ID]) {
          const { cssString, metadata } = parseCssFromDescription(
            components[ID].description,
            tokens
          );

          css += cssString;

          newComponent.metadata = metadata;
        }

        newComponent.css = css;
        newComponent.metadata.markup = markup;

        _MATCHES.push(newComponent);
      });
    });

    return _MATCHES;
  })();

  COMPONENTS.forEach(comp => {
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
