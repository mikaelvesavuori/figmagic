import * as fs from 'fs';
import * as readline from 'readline';

/*
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
*/

const baseConfig = {
  debugMode: false,
  fontUnit: 'rem',
  letterSpacingUnit: 'em',
  opacitiesUnit: 'float',
  figmaData: 'figma.json',
  figmagicFolder: '.figmagic',
  outputFolderElements: 'elements',
  outputFolderGraphics: 'graphics',
  outputFolderTokens: 'tokens',
  outputFormatCss: 'ts',
  outputFormatElements: 'tsx',
  outputFormatGraphics: 'svg',
  outputFormatTokens: 'ts',
  outputScaleGraphics: 1,
  outputDataTypeToken: null,
  recompileLocal: false,
  remSize: 16,
  skipFileGeneration: {
    forceUpdate: true,
    skipCss: false,
    skipDescription: false,
    skipReact: false,
    skipStorybook: false,
    skipStyled: false
  },
  spacingUnit: 'rem',
  syncElements: false,
  syncGraphics: false,
  syncTokens: false,
  templates: {
    templatePathReact: '/node_modules/figmagic/templates/react',
    templatePathStorybook: '/node_modules/figmagic/templates/story',
    templatePathStyled: '/node_modules/figmagic/templates/styled'
  },
  token: '',
  url: '',
  usePostscriptFontNames: false
};

const config = {};

const prompts = [
  { question: 'Debug mode?', values: ['false', 'true'], key: 'debugMode' },
  { question: 'Font unit?', values: ['rem', 'em'], key: 'fontUnit' }
];

async function askQuestion(prompt) {
  return new Promise((resolve) =>
    rl.question(prompt.question, (answer) => {
      config[prompt.key] = answer;
      resolve();
    })
  );
}

const main = async () => {
  prompts.forEach(async (prompt, index) => await askQuestion(prompt[index])); //xxxx(prompt)
  writeConfig();
  rl.close();
};

function writeConfig(file) {
  const FILE_PATH = '.initrc';
  const FILE_EXISTS = fs.existsSync(FILE_PATH);
  if (!FILE_EXISTS) write(FILE_PATH, JSON.stringify(file, null, ' '));
  return;
}

function write(filePath, fileContent) {
  try {
    if (!filePath || !fileContent) throw new Error('Error when writing!');
    fs.writeFileSync(filePath, fileContent, 'utf-8');
  } catch (error) {
    throw new Error(error);
  }
}

//main();
writeConfig(baseConfig);

/**
 * figmagic init        Interactive prompt to take in values
 * figmagic init -y     Write full default config to disk
 *
 * Enter/return for default value
 */
