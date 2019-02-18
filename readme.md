# Figmagic

Automate the generation of design tokens and specs from your Figma documents. Inspired by [Salesforce Theo](https://github.com/salesforce-ux/theo).

Extract design tokens for colors, typography (line heights, font sizes, font families), and spacing. A typical use case for the generated documents is to use the extracted values as a token base in CSS systems that support external values (such as Styled Components, other CSS-in-JS libraries, or Sass).

Figmagic uses ESM imports, so make sure you have a recent Node version, preferably version 10+.

**Please note:** Figmagic requires that your document structure is identical to what I show in the template site at [https://www.figma.com/file/UkrKTnjjKB0lJKYAifn9YWXU/Figmagic---Design-Token-Example-v1.0](https://www.figma.com/file/UkrKTnjjKB0lJKYAifn9YWXU/Figmagic---Design-Token-Example-v1.0).

_Built initially as an internal handoff tool for [Humblebee](https://www.humblebee.se)._

## Major changes between pre-1.0 versions and 1.0

Figmagic versions pre-1.0 were primarily used as an in-house, internal tool at Humblebee. The focus was therefore less on being a good, general tool and didn't enjoy any large amount of testing and so on. The goal with 1.0 has been to minimize any friction in using, implementing and trusting Figmagic for your design token needs.

- With version 1.0, the scope has been focused only on generating design tokens. If you relied on Figmagic to generate specs, or component renders (etc.) then none of those functions exist in this, new version.
- It should now also work on Windows, since we don't rely on Bash scripts anymore. Cross-platform for the win!
- Much easier to install and use, since it's a global module rather than a crappily-crafted dependency that's going to break on you whenever there's an update.
- More error handling, thank God for that...

Note: I've kept the old design system template around, but also updated with a new one to correspond with changes in version 1.0+.

## Approach and use cases

There's a lot to say here about the use cases and approaches taken by other tools. I will be writing an article on the motivations behind the project later on.

The basic idea of Figmagic is to support an informed handoff between designers and developers. I believe the best way to do this in a solid, mature, and non-impeding way is:

- Expect relative and current value types that are optimally suited for each typology (unitless for line heights, rems for font sizes...). Don't use or expect px values in most cases.
- Transform values into a common set of tokens rather than output exact values, ie. use something like \${colors.midGray} rather than #3C3C3C.

## Example project

An example project—using React, Webpack and Styled Components—is available at [https://github.com/mikaelvesavuori/figmagic-example](https://github.com/mikaelvesavuori/figmagic-example).

### Installation

- Clone Figmagic
- Step into the Figmagic directory, and run `yarn setup` or `npm setup` to add it globally to your system
- Step into a project directory, and add or replace **FIGMA_URL** and **FIGMA_TOKEN** in .env with your own file ID and token key (for more on this, [go to Figma's developer docs](https://www.figma.com/developers/docs))
- Run `figmagic`
- You should now have a `/figma` and `/tokens` folder in the root! The `/tokens` folder has the good stuff you want :)

## Figma setup

Your structure needs to correspond to the following:

- A Page needs to exist, called "Design tokens". In case you have more than one page, put "Design tokens" as the very first (just in case)
- Further, inside the "Design tokens" page, frames need to be exist. Name them "Colors", "Font sizes", "Font families", "Font weights", "Line heights", and "Spacing" – exact casing is not important, however the **spelling is important!**
- All items on a page need to be contained within one or more frames

See a demo/template at [https://www.figma.com/file/UkrKTnjjKB0lJKYAifn9YWXU/Figmagic---Design-Token-Example-v1.0](https://www.figma.com/file/UkrKTnjjKB0lJKYAifn9YWXU/Figmagic---Design-Token-Example-v1.0). Feel free to simply copy it and paste it into your own document.

**Note:** Refer to the the document structure in the image below and in the template linked above.

![Figma Document Structure](project-structure.png)

## Figma styles

Figma styles became publicly available in June 2018 and are incredibly valuable for designers to create single-sources-of-truth when it comes to design values (tokens). When using Figmagic though, the thinking and usage is a bit different from how Figma styles work.

### Unidimensional or multidimensional values

A Figma style is multidimensional: It contains any number of properties wrapped into one style, acting as kind of a package. This is extremely handy in a design environment and is very practical from a user standpoint. The user doesn't have to think too hard about storing "redundant" values that are the same in another component, such as N number of units for line height: They are all taken care of.

Figmagic instead expresses tokens as instances of every individual value, thus being unidimensional – storing only one value per item. Examples could be sets of line heights, font weights, or font sizes, each one individually specified. This means that values can be used and mixed as pleased in any number of contexts, not becoming bound to one specific context such as a certain kind of heading. This is good for a developer because we would rather just map out the definitive values for something, onto a component (a "context" so to speak).

Because of this difference, the appropriate way to structure a Figmagic-compatible Figma design document is to display one or more items/tokens in the respective frames that correspond to the accepted token types (line height, font size...) where each item has only one key property that's changed in-between them (such as one text using size 48, the next using size 40...), since those items are what Figmagic loops through when creating your code tokens.

### OK, but should I use Figma styles (also) when using Figmagic?

Whatever suits you! As long as you remember that what Figmagic fetches are those single (unidimensional) values from each design item/token it should all work. Figma styles may help you to work though, and is probably just a good thing for any regular normal design work. Again though, Figmagic does not use those values.

## Token formatting/conversion

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

## Structure

- `bin` contains the project's MJS files; `bin/functions` contains most of the functions
- `figma` will contain the extracted Figma JSON and various build-time JSON files
- `tokens` will contain the token files (in .mjs format)

## Want to add or rethink something in Figmagic?

You are very welcome to contribute to the project! Pull requests welcome, as well as issues or plain messages.
