# Figmagic

Automate the generation of design tokens and specs from your Figma documents. Inspired by [Salesforce Theo](https://github.com/salesforce-ux/theo).

* Extract design tokens for colors, typography (line heights, font sizes, font families), spacing, and grids.
* Get design specifications for all of your Master Components.

## Approach and use cases

There's a lot to say here about the use cases and approaches taken by other tools. I will be writing an article on the motivations behind the project later on.

The basic idea of Figmagic is to support an informed handoff between designers and developers. I believe the best way to do this in a solid, mature, and non-impeding way is:

* Expect relative and current value types that are optimally suited for each typology (unitless for line heights, rems for font sizes...). Don't use or expect px values in most cases.
* Transform values into a common set of tokens rather than output exact values, ie. use something like ${colors.midGray} rather than #3C3C3C.
* Ease the process of making, generating and using design specification by giving solid contextual understanding rather than being imperative and unnecessarily detailed

## Installation

You can use Figmagic either as an NPM package in its own folder, or as part of your projects. It is assumed you will use it as a dependency.

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

#### Troubleshooting

In case you have any trouble starting Figmagic as part of a project, it might be because internal paths point to the project folder itself, instead of your project.

The culprit in that case is probably `bin/createIdString.js` where you should update the last block (around line 24) to:

```js
fs.writeFileSync(
	`${process.cwd()}/node_modules/figmagic/figma/resolvedImages.js`,
	`module.exports = '${fixedObject}'`,
	'utf-8',
	error => {
		if (error) {
			return console.log(error);
		}
	}
);
```

The fix is in the prefix containing `process.cwd()`. This is on my list of coming fixes.

## Commands

The Figmagic commands (NPM scripts block) is below, listing what commands are available to you.

```json
"scripts": {
	"clean": "rm -rf specs/ && rm -rf tokens/ && rm -rf figma",
	"start":
		"yarn clean && yarn run api:save && yarn build && yarn images:get && yarn images:download",
	"api:curl":
		"curl 'https://api.figma.com/v1/files/{FILE}' -sH 'X-Figma-Token: {TOKEN}' | python -m json.tool",
	"api:save":
		"mkdir -p figma && wget 'https://api.figma.com/v1/files/{FILE}' --header='X-Figma-Token: {TOKEN}' -O figma/figma.json",
	"build": "node bin/index.js",
	"images:get": "node bin/getImages.js",
	"images:download": "node bin/downloadImages.js",
	"debug": "yarn build && yarn images:get"
}
```

## Figma setup

See a demo/template at [https://www.figma.com/file/KLLDK9CBSg7eAayiTY3kVqC8/Figma-Design-System-Demo](https://www.figma.com/file/KLLDK9CBSg7eAayiTY3kVqC8/Figma-Design-System-Demo).

## Token formatting/conversion

### Grid

Uses any combination of rows, columns, and grid (but only one of each type).

### Fonts (weights)

Postscript name (eg. FiraSans-Regular).

### Font sizes

Rem units based on global font size (base 16px, change this within Figmagic also, if you've altered this value in your CSS).

### Line heights

Unitless.

### Colors

RGBA colors.

### Spacing

Em units.

## Spec output

Text to come.

## Structure

* `bin` contains the project's JS files
* `figma` will contain the extracted Figma JSON and various build-time JSON files
* `tokens` will contain the token files (in .js format)
* `specs` will contain specifications for all Master Components
* `specs/images` will contain generated images for your components

## Upcoming possible features

* Fix issue with paths (the `process.cwd()` thing) so it works regardless if project is standalone or dependency
* Greater customizability of units, paths, etc.
* Still getting too many specs (for subcomponents)...?
* Extract design specs for subcomponents as well
* Map component values to tokens
* Create error report if something gets botched during build-time
* If Figma gets webhooks, create some way of automatically pulling updates
