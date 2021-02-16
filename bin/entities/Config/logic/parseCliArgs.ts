import { Config } from '../../../contracts/Config';

import { ErrorParseCliArgs } from '../../../frameworks/errors/errors';

interface CliArguments {
  [key: string]: (val: string) => unknown;
}

/**
 * @description Parse CLI arguments and return config object
 */
export function parseCliArgs(argsArray: string[]): Config {
  if (!argsArray) throw new Error(ErrorParseCliArgs);
  if (argsArray.length === 0) return {} as Config;

  const cliArguments: CliArguments = {
    '--debug': () => (config.debugMode = true),
    '-d': () => (config.debugMode = true),
    '--fontUnit': (val: string) => (config.fontUnit = val.toLowerCase()),
    '-fu': (val: string) => (config.fontUnit = val.toLowerCase()),
    '--letterSpacingUnit': (val: string) => (config.letterSpacingUnit = val.toLowerCase()),
    '-lsu': (val: string) => (config.letterSpacingUnit = val.toLowerCase()),
    '--opacitiesUnit': (val: string) => (config.opacitiesUnit = val.toLowerCase()),
    '-ou': (val: string) => (config.opacitiesUnit = val.toLowerCase()),
    '--figmaData': (val: string) => (config.figmaData = val),
    '-data': (val: string) => (config.figmaData = val),
    '--figmagicFolder': (val: string) => (config.figmagicFolder = val),
    '-base': (val: string) => (config.figmagicFolder = val),
    '--outputFolderElements': (val: string) => (config.outputFolderElements = val),
    '-elements': (val: string) => (config.outputFolderElements = val),
    '--outputFolderGraphics': (val: string) => (config.outputFolderGraphics = val),
    '-graphics': (val: string) => (config.outputFolderGraphics = val),
    '--outputFolderTokens': (val: string) => (config.outputFolderTokens = val),
    '-tokens': (val: string) => (config.outputFolderTokens = val),
    '--outputFormatCss': (val: string) => (config.outputFormatCss = val.toLowerCase()),
    '-fc': (val: string) => (config.outputFormatCss = val.toLowerCase()),
    '--outputFormatDesc': (val: string) => (config.outputFormatDescription = val.toLowerCase()),
    '-fd': (val: string) => (config.outputFormatDescription = val.toLowerCase()),
    '--outputFormatElements': (val: string) => (config.outputFormatElements = val.toLowerCase()),
    '-fe': (val: string) => (config.outputFormatElements = val.toLowerCase()),
    '--outputFormatGraphics': (val: string) => (config.outputFormatGraphics = val.toLowerCase()),
    '-fg': (val: string) => (config.outputFormatGraphics = val.toLowerCase()),
    '--outputFormatStorybook': (val: string) => (config.outputFormatStorybook = val.toLowerCase()),
    '-fs': (val: string) => (config.outputFormatStorybook = val.toLowerCase()),
    '--outputFormatTokens': (val: string) => (config.outputFormatTokens = val.toLowerCase()),
    '-ft': (val: string) => (config.outputFormatTokens = val.toLowerCase()),
    '--outputGraphicElements': () => (config.outputGraphicElements = true),
    '-oge': () => (config.outputGraphicElements = true),
    '--outputGraphicElementsMap': () => (config.outputGraphicElementsMap = true),
    '-ogm': () => (config.outputGraphicElementsMap = true),
    '--outputScaleGraphics': (val: string) => (config.outputScaleGraphics = parseInt(val)),
    '-scale': (val: string) => (config.outputScaleGraphics = parseInt(val)),
    '--outputDataTypeToken': (val: string) => (config.outputDataTypeToken = val.toLowerCase()),
    '-tokentype': (val: string) => (config.outputDataTypeToken = val.toLowerCase()),
    '--recompileLocal': () => (config.recompileLocal = true),
    '-local': () => (config.recompileLocal = true),
    '--remSize': (val: string) => (config.remSize = parseInt(val)),
    '-rem': (val: string) => (config.remSize = parseInt(val)),
    '--forceUpdate': () =>
      (config.skipFileGeneration = {
        ...config.skipFileGeneration,
        forceUpdate: true
      }),
    '-force': () =>
      (config.skipFileGeneration = {
        ...config.skipFileGeneration,
        forceUpdate: true
      }),
    '--skipCss': () =>
      (config.skipFileGeneration = {
        ...config.skipFileGeneration,
        skipCss: true
      }),
    '-nocss': () =>
      (config.skipFileGeneration = {
        ...config.skipFileGeneration,
        skipCss: true
      }),
    '--skipDescription': () =>
      (config.skipFileGeneration = {
        ...config.skipFileGeneration,
        skipDescription: true
      }),
    '-nodesc': () =>
      (config.skipFileGeneration = {
        ...config.skipFileGeneration,
        skipDescription: true
      }),
    '--skipReact': () =>
      (config.skipFileGeneration = {
        ...config.skipFileGeneration,
        skipReact: true
      }),
    '-noreact': () =>
      (config.skipFileGeneration = {
        ...config.skipFileGeneration,
        skipReact: true
      }),
    '--skipStorybook': () =>
      (config.skipFileGeneration = {
        ...config.skipFileGeneration,
        skipStorybook: true
      }),
    '-nostory': () =>
      (config.skipFileGeneration = {
        ...config.skipFileGeneration,
        skipStorybook: true
      }),
    '--skipStyled': () =>
      (config.skipFileGeneration = {
        ...config.skipFileGeneration,
        skipStyled: true
      }),
    '-nostyled': () =>
      (config.skipFileGeneration = {
        ...config.skipFileGeneration,
        skipStyled: true
      }),
    '--spacingUnit': (val: string) => (config.spacingUnit = val.toLowerCase()),
    '-s': (val: string) => (config.spacingUnit = val.toLowerCase()),
    '--syncElements': () => (config.syncElements = true),
    '-se': () => (config.syncElements = true),
    '--syncGraphics': () => (config.syncGraphics = true),
    '-sg': () => (config.syncGraphics = true),
    '--syncTokens': () => (config.syncTokens = true),
    '-st': () => (config.syncTokens = true),
    '--templatePathReact': (val: string) =>
      (config.templates = {
        ...config.templates,
        templatePathReact: val
      }),
    '-tpreact': (val: string) =>
      (config.templates = {
        ...config.templates,
        templatePathReact: val
      }),
    '--templatePathStorybook': (val: string) =>
      (config.templates = {
        ...config.templates,
        templatePathStorybook: val
      }),
    '-tpstory': (val: string) =>
      (config.templates = {
        ...config.templates,
        templatePathStorybook: val
      }),
    '--templatePathStyled': (val: string) =>
      (config.templates = {
        ...config.templates,
        templatePathStyled: val
      }),
    '-tpstyled': (val: string) =>
      (config.templates = {
        ...config.templates,
        templatePathStyled: val
      }),
    '--templatePathGraphic': (val: string) =>
      (config.templates = {
        ...config.templates,
        templatePathGraphic: val
      }),
    '-tpgraphic': (val: string) =>
      (config.templates = {
        ...config.templates,
        templatePathGraphic: val
      }),
    '--token': (val: string) => (config.token = val),
    '-t': (val: string) => (config.token = val),
    '--unitlessPrecision': (val: string) => (config.unitlessPrecision = parseInt(val, 10)),
    '-up': (val: string) => (config.unitlessPrecision = parseInt(val, 10)),
    '--url': (val: string) => (config.url = val),
    '-u': (val: string) => (config.url = val),
    '--usePostscriptFontNames': () => (config.usePostscriptFontNames = true),
    '-ps': () => (config.usePostscriptFontNames = true)
  };

  const config: any = {};
  argsArray.forEach((arg: string, index: number) => {
    if (cliArguments.hasOwnProperty(arg)) {
      cliArguments[arg](argsArray[index + 1]);
    }
  });

  return config as Config;
}
