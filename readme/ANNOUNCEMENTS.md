# Announcements

## Version `4.5.0` enables using frames as well as groups for generating components from Figma

See more on the [version 4.5.0 release page](https://github.com/mikaelvesavuori/figmagic/releases/tag/v4.5.0).

## Version `4.4.0` outputs all files on disk (and imports) as PascalCase

When files (and Elements) are written to disk these now use a PascalCase format. This is partly because recent versions have also started to accept dashes and underscores in names, for example for Elements and tokens named things like `my-design-system-button`, which would be transformed into `MyDesignSystemButton`.

To ensure that files and imports have usable and working names, the decision was made to add a string transformer to the file output stage.

This _may_ break stuff on your end if you were dependent on the previous, non-transformed format.

## Version `4.3.0` introduces new handling of trashed/replaced files

Previous versions in the 4.0 series have been using [`trash`](https://github.com/sindresorhus/trash) to handle files that need to be replaced. In `4.3.0` this is no longer the case.

Any deleted files are now permanently destroyed by the Node native `fs` module.

**Versions `4.3.0` and `4.3.1` used a flaky dual-mode, configurable pattern where you could use either a "hard" or "soft" delete mode (soft deletes meaning placing files in a local trash folder). _This is NOT supported and intended from `4.3.2` and forward as that was too buggy._**
