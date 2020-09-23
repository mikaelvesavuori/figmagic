import { colors } from '../system/colors';

export const WarnNormalizeUnits = `${colors.FgYellow}normalizeUnits(): rootSize and/or unitSize variables are either undefined or not incoming as px values.${colors.Reset}`;
export const WarnParseCliArgsFontUnit = `${colors.FgYellow}Received unrecognized "fontUnit" argument, it must be "rem" (default) or "em". Setting to default value...${colors.Reset}`;
export const WarnParseCliArgsLetterSpacingUnit = `${colors.FgYellow}Received unrecognized "letterSpacingUnit" argument, it must be "em" (default), "px". Setting to default value...${colors.Reset}`;
export const WarnParseCliArgsOpacitiesUnit = `${colors.FgYellow}Received unrecognized "opacitiesUnit" argument, it must be "float" (default) or "percent". Setting to default value...${colors.Reset}`;
export const WarnParseCliArgsOutputFormat = `${colors.FgYellow}Received unrecognized "outputFormat" argument, it must be "mjs" (default) or "js". Setting to default value...${colors.Reset}`;
export const WarnParseCliArgsSpacingUnit = `${colors.FgYellow}Received unrecognized "spacingUnit" argument, it must be "rem" (default) or "em". Setting to default value...${colors.Reset}`;
export const WarnParseCssFromElementNoTokenMatch = `${colors.FgYellow}No token match when processing css from element!${colors.Reset}`;
