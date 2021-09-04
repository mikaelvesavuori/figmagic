import { Tokens } from '../../../contracts/Tokens';
import { Imports } from '../../../contracts/Imports';
import { TokenMatch } from '../../../contracts/TokenMatch';

import { normalizeUnits } from '../../../frameworks/string/normalizeUnits';
import { convertRgbaToHex } from '../../../frameworks/string/convertRgbaToHex';
import { getAlphaInPercent } from '../../../frameworks/string/getAlphaInPercent';

import { MsgGetTokenMatchNoMatch } from '../../../frameworks/messages/messages';
import { ErrorGetTokenMatch, ErrorGetTokenMatchNoRemSize } from '../../../frameworks/errors/errors';

export function getTokenMatch(
  tokens: Tokens | any,
  tokenFileName: string,
  property: string,
  expectedValue: string | number | Record<string, unknown>,
  remSize: number
): TokenMatch {
  try {
    if (!tokenFileName || !property || !expectedValue) throw new Error(ErrorGetTokenMatch);

    let css = ``;
    let imports: Imports[] = [];
    if (!tokens) return { updatedCss: css, updatedImports: imports };

    // Padding requires both X and Y dimensions/values so requires a bit more noodling
    if (property === 'padding') {
      const PADDING_MATCH: any = matchPadding(
        expectedValue,
        remSize,
        tokens,
        tokenFileName,
        property,
        css,
        imports
      );
      css = PADDING_MATCH.css;
      imports = PADDING_MATCH.imports;
    } else {
      const OTHER_MATCH: any = matchOther(
        expectedValue,
        remSize,
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
  } catch (error: any) {
    throw new Error(error);
  }
}

function matchPadding(
  expectedValue: string | number | Record<string, unknown>,
  remSize: number,
  tokens: Tokens,
  tokenFileName: string,
  property: string,
  css: string,
  imports: Imports[]
): Record<string, string | Imports[]> | undefined {
  try {
    const KEYS: any = Object.keys(expectedValue);
    if (typeof expectedValue !== 'object') return;

    KEYS.forEach((key: any) => {
      let foundMatch = false;

      if (expectedValue[key]) {
        if (!remSize) throw new Error(ErrorGetTokenMatchNoRemSize);
        const parsedValue =
          typeof expectedValue[key] !== 'number'
            ? parseFloat(expectedValue[key] as string)
            : expectedValue[key];
        const value = normalizeUnits(parsedValue as any, 'px', 'rem', remSize);

        // Check if we can match value with a token and its value
        Object.entries(tokens).forEach((token) => {
          if (token[1] === value) {
            css += `${property}-${key}: \${${tokenFileName}.${token[0]}};\n`;
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
  } catch (error: any) {
    throw new Error(error);
  }
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
  try {
    let foundMatch = false;

    Object.entries(tokens).forEach((token) => {
      const TOKEN_VALUE = (() => {
        if (typeof token[1] === 'number') return token[1];
        return token[1];
      })();

      // Multiply rem|em strings through REM size argument
      const VALUE_THROUGH_REM = (() => {
        if (TOKEN_VALUE && typeof TOKEN_VALUE === 'string') {
          if (property === 'letter-spacing') return TOKEN_VALUE;
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
        css += `${property}: \${${tokenFileName}.${token[0]}};\n`;
        imports.push(tokenFileName as unknown as Imports);
        foundMatch = true;
      }
    });

    // Write expected value as-is, since we couldn't match it to a token
    if (!foundMatch) {
      let notFoundMessage = `${MsgGetTokenMatchNoMatch} ${property}: ${expectedValue}`;

      // Handle colors since these need more verbose output
      if (property === 'color' || property === 'background-color')
        notFoundMessage += ` (HEX: ${convertRgbaToHex(
          expectedValue as string
        )}, ${getAlphaInPercent(expectedValue as string)})`;

      // Height needs to add the px value or it becomes useless
      if (property === 'height' || property === 'font-size') {
        notFoundMessage += `px`;
        expectedValue += `px`;
      }

      console.log(notFoundMessage);
      css += `${property}: ${expectedValue};\n`;
    }

    return { css, imports };
  } catch (error: any) {
    throw new Error(error);
  }
}
