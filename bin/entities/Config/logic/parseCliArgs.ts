import { Config } from '../../../contracts/Config';

import { ErrorParseCliArgs } from '../../../frameworks/errors/errors';

/**
 * @description Parse CLI arguments and return config object
 */
export function parseCliArgs(argsArray: string[]): Config {
  if (!argsArray) throw new Error(ErrorParseCliArgs);
  if (argsArray.length === 0) return {} as Config;

  const cliArguments = {
    '--debug': () => (config.debugMode = true),
    '-d': () => (config.debugMode = true),
    '--fontUnit': (val: string) => (config.fontUnit = val.toLowerCase()),
    '-fu': (val: string) => (config.fontUnit = val.toLowerCase()),
    '--letterSpacingUnit': (val: string) => (config.letterSpacingUnit = val.toLowerCase()),
    '-lsu': (val: string) => (config.letterSpacingUnit = val.toLowerCase()),
    '--opacitiesUnit': (val: string) => (config.opacitiesUnit = val.toLowerCase()),
    '-ou': (val: string) => (config.opacitiesUnit = val.toLowerCase()),
    '--outputFileName': (val: string) => (config.outputFileName = val),
    '-file': (val: string) => (config.outputFileName = val),
    '--outputFolderBaseFile': (val: string) => (config.outputFolderBaseFile = val),
    '-base': (val: string) => (config.outputFolderBaseFile = val),
    '--outputFolderElements': (val: string) => (config.outputFolderElements = val),
    '-elements': (val: string) => (config.outputFolderElements = val),
    '--outputFolderGraphics': (val: string) => (config.outputFolderGraphics = val),
    '-graphics': (val: string) => (config.outputFolderGraphics = val),
    '--outputFolderTokens': (val: string) => (config.outputFolderTokens = val),
    '-tokens': (val: string) => (config.outputFolderTokens = val),
    '--outputFormatCss': (val: string) => (config.outputFormatCss = val.toLowerCase()),
    '-fc': (val: string) => (config.outputFormatCss = val.toLowerCase()),
    '--outputFormatElements': (val: string) => (config.outputFormatElements = val.toLowerCase()),
    '-fe': (val: string) => (config.outputFormatElements = val.toLowerCase()),
    '--outputFormatGraphics': (val: string) => (config.outputFormatGraphics = val.toLowerCase()),
    '-fg': (val: string) => (config.outputFormatGraphics = val.toLowerCase()),
    '--outputFormatTokens': (val: string) => (config.outputFormatTokens = val.toLowerCase()),
    '-ft': (val: string) => (config.outputFormatTokens = val.toLowerCase()),
    '--outputScaleGraphics': (val: string | number) => (config.outputScaleGraphics = val),
    '-scale': (val: string | number) => (config.outputScaleGraphics = val),
    '--outputDataTypeToken': (val: string) => (config.outputDataTypeToken = val.toLowerCase()),
    '-tokentype': (val: string) => (config.outputDataTypeToken = val.toLowerCase()),
    '--recompileLocal': () => (config.recompileLocal = true),
    '-local': () => (config.recompileLocal = true),
    '--remSize': (val: string | number) =>
      (config.remSize = typeof val === 'string' ? parseInt(val) : val),
    '-rem': (val: string | number) =>
      (config.remSize = typeof val === 'string' ? parseInt(val) : val),
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
    '--token': (val: string) => (config.token = val),
    '-t': (val: string) => (config.token = val),
    '--url': (val: string) => (config.url = val),
    '-u': (val: string) => (config.url = val),
    '--usePostscriptFontNames': () => (config.usePostscriptFontNames = true),
    '-ps': () => (config.usePostscriptFontNames = true)
  };

  const config: any = {};
  const args = {};
  if (argsArray.length > 0) {
    // @ts-ignore
    argsArray.map((arg: string) => (args[arg] = arg));
    Object.keys(args).forEach((arg: string, index: number) => {
      // @ts-ignore
      if (cliArguments.hasOwnProperty(arg)) cliArguments[arg](argsArray[index + 1]);
    });
  }

  return config as Config;
}
