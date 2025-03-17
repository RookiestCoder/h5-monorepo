import { cac } from 'cac';

import { init, create } from './commands';
import { UserConfig } from './types';

export const cli = (options: UserConfig): void => {
  // create cac instance
  const program = cac('monorepo');

  // display core version and cli version
  const versionCli = require('../package.json').version;
  program.version(`monorepo/cli@${versionCli}`);

  // display help message
  program.help();

  // test 测试
  program
    .command('test <name>', 'Test in the project')
    .option('--config <config>', 'Value of config')
    .action(async (name, flags) => {
      Object.assign(options, {
        flags
      });
      // console.log('test 测试-------');
      // console.log('name=====', name);
      // console.log('flags=====', flags);
      // console.log('options=====', options);
      // console.log('flags=====',flags);
      // await init(options);
    });

  // init 初始化项目工程
  program.command('init', 'Initialize the project').action(async (flags) => {
    Object.assign(options, {
      flags
    });
    // console.log('init 初始化项目工程-------');
    // console.log('options=====', options);
    // console.log('flags=====', flags);
    await init(options);
  });

  // create 创建相关模板文件
  program.command('create', 'Create component template').action(async (flags) => {
    Object.assign(options, {
      flags
    });
    console.log('create 创建相关模板文件-------');
    await create(options);
  });

  // build 构建打包
  program.command('build', 'Bundle component').action(async (flags) => {
    Object.assign(options, {
      ...flags
    });
    console.log('build 构建打包-------');
    // await build(options);
  });

  program.parse(process.argv);
  // const parsed = program.parse(process.argv);
  // console.log(JSON.stringify(parsed));
};
