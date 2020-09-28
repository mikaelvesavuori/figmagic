"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processNestedCss = void 0;
const errors_1 = require("../../../frameworks/errors/errors");
function processNestedCss(css) {
    if (!css)
        throw new Error(errors_1.ErrorProcessNestedCss);
    const CLASS_NAMES = css.match(/\..* {/gi);
    const CLASS_CONTENT = css.split(/\..* {/gi);
    if (CLASS_CONTENT[0] === ' \n' || CLASS_CONTENT[0] === '\n')
        CLASS_CONTENT.shift();
    const ARRAYS = cleanArrays(CLASS_NAMES, CLASS_CONTENT);
    const INTERSECTING_VALUES = getIntersectingValues(ARRAYS);
    const UNIQUE_VALUES = getUniqueValues(ARRAYS, INTERSECTING_VALUES);
    return createCssString(INTERSECTING_VALUES, UNIQUE_VALUES);
}
exports.processNestedCss = processNestedCss;
function cleanArrays(classNames, classContent) {
    if (!classNames || !classContent)
        throw new Error(errors_1.ErrorCleanArrays);
    const CLASSES = [];
    classContent.forEach((arrayItem, index) => {
        if (index % 2 !== 0)
            return;
        const LAYOUT = arrayItem
            .split(/\n/gi)
            .filter((item) => item)
            .filter((item) => item !== '}');
        const TYPOGRAPHY = classContent[index + 1]
            .split(/\n/gi)
            .filter((item) => item)
            .filter((item) => item !== '}');
        const css = [...LAYOUT, ...TYPOGRAPHY];
        CLASSES.push({
            className: classNames[index],
            css
        });
    });
    return CLASSES;
}
function getIntersectingValues(arrays) {
    if (!arrays)
        throw new Error(errors_1.ErrorGetIntersectingValues);
    const CSS_ARRAYS = arrays.map((a) => a.css);
    const REDUCED_VALUES = CSS_ARRAYS.reduce((prev, curr) => prev.filter((val) => curr.includes(val)));
    const INTERSECTING_VALUES = [...new Set(REDUCED_VALUES)];
    return INTERSECTING_VALUES;
}
function getUniqueValues(arrays, intersections) {
    if (!arrays || !intersections)
        throw new Error(errors_1.ErrorGetUniqueValues);
    const CSS_ARRAYS = arrays.map((arr) => arr.css);
    const VALUES = CSS_ARRAYS.map((arr) => arr.filter((val) => !intersections.includes(val)));
    const UNIQUE_VALUES = [];
    VALUES.map((item, index) => {
        UNIQUE_VALUES.push({
            css: item,
            className: arrays[index].className
        });
    });
    return UNIQUE_VALUES;
}
function createCssString(intersections, uniqueValues) {
    if (!intersections || !uniqueValues)
        throw new Error(errors_1.ErrorCreateCssString);
    let cssString = `\n`;
    intersections.forEach((i) => (cssString += `  ${i}\n`));
    cssString += `\n`;
    uniqueValues.forEach((arr) => {
        if (arr.className.includes('.:') || arr.className.includes('.')) {
            const FIXED_CLASS_NAME = (() => {
                if (arr.className.includes('.:'))
                    return arr.className.replace('.:', '&:');
                else if (arr.className.includes('.'))
                    return `&${arr.className}`;
            })();
            cssString += `  ${FIXED_CLASS_NAME}\n`;
        }
        else
            cssString += `  ${arr.className}\n`;
        arr.css.forEach((item, index) => {
            cssString += `    ${item}\n`;
            if (index === arr.css.length - 1)
                cssString += `  }\n\n`;
        });
    });
    return cssString;
}
//# sourceMappingURL=processNestedCss.js.map