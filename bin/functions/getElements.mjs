export function getElements(elementsPage, config, components) {
  const _ELEMENTS = elementsPage.filter(element => element.type === 'COMPONENT');
  const ELEMENTS = addDescriptionToElements(_ELEMENTS, components);
  console.log(ELEMENTS[0].children);

  // Get type and write basic HTML
  ELEMENTS.forEach(el => {
    let html = ``;

    let elementType = el.description;
    elementType = elementType.split('}}')[0].replace('{{', '');
    console.log(elementType);

    html += `<${elementType}>xxxx</${elementType}>`;

    console.log(html);

    let css = ``;
  });
}

const addDescriptionToElements = (elements, components) => {
  return elements.map(el => {
    const a = el;
    a.description = components[el.id].description;
    return a;
  });
};

// Create CSS from: styles: { fill: '1:106', effect: '2657:135' }?
