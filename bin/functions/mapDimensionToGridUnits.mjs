import { getGridUnitCount } from "./getGridUnitCount.mjs";
import grid from "../../../../tokens/grid.mjs"; // For dev: '../../tokens/grid.mjs'; For package use: '../../../../tokens/grid.mjs'

/* TODO
** Map heights as well?
*/

export function mapDimensionToGridUnits(pxValue, dimension) {
  if (dimension === "width") {
    const maxWidth = grid.totalWidth; // Canvas max width? (Desktop mode)
    // Assume columns
    const gridCount = grid.columnsCount;
    const offset = grid.columnsOffset;
    const gutterSize = grid.columnsGutterSize;

    const totalGutterSize = (gridCount - 1) * gutterSize;
    const divisibleArea = maxWidth - totalGutterSize - offset * 2;
    const gridSize = Math.round(divisibleArea / gridCount);
    const gridWidth = getGridUnitCount(
      pxValue,
      gridSize,
      gridCount,
      gutterSize
    );
    const perfectlyFitsGrid =
      pxValue === gridWidth * gridSize + gutterSize * (gridWidth - 1);

    const mappedComponent = {
      gridWidth: gridWidth,
      perfectlyFitsGrid: perfectlyFitsGrid
    };

    return mappedComponent;
  } else {
    console.warn(
      "Currently Figmagic only supports mapping the width dimension!"
    );
    return;
  }
}
