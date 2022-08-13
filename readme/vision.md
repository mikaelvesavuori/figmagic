# Figmagic vision

## Introduction

As the primary contributor and maintainer of Figmagic, I (Mikael Vesavuori) am writing this vision document somewhat “late” since Figmagic has now been out for roughly 4,5 years at the point of writing this.

Communicating the direction and values that have gone into the project, I believe, makes it easier for others to contribute in a way that honors the trajectory that the project is taking now and in the future. Hence, this document tries to outline the modest vision in clear terms so that it is 1) shared with everyone and 2) so that it can help influence the future direction of the project.

## Vision

The frustration of manually updating CSS and styling, and to infer values from design (“pixels”) and move them to code was the driver when I started writing Figmagic. It seems, unfortunately, that this has not generally become better over time. For me, this means that there _is_ still a place for Figmagic in 2022 and in the near future, as it attempts to fill that specific workflow problem.

Figmagic should be a given tool in the **Front end developer**'s toolbox, as naturally as they tend to reach for React/Svelte/whatever, ESLint, TypeScript or any other very common, well-known, and well-working tool. They use it because it makes their day-to-day work effortless and predictable.

The **Designer** on the other hand is ideally oblivious to Figmagic other than following the minimum conventions required (and removing the need for Figma/Figmagic conventions _should_ be a design goal whenever logically possible!). Their work simply seems to flow more uninterrupted and the can stay in the flow and be productive rather than calling for yet another sync meeting.

### Goals

During Figmagic’s lifespan many added functionalities have been added that all have intended to further improve the design-to-code transfer, such as the major features graphics export and code generation.

_The goals align relatively well to the larger feature set: Design tokens being first priority, and then other features (graphics export, code generation…) coming farther down the priority list._

#### Stable, predictable, secure, user-friendly product

Figmagic should be a "boring product": It needs to work practically always, give actionable errors when it does not, and be completely predictable in its behavior.

This also (among other things) means:

- Figmagic should support Mac, Linux and Windows and CI environments.
- Figmagic, as used by an end-user, should use no external dependencies.
- Figmagic should use readable and friendly language to support users.
- Documentation must always exist for features and similar.

#### Support a design tokens workflow

The main goal of Figmagic has always been to reliably, quickly, and easily support a design tokens workflow from Figma to whatever standard format (web) developers use at the time. This goal should remain the center—if anything else gives way over time, then at least this goal should be understood as having been the heart of the project since before it was even put on GitHub.

#### Support the developer-designer relationship

Other features in Figmagic also support the developer-designer relationship, such as the previously mentioned code generation and graphics export features. These are natural extensions.

The next arena for improvements in this area is to look at standardizing the Figma-side of generating elements to make it even more intuitive. Also, it should be considered if Variants and other such additions to Figma can be leveraged.

#### Improve the state of, and understanding of, "design as DevOps"

I do think that Figmagic has a place in the tooling ecosystem, such as evidenced through the many presentations I have held for interested parties, the course I've made, the articles I've written, and the conversations I've had with people all over the world on Figmagic in particular but also design as DevOps in general.

For Figmagic to stay relevant it needs to be aligned with, and in the forefront of, the needs of users. And as always: When the users don't know what they can get, build it and show it!

### Non-goals

#### No-code style component generation

While it is enticing, Figmagic was not, and should not, become a "React component generator thingamabob, the Dreamweaver of the 2020s".

The code generation support is as far as I care a "bonus feature" that helps scaffolding components in a precise and modern fashion—something that simply has not existed in a good way AFAIK.

The first reason for this is that the use of element generation is unknown. The Issues section has had its number of questions over the years, and I've been on a few calls with companies who are very interested in the feature, but generally I simply don't know how reasonable it is to support it.

The second reason is that creating such a tool or product will become complicated, much more so than it already is. Being the only long-time maintainer, I cannot take that upon myself. With a bigger team, maybe it would be interesting to branch out and create a product around it.

