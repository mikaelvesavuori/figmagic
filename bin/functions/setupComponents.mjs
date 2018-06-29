import { getSubComponents } from "./getSubComponents.mjs";
import { mapDimensionToGridUnits } from "./mapDimensionToGridUnits.mjs";
import { getDimension } from "./getDimension.mjs";

export function setupComponents(figmaComponents, componentsPage) {
  let components = [];

  Object.values(figmaComponents).forEach((component, index) => {
    const unitWidth = getDimension(component.name, "width", componentsPage);
    const mappedDimensions = mapDimensionToGridUnits(unitWidth, "width");

    const gridWidth = mappedDimensions.gridWidth;
    const perfectlyFitsGrid = mappedDimensions.perfectlyFitsGrid;

    const unitHeight = getDimension(component.name, "height", componentsPage);

    let componentObject = {
      name: component.name,
      gridWidth,
      perfectlyFitsGrid,
      pxWidth: unitWidth,
      pxHeight: unitHeight,
      description: component.description,
      subComponents: getSubComponents(component.name, componentsPage),
      id: Object.keys(figmaComponents)[index]
    };

    // Remove zero-length subComponents property
    if (componentObject.subComponents.length === 0) {
      delete componentObject.subComponents;
    }

    components.push(componentObject);
  });

  return components;
}
