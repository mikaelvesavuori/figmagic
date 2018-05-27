# Figmagic

[![Greenkeeper badge](https://badges.greenkeeper.io/mikaelvesavuori/figmagic.svg)](https://greenkeeper.io/)

Automate the generation of design tokens and specs from your Figma documents. Inspired by [Salesforce Theo](https://github.com/salesforce-ux/theo).

* Extract design tokens for colors, typography (line heights, font sizes, font families), spacing, and grids.
* Get design specifications for all of your Master Components.

A typical use case for the generated documents is to use the extracted values as a token base in CSS systems that support external values (such as Styled Components or Sass).

**Please note:** Figmagic requires that your document structure is identical to what I show in the template site at [https://www.figma.com/file/KLLDK9CBSg7eAayiTY3kVqC8/Figmagic-Design-System-Example](https://www.figma.com/file/KLLDK9CBSg7eAayiTY3kVqC8/Figmagic-Design-System-Example).

_Built initially as an internal handoff tool for [Humblebee](https://www.humblebee.se)._

## Approach and use cases

There's a lot to say here about the use cases and approaches taken by other tools. I will be writing an article on the motivations behind the project later on.

The basic idea of Figmagic is to support an informed handoff between designers and developers. I believe the best way to do this in a solid, mature, and non-impeding way is:

* Expect relative and current value types that are optimally suited for each typology (unitless for line heights, rems for font sizes...). Don't use or expect px values in most cases.
* Transform values into a common set of tokens rather than output exact values, ie. use something like ${colors.midGray} rather than #3C3C3C.
* Ease the process of making, generating and using design specification by giving solid contextual understanding rather than being imperative and unnecessarily detailed

## Example project

An example project—using React, Webpack and Styled Components—is available at [https://github.com/mikaelvesavuori/figmagic-example](https://github.com/mikaelvesavuori/figmagic-example).

## Installation

You can use Figmagic either as an NPM package in its own folder, or as part of your projects. It is assumed you will use it as a dependency.

Figmagic uses ESM imports, so make sure you have a recent Node version, preferably version 10+.

### Standalone

Running it standalone might be fine if you wish to isolate the tokens/spec generation, or if you don't have a project in which to place Figmagic, or if it simply makes more sense to have it on its own (for example doing a project in a non-Node environment).

Use `.` as a value in the path in the NPM config block to resolve from the Figmagic root.

* Clone/download the repository
* Place it where you want it!

### As part of a Node.js project

You will probably want to use it as a straight dependency.

* Add Figmagic as a project dependency, by running `yarn add figmagic -S` or `npm install figmagic -S`
* Add the below commands to your NPM scripts block
* Replace with your own file ID and token key (for more on this, [go to Figma's developer docs](https://www.figma.com/developers/docs))

## Key/token locations

1.  `package.json`: In the scripts block you will need to change the blanks to your actual file and token
2.  `bin/meta/keys.mjs`: In the options object you will also need to change to your actual values; these are then used by Figmagic's functions

## Commands

The Figmagic commands (NPM scripts block) is below, listing what commands are available to you.

```json
"config": {
	"figmagicPath": "node_modules/figmagic"
},
"scripts": {
	"figmagic": "yarn figmagic:clean && yarn run figmagic:saveFromApi && yarn figmagic:build && yarn figmagic:getImages && yarn figmagic:downloadImages",
		"figmagic:clean": "rm -rf specs/ && rm -rf tokens/ && rm -rf figma && mkdir tokens && cp $npm_package_config_figmagicPath/.gridTemplate.mjs tokens/ && mv tokens/.gridTemplate.mjs tokens/grid.mjs",
		"figmagic:saveFromApi": "mkdir -p figma && wget 'https://api.figma.com/v1/files/{URL}' --header='X-Figma-Token: {TOKEN}' -O figma/figma.json",
		"figmagic:tokens": "yarn figmagic:clean && yarn figmagic:saveFromApi && yarn figmagic:build",
		"figmagic:build": "node --experimental-modules $npm_package_config_figmagicPath/bin/index.mjs",
		"figmagic:getImages": "node --experimental-modules $npm_package_config_figmagicPath/bin/getImages.mjs",
		"figmagic:downloadImages": "node --experimental-modules $npm_package_config_figmagicPath/bin/downloadImages.mjs"
}
```

## Figma setup

Your structure needs to correspond to the following:

* Pages need to exist and be called "Components", "Design tokens", and "Grid"
* Further, inside "Design tokens", frames need to be called "Colors", "Font sizes", "Font families", "Font weights", "Line heights", and "Spacing" – exact casing is not important, however the **spelling is important!**
* All items on a page need to be contained within one or more frames

See a demo/template at [https://www.figma.com/file/KLLDK9CBSg7eAayiTY3kVqC8/Figmagic-Design-System-Example](https://www.figma.com/file/KLLDK9CBSg7eAayiTY3kVqC8/Figmagic-Design-System-Example).

**Note:** You must follow the document structure as seen in the image below and in the template linked above.

![Figma Document Structure](project-structure.png)

## Token formatting/conversion

### Grid

Uses any combination of rows, columns, and grid (but only one of each type). Grid sizes will use the native Javascript `Math.floor()` function to round down any decimal values. This may or may not cause issues, but is at least more hygienic than leaving potentially weird numbers for grid sizes.

### Font families

Postscript name (eg. FiraSans-Regular).

### Font weights

**Work in progress**.

### Font sizes

Rem units based on global font size (base 16px, change this within Figmagic also, if you've altered this value in your CSS).

### Line heights

Unitless.

### Colors

RGBA colors.

### Spacing

Em units.

## Spec output

Specifications for components are generated into the `specs` folder. A component will be anything that Figma catches as a component, regardless if they exist in your "Components" page or not.

### Example of a Button component

```js
const buttonFigma = {
  name: "Button Figma",
  gridWidth: 1,
  perfectlyFitsGrid: false,
  pxWidth: 200,
  pxHeight: 40,
  description: "Regular button\nBold text\nLine height medium",
  subComponents: ["Box", "Button Text"],
  id: "5:9"
};

export default buttonFigma;
```

* **name**: The name of the component inside Figma
* **gridWidth**: How wide the component is counted in your grid units. _Note:_ It will always use a higher value if not an exact fit (see below)
* **perfectlyFitsGrid**: A boolean (true/false) to debug whether the component fits exactly in the grid or if it's bigger (see above)
* **pxWidth**: How many pixels wide is the component in Figma
* **pxHeight**: How many pixels high is the component in Figma
* **description**: The description given in Figma. _Hint:_ Use this!
* **subComponents**: What first-level subcomponents does the component include?
* **id**: The Figma internal ID for the component

## Structure

* `bin` contains the project's MJS files; `bin/functions` contains most of the functions
* `figma` will contain the extracted Figma JSON and various build-time JSON files
* `tokens` will contain the token files (in .mjs format)
* `specs` will contain specifications for all Master Components
* `specs/images` will contain generated images for your components

## Known issues

* The `package.json` commands uses Bash syntax which means it's all Mac (or Windows Bash) for now
* Figmagic will break if there is no `grid.mjs` file in the `tokens` folder, so the clean command puts an empty grid file there on wipe (if you ever wonder about why there is a `.gridTemplate.mjs` file in the root!)

## Possible upcoming features

* The `perfectlyFitsGrid` property is currently a uni-dimensional boolean, and is therefore true only for one grid size, so it doesn't really work for a set of sizes (mobile, tablet, desktop)
* Possibility to configure Figmagic through a config object
* Possibility to specify whether you want MJS or JS file as final output files
* Greater customizability of units, paths, etc.
* Still getting too many specs (for subcomponents)...?
* Map component values to tokens
* Create error report if something gets botched during build-time
* Create and update changelog
* If Figma gets webhooks, create some way of automatically pulling updates

## Want to add or rethink something in Figmagic?

You are very welcome to contribute to the project! Pull requests welcome, as well as issues or plain messages.
