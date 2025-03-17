import { CreateOptions, UserConfig } from '../types';
import prompts from 'prompts';
import { canSafelyOverwrite, resolveComponentDir, writeFile, buildStyleEntry, buildComponentEntry } from '../utils';
import { red } from 'colorette';
import path from 'path';
import fs from 'fs';
import { generateEntryTpl } from '../template/generateEntryTpl';
import { generateComponentTpl } from '../template/generateComponentTpl';
import { generateStyleTpl } from '../template/generateStyleTpl';

export function isValidComponentName(name: string) {
  if (!name) {
    return false;
  }

  const flag = /^[A-Za-z-]+$/gi.test(name);

  if (!flag) {
    console.warn(`组件 "${name}" 不合法。`);
    console.info(`组件名称只允许使用英文字母和中划线（"-"）连接，并且以字母开头`);
  }

  return flag;
}

export const create = async (config: UserConfig) => {
  const { source, componentRootDir } = config;
  let name = '';
  let targetDir = resolveComponentDir(source, componentRootDir, name);

  if (isValidComponentName(name)) {
    name = '';
    targetDir = '';
  }

  try {
    const codeStyle = 'vue2';

    if (!codeStyle) {
      throw new Error(`Invalid target code style: ${codeStyle}`);
    }

    const result = await prompts(
      [
        {
          name: 'name',
          type: 'text',
          message: '请输入组件的名称',
          initial: '组件名称',
          validate: () => {
            console.log('');
            return isValidComponentName(name);
          },
          onState: (state) => {
            name = String(state.value).trim();
            targetDir = resolveComponentDir(source, componentRootDir, name);
          }
        },
        {
          name: 'shouldOverwrite',
          type: () => {
            return canSafelyOverwrite(targetDir) ? null : 'confirm';
          },
          message: () => {
            return `Target directory "${targetDir}" is not empty. Remove existing files and continue?`;
          }
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('x') + '操作取消');
        }
      }
    );

    const componentPath = path.resolve(source, `src/components/${name}`);
    const stylePath = path.resolve(source, `src/style`);

    if (!fs.existsSync(componentPath)) {
      fs.mkdirSync(componentPath, { recursive: true });
    }

    if (!fs.existsSync(stylePath)) {
      fs.mkdirSync(stylePath, { recursive: true });
    }

    const opts: CreateOptions = {
      codeStyle
    };
    const prefixCustom = 'cus';
    writeFile(path.resolve(componentPath, 'index.js'), generateEntryTpl(name));
    writeFile(path.resolve(componentPath, 'index.vue'), generateComponentTpl(name));
    writeFile(path.resolve(stylePath, `${name}.scss`), generateStyleTpl(name));

    buildStyleEntry(stylePath, path.resolve(stylePath, 'index.scss'));

    const componentsPath = path.resolve(source, 'src/components');
    buildComponentEntry(componentsPath, path.resolve(source, 'components.json'));

    console.log('成功创建组件');
  } catch (cancelled: any) {
    console.log(cancelled.message);
    process.exit(1);
  }
};
