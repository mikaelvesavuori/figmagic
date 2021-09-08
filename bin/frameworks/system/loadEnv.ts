import fs from 'fs';

/**
 * @description Loads Figmagic environment variables if an `.env` file exists.
 */
export function loadEnv(): void {
  try {
    const filePath = `${process.cwd()}/.env`;
    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath, 'utf-8');

      const variables = file
        .toString()
        .split('\n')
        .filter((i: string) => i.startsWith('FIGMA_TOKEN') || i.startsWith('FIGMA_URL'));

      variables.forEach((variable: string) => {
        const [key, value] = variable.split('=');
        process.env[key] = value;
      });
    }
  } catch (error: any) {
    throw Error(error);
  }
}