The third reason is that component generation from a static image logically cannot take you all the way. Figma is doing good work, and I am sure the tooling coming in the next 5-10 years will herald some big changes, but as long as Figma is primarily visually based rather than behavior-oriented, it won't be possible to make a meaningful translation of design (wholesale) into code. We still need some laying-of-hands.

## Maintenance

The following are broad areas that can always be improved:

- **Features**: This is the bread and butter where we need to continue adding features as requested (as long as they make sense with the Vision). Stability must always be first in mind when we build!
- **Tests**: While there is high test coverage this can still be improved to handle the remaining "red" uncovered areas.
- **Refactoring**: There is some amount of duplication and non-optimal solutions across the code base; this is easiest to find when looking in SonarCloud and other tools.
- **Documentation in code (JSDoc)**: The JSDoc comments and type descriptions should be rich, valid, and present throughout. This is currently not the case for more than a relatively small part of the code base.
- **Types**: Writing and using custom types is something that has gradually been introduced, though there is still some amount of wide usage (such as Records) that can be improved.
- **Improve Clean Architecture**: The CA folder structure is not necessarily how I personally would exactly do it today after several years of more experience. For example, are Elements really entities and not Value Objects?
- **Anonymous usage analytics**: It should be considered if anonymous analytics can be introduced to give a better view of what features are used most, and also which errors users get most often to proactively support and build the right product.

---

## Version history

Brief overviews on some key changes in each major version.

### Version 0 (April 2018)

**Focus**: Innovation and getting a sense for the usefulness.

The first commit was for version `0.1.0`. It contained some amount of local work that I had done over the past month or so coinciding with Figma opening up their API. Figmagic version 0 was buggy, written in JS/MJS, depended on Bash scripts and would not work on Windows, among many things. It did, for it’s young age, still contain basic beginnings for code generation and a wider feature set.

### Version 1 (February 2019)

**Focus**: Stability.

Laser-focused on design tokens completely and to deliver a more stable experience. Also got moved to being a module rather than a dependency. Overall, this is where a lot of the tightening of the project started to really happen with tests, CI, and basic documentation.

### Version 2 (February 2020)

**Focus**: Broader feature set.

Started adding back support for code generation and released support for graphics export.

### Version 3 (April 2020)

**Focus**: Stability.

For version 3 there was once again work to be done to make it functional and stable at the level a developer would wish for. This is also when the first commit by another contributor came, to add support `outputTokenDataType: 'enum’`. Added things like support for more token types (such as duration and easing) and ignoring items in Figma.

Work began on refactoring everything to Typescript in August. This was _a lot_ of work, but very rewarding when we got to...

### Version 4 (October 2020)

**Focus**: Usability and fine-grained features.

The massive refactoring work was completed and thorough testing had been incrementally added over time but also specifically for this release so that it would be the most stable Figmagic has ever been, despite the vast number of changes made.

At this point the core product is very stable and it made sense to mature it into a great user experience. Over time this version has introduced support for things like the configuration file `figmagic.json` (instead of the old `.figmagicrc` format), supporting Storybook MDX format, file-level overwrites, support for versioned Figma files and much, much more.

## Work analysis

Looking in the Git log we can see that there are a lot of commit messages that are simply `Update` which infer they were made on my computer and as part of some greater overall change and that the commit itself was something small. Not the classiest act, for sure, but that's what it is. However, I am happy to be reminded that commit messages are actually in my opinion pretty readable and understandable throughout the years.

There is certainly quite a lot of work for relatively menial work items, like updating dependencies, updating documentation, minor refactoring, and having (over time) tried out a number of CI-integrated products like Greenkeeper, Snyk, Talisman, and more.

The vast majority of "work" that is feature-oriented seems to be around the code generation part. I believe this is because it is relatively original work, that it has been implemented several times with different approaches, that it has sustained major refactoring at least twice, and simply because it is naturally the most complex part of Figmagic. If I were to be cynical, Figmagic could have been said to be feature complete sometime between 2018-2020 if it was completely focused on the core feature: Design tokens.

---

However, the majority of changes that have been added to the codebase have been about stability and predictability.
