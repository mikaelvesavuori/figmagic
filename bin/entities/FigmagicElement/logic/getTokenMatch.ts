import { Tokens } from '../../../contracts/Tokens';
import { Imports } from '../../../contracts/Imports';
import { TokenMatch } from '../../../contracts/TokenMatch';

import { normalizeUnits } from '../../../frameworks/string/normalizeUnits';

import { MsgGetTokenMatchNoMatch } from '../../../frameworks/messages/messages';
import { ErrorGetTokenMatch, ErrorGetTokenMatchNoRemSize } from '../../../frameworks/errors/errors';

// TODO: Refactor

/**
 * @description Match and find design tokens for CSS values
 *
 * @param tokens Design tokens
 * @param tokenFileName String representing file name from which the token is exported
 * @param property CSS property to be assigned
 * @param expectedValue Expected value to match for
 * @param remSize HTML body REM size, required for padding and anything to do with rem/em
 */
export function getTokenMatch(
  tokens: Tokens | any,
  tokenFileName: string,
  property: string,
  expectedValue: string | number | Record<string, unknown>,
  remSize: number
): TokenMatch {
  if (!tokens || !tokenFileName || !property || !expectedValue) throw new Error(ErrorGetTokenMatch);

  let css = ``;
  let imports: any[] = [];

  // Padding requires both X and Y dimensions/values so requires a bit more noodling
  if (property === 'padding') {
    const a: any = matchPadding(
      expectedValue,
      remSize,
      tokens,
      tokenFileName,
      property,
      css,
      imports
    );
    css = a.css;
    imports = a.imports;
  } else {
    const a: any = matchOther(
      expectedValue,
      remSize,
      tokens,
      tokenFileName,
      property,
      css,
      imports
    );
    css = a.css;
    imports = a.imports;
  }

  return { updatedCss: css, updatedImports: imports };
}

function matchPadding(
  expectedValue: string | number | Record<string, unknown>,
  remSize: number,
  tokens: Tokens,
  tokenFileName: string,
  property: string,
  css: string,
  imports: Imports[]
): any {
  const keys = Object.keys(expectedValue);
  // TODO: Fix "any"
  keys.forEach((key: any) => {
    let foundMatch = false;

    //  && expectedValue[key] > 0
    if (expectedValue[key]) {
      if (!remSize) throw new Error(ErrorGetTokenMatchNoRemSize);
      const parsedValue = parseFloat(expectedValue[key]);
      const value = normalizeUnits(parsedValue, 'px', 'rem', remSize);

      // Check if we can match value with a token and its value
      Object.entries(tokens).forEach((s) => {
        if (s[1] === value) {
          css += `${property}-${key}: \${${tokenFileName}.${s[0]}};\n`;
          foundMatch = true;
        }
      });

      // Write expected value as-is, since we couldn't match it to a token
      if (!foundMatch) {
        console.warn(`${MsgGetTokenMatchNoMatch} ${property}: ${value}`);
        css += `${property}-${key}: ${value};\n`;
      }
    }
  });

  imports.push(tokenFileName);

  return { css, imports };
}

function matchOther(
  expectedValue: string | number | Record<string, unknown>,
  remSize: number,
  tokens: Tokens,
  tokenFileName: string,
  property: string,
  css: string,
  imports: Imports[]
) {
  // TODO: Ugly fix to get rid of error, 'css' is declared but its value is never read.ts(6133)
  console.log(css);

  let foundMatch = false;

  Object.entries(tokens).forEach((s) => {
    const TOKEN_VALUE = (() => {
      if (typeof s[1] === 'number') return s[1]; //parseFloat(s[1])
      return s[1];
    })();

    // Multiply rem|em strings through REM size argument
    const VALUE_THROUGH_REM = (() => {
      if (TOKEN_VALUE && typeof TOKEN_VALUE === 'string') {
        if (TOKEN_VALUE.match('rem') || TOKEN_VALUE.match('em')) {
          return parseFloat(TOKEN_VALUE) * remSize;
        }
      }
      return null;
    })();

    const IS_TOKEN_MATCH = VALUE_THROUGH_REM
      ? VALUE_THROUGH_REM === expectedValue
      : TOKEN_VALUE == expectedValue;

    if (IS_TOKEN_MATCH) {
      css += `${property}: \${${tokenFileName}.${s[0]}};\n`;
      imports.push(tokenFileName);
      foundMatch = true;
    }
  });

  // Write expected value as-is, since we couldn't match it to a token
  if (!foundMatch) {
    console.warn(`${MsgGetTokenMatchNoMatch} ${property}: ${expectedValue}`);
    css += `${property}: ${expectedValue};\n`;
  }

  return { css, imports };
}
