import { Tokens } from '../../../contracts/Tokens';
import { Imports } from '../../../contracts/Imports';
import { TokenMatch, TokenMatchRaw } from '../../../contracts/TokenMatch';
import { OutputFormatColors } from '../../../contracts/Config';

import { normalizeUnits } from '../../../frameworks/string/normalizeUnits';
import { convertRgbaToHex } from '../../../frameworks/string/convertRgbaToHex';
import { getAlphaInPercent } from '../../../frameworks/string/getAlphaInPercent';

import { MsgGetTokenMatchNoMatch } from '../../../frameworks/messages/messages';
import { ErrorGetTokenMatch, ErrorGetTokenMatchNoRemSize } from '../../../frameworks/errors/errors';
import { convertHexToRgba } from '../../../frameworks/string/convertHexToRgba';

export function getTokenMatch(
  tokens: Tokens,
  tokenFileName: string,
  property: string,
  expectedValue: ExpectedValue,
  remSize: number,
  outputFormatColors?: OutputFormatColors
): TokenMatch {
  if (!tokenFileName || !property || !expectedValue) throw Error(ErrorGetTokenMatch);

  let css = ``;
  let imports: Imports[] = [];
  if (!tokens) return { updatedCss: css, updatedImports: imports };

  // Padding requires both X and Y dimensions/values so requires a bit more noodling
  if (property === 'padding') {
    const PADDING_MATCH: TokenMatchRaw | undefined = matchPadding(
      expectedValue,
      remSize,
      tokens,
      tokenFileName,
      property,
      css,
      imports
    );

    if (PADDING_MATCH) {
      css = PADDING_MATCH.css;
      imports = PADDING_MATCH.imports;
    }
  } else {
    const OTHER_MATCH: TokenMatchRaw = matchOther(
      expectedValue,
      remSize,
      outputFormatColors || 'rgba',
      tokens,
      tokenFileName,
      property,
      css,
      imports
    );
    css = OTHER_MATCH.css;
    imports = OTHER_MATCH.imports;
  }

  return { updatedCss: css, updatedImports: imports };
}

function matchPadding(
  expectedValue: ExpectedValue,
  remSize: number,
  tokens: Tokens,
  tokenFileName: string,
  property: string,
  css: string,
  imports: Imports[]
): TokenMatchRaw | undefined {
  const keys: string[] = Object.keys(expectedValue);
  if (typeof expectedValue !== 'object') return;

  keys.forEach((key: string) => {
    let foundMatch = false;
    const keyValue = expectedValue[key];

    if (keyValue) {
      if (!remSize) throw Error(ErrorGetTokenMatchNoRemSize);
      const parsedValue = getParsedValue(keyValue as any);
      const value = normalizeUnits(parsedValue, 'px', 'rem', remSize);

      // Check if we can match value with a token and its value
      Object.entries(tokens).forEach((token) => {
        if (token[1] === value) {
          css += `${property}-${key}: \${${tokenFileName}['${token[0]}']};\n`;
          foundMatch = true;
        }
      });

      // Write expected value as-is, since we couldn't match it to a token
      if (!foundMatch) {
        console.log(`${MsgGetTokenMatchNoMatch} ${property}: ${value}`);
        css += `${property}-${key}: ${value};\n`;
      }
    }
  });

  imports.push(tokenFileName as unknown as Imports);

  return { css, imports };
}

function matchOther(
  expectedValue: ExpectedValue,
  remSize: number,
  outputFormatColors: OutputFormatColors,
  tokens: Tokens,
  tokenFileName: string,
  property: string,
  css: string,
  imports: Imports[]
): TokenMatchRaw {
  let foundMatch = false;

  Object.entries(tokens).forEach((token: Token[]) => {
    const tokenValue: string | number = token[1];
    const isTokenMatch = checkIfTokenMatch(property, tokenValue, expectedValue, remSize);

    if (isTokenMatch) {
      css += `${property}: \${${tokenFileName}['${token[0]}']};\n`;
      imports.push(tokenFileName as unknown as Imports);
      foundMatch = true;
    }
  });

  // Write expected value as-is, since we couldn't match it to a token
  if (!foundMatch) {
    const notFoundMessage = createNotFoundMessage(property, expectedValue);

    if (property === 'height' || property === 'font-size') expectedValue += `px`;

    const useHex = outputFormatColors && outputFormatColors === 'hex';

    console.log(notFoundMessage);
    css += `${property}: ${useHex ? convertRgbaToHex(expectedValue as string) : expectedValue};\n`;
  }

  return { css, imports };
}

function getParsedValue(key: string | number) {
  if (typeof key !== 'number') return parseFloat(key);
  return key;
}

/**
 * @description We need to make a special check if color is using hex format.
 */
function checkIfTokenMatch(
  property: string,
  tokenValue: any,
  expectedValue: ExpectedValue,
  remSize: number
) {
  // @ts-ignore
  if (property.includes('color') && tokenValue[0] === '#')
    return convertHexToRgba(tokenValue as string) === expectedValue;

  const val = valueThroughRem(tokenValue, property, remSize);
  if (val) return val === expectedValue;
  return tokenValue == expectedValue;
}

/**
 * @description Multiply rem|em strings through REM size argument.
 */
function valueThroughRem(tokenValue: any, property: string, remSize: number) {
  if (tokenValue && typeof tokenValue === 'string') {
    if (property === 'letter-spacing') return tokenValue;
    if (tokenValue.match('rem') || tokenValue.match('em')) return parseFloat(tokenValue) * remSize;
  }

  return null;
}

function createNotFoundMessage(property: string, expectedValue: ExpectedValue) {
  let notFoundMessage = `${MsgGetTokenMatchNoMatch} ${property}: ${expectedValue}`;

  // Handle colors since these need more verbose output
  if (property.includes('color'))
    notFoundMessage += ` (HEX: ${convertRgbaToHex(expectedValue as string)}, ${getAlphaInPercent(
      expectedValue as string
    )})`;

  if (property === 'height' || property === 'font-size') notFoundMessage += `px`;

  return notFoundMessage;
}

type Token = string | number;

type ExpectedValue = string | number | Record<string, unknown>;
