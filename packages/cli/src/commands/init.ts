// @ts-nocheck
import { UserConfig } from '../types';
import prompts from 'prompts';
import {
  toValidPackageName,
  canSafelyOverwrite,
  isValidPackageName,
  emptyDir,
  renderTemplate,
  getCommand
} from '../utils';
import path from 'path';
import fs from 'fs';
import { red, green, bold } from 'colorette';

export const init = async (config: UserConfig) => {
  const { source } = config;
  let result: {
    projectName?: string;
    shouldOverwrite?: boolean;
    packageName?: string;
  } = {};

  let targetDir = '';
  const defaultProjectName = !targetDir ? 'sample-project' : toValidPackageName(targetDir);
  console.log('defaultProjectName======', defaultProjectName);

  try {
    result = await prompts(
      [
        {
          name: 'projectName',
          type: targetDir ? null : 'text',
          message: 'project name',
          initial: defaultProjectName,
          onState: (state) => {
            targetDir = String(state.value).trim() || defaultProjectName;
            // console.log('new targetDir value: ',targetDir);
          }
        },
        {
          name: 'shouldOverwrite',
          type: () => {
            return canSafelyOverwrite(targetDir) ? null : 'confirm';
          },
          message: () => {
            const dirForPrompt = targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`;

            return `${dirForPrompt} is not empty. Remove existing files and continue?`;
          }
        },
        {
          name: 'packageName',
          type: () => {
            return isValidPackageName(targetDir) ? null : 'text';
          },
          message: 'Package name',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name'
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('x') + 'Operation cancelled');
        }
      }
    );
  } catch (cancelled) {
    console.log('cancelled=====', cancelled);
    process.exit(1);
  }

  const { projectName, packageName = projectName ?? defaultProjectName, shouldOverwrite } = result;
  const root = path.join(source, targetDir);

  if (shouldOverwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  const pkg = { name: packageName, version: '0.1.0' };
  fs.writeFileSync(path.resolve(root, 'package.json'), JSON.stringify(pkg, null, 2));

  const templateRoot = path.resolve(__dirname, '..', '..');

  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName);
    renderTemplate(templateDir, root, { projectName, packageName });
  };

  render('sample-project-template');

  const userAgent = process.env.npm_config_user_agent ?? '';
  const packageManager = /pnpm/.test(userAgent) ? 'pnpm' : /yarm/.test(userAgent) ? 'yarn' : 'npm';

  if (root !== source) {
    console.log(`  ${bold(green(`cd ${path.relative(source, root)}`))}`);
  }
  console.log(`  ${bold(green(getCommand(packageManager, 'install')))}`);
  console.log(`  ${bold(green(getCommand(packageManager, 'serve')))}`);
  console.log();
};
