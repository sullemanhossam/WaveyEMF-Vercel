import fs from 'fs';
import path from 'path';

// Define the path to the directory containing your .tsx files
const directoryPath = path.join(__dirname, './source'); // Adjust this path

// Define the path to your RSBuild configuration file
const rsbuildConfigPath = path.join(__dirname, 'rsbuild.config.ts');

// Function to get a list of .tsx files in the directory
const getTSXFiles = (dirPath: string): string[] => {
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith('.tsx'))
    .map((file) => path.join(dirPath, file));
};

// Function to update RSBuild configuration
const updateRSBuildConfig = (files: string[]) => {
  const configFile = fs.readFileSync(rsbuildConfigPath, 'utf8');

  // Extract the existing config as a JavaScript object
  const config = eval(`(${configFile})`); // This is a simple way to parse the config for demo purposes

  // Clear previous entries if necessary (customize this based on your actual config structure)
  config.entryPoints = {};

  // Add new entries based on files
  files.forEach((file) => {
    const fileName = path.basename(file, '.tsx');
    config.entryPoints[fileName] = file;
  });

  // Convert the updated config object back to TypeScript code
  const updatedConfig = `import { defineConfig } from '@rsbuild/core';\nimport { pluginReact } from '@rsbuild/plugin-react';\nimport { pluginSvgr } from '@rsbuild/plugin-svgr';\n\nexport default defineConfig(${JSON.stringify(config, null, 2)});`;

  // Write the updated configuration back to the file
  fs.writeFileSync(rsbuildConfigPath, updatedConfig, 'utf8');
};

// Main execution
const tsxFiles = getTSXFiles(directoryPath);
updateRSBuildConfig(tsxFiles);

console.log('RSBuild configuration updated.');
