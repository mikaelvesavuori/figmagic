"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processNestedCss = void 0;
const checkIfStringOnlyContainsReturnsOrSpaces_1 = require("../../../frameworks/string/checkIfStringOnlyContainsReturnsOrSpaces");
const getId_1 = require("../../../frameworks/string/getId");
const removeAllIds_1 = require("../../../frameworks/string/removeAllIds");
const errors_1 = require("../../../frameworks/errors/errors");
function processNestedCss(css) {
    if (!css)
        throw new Error(errors_1.ErrorProcessNestedCss);
    const CLASS_NAMES = css.match(/\..* {/gi);
    const CLASS_CONTENT = css.split(/\..* {/gi);
    if (checkIfStringOnlyContainsReturnsOrSpaces_1.checkIfStringOnlyContainsReturnsOrSpaces(CLASS_CONTENT[0]))
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
            ? classContent[index + 1]
                .split(/\n/gi)
                .filter((item) => item)
                .filter((item) => item !== '}')
            : [];
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
    const NOT_INTERSECTED = CSS_ARRAYS.map((arr) => arr.filter((val) => !intersections.includes(val)));
    const VALUES = NOT_INTERSECTED.map((arr) => [...new Set(arr)]);
    const UNIQUE_VALUES = [];
    VALUES.forEach((item, index) => {
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
    uniqueValues.reverse();
    let nestingDepth = 0;
    let cssString = `\n`;
    intersections.forEach((i) => (cssString += `  ${i}\n`));
    cssString += `\n`;
    uniqueValues.forEach((array, index) => {
        const { css, className } = array;
        const FIXED_CLASS_NAME = getFixedClassName(className);
        const SPACE = getSpacing(nestingDepth);
        const INNER_SPACE = getSpacing(nestingDepth + 1);
        cssString += `${SPACE}${FIXED_CLASS_NAME}\n`;
        css.forEach((item) => (cssString += `${INNER_SPACE}${item}\n`));
        const IS_LAST_ELEMENT_WITH_CLASS = !uniqueValues[index + 1]
            ? true
            : checkIfLastElementWithClassname(className, uniqueValues[index + 1].className);
        if (nestingDepth !== 0 && !IS_LAST_ELEMENT_WITH_CLASS)
            cssString += `${SPACE}}\n`;
        if (IS_LAST_ELEMENT_WITH_CLASS) {
            for (let i = 0; i <= nestingDepth + 1; i++) {
                const _SPACE = getSpacing(nestingDepth);
                cssString += `${_SPACE}}\n`;
                nestingDepth--;
            }
            cssString += `\n`;
            nestingDepth = 0;
            return;
        }
        if (nestingDepth < 1)
            nestingDepth++;
    });
    if (hasOpenBracketAtEnd(cssString)) {
        const SPLIT_STRING = cssString.split(';');
        cssString = cssString.replace(SPLIT_STRING[SPLIT_STRING.length - 1], '\n');
    }
    cssString = removeAllIds_1.removeAllIds(cssString);
    return cssString;
}
function hasOpenBracketAtEnd(str) {
    return str.slice(str.length - 5, str.length).includes('{');
}
function getFixedClassName(className) {
    if (className.includes('.:'))
        return className.replace('.:', '&:');
    else if (className.includes('.'))
        return `&${className}`;
    return '';
}
function checkIfLastElementWithClassname(className, nextClassName) {
    if (getId_1.getId(className) !== getId_1.getId(nextClassName))
        return true;
    return false;
}
function getSpacing(depth) {
    let spaces = ``;
    for (let i = 0; i <= depth; i++) {
        spaces += `  `;
    }
    return spaces;
}
//# sourceMappingURL=processNestedCss.js.map