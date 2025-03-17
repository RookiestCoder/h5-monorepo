'use strict';
const fs = require('fs');
const packageJson = require('../package.json');
const path = require('path');
const fse = require('fs-extra');
const { sh } = require('tasksfile');
const chalk = require('chalk');
const archiver = require('archiver');
const rawArgv = process.argv.slice(2);
const args = rawArgv.join(' ');

const resolve = (dir) => {
  return path.join(__dirname, '../', dir);
};
const cwd = process.cwd();

/***
 * 整合外部资源文件
 * */
function copyStatic(callback) {
  console.log('args=====', args);
  sh(`vue-cli-service build ${args}`, {
    async: true,
    stdio: 'inherit'
  })
    .then((output) => {
      console.log(chalk.cyan(output || ''));
      callback && callback();
    })
    .catch((err) => {
      console.error('\n');
      console.error(chalk.magenta('编译打包出错了 ~~~~(>_<)~~~~ \n'));
      console.error(chalk.magenta('具体错误信息如下 \n'));
      console.error(chalk.red(`${err}.\n`));
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    });
}

/***
 * 复制dist到集成出包目录
 * */
function modZip() {
  if (!packageJson.name) {
    return;
  }
  const zipName = packageJson.name + '.zip';
  // 旧文件夹路径
  const oldPath = './dist';
  // 新文件夹路径
  const newPath = '../stream/' + packageJson.name + '/' + packageJson.name;
  // 新文件夹路径
  const newZipOriginPath = '../stream/' + packageJson.name;
  // 新文件夹路径
  const newZipPath = '../stream/zip';
  if (!fs.existsSync(newPath)) {
    fs.mkdirSync(newPath, { recursive: true });
  } else {
    removeDir(newPath);
    fs.mkdirSync(newPath, { recursive: true });
  }
  if (!fs.existsSync(newZipPath)) {
    console.log('新建文件:  ' + newZipPath + '/' + zipName);
    fs.mkdirSync(newZipPath, { recursive: true });
  } else {
    console.log('是否有老文件:  ' + newZipPath + '/' + zipName);
    if (fs.existsSync(newZipPath + '/' + zipName)) {
      // 删除文件
      fs.unlinkSync(newZipPath + '/' + zipName);
    }
  }

  // 复制前先把目标文件夹的内容清空
  const oldFile = path.resolve(cwd, oldPath);
  if (fse.existsSync(oldFile)) {
    fse.copySync(oldFile, path.resolve(cwd, newPath));
    console.log('copy:  success');
  }

  const DEST_DIR = path.join(__dirname, '../' + newZipOriginPath);
  const DEST_ZIP_DIR = path.join(__dirname, '../' + newZipPath);

  buildZip(DEST_DIR, DEST_ZIP_DIR, zipName)
    .then(() => {
      console.info('Build OK');
      //清理中间产物
      removeMidDir(oldPath, newZipOriginPath);
    })
    .catch(() => {
      console.info('Build ERROR');
    });
}

/***
 * 制作输出产物压缩包
 * */
function buildZip(src, dist, zipFilename) {
  console.info(`Old ${src}...`);
  console.info(`New ${dist}...`);
  console.info(`Building ${zipFilename}...`);

  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(path.join(dist, zipFilename));

  return new Promise((resolve, reject) => {
    archive
      .directory(src, false)
      .on('error', (err) => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
}

/***
 * 删除文件夹
 * */
function removeDir(dir) {
  let files = fs.readdirSync(dir);
  for (let i = 0; i < files.length; i++) {
    let newPath = path.join(dir, files[i]);
    let stat = fs.statSync(newPath);
    if (stat.isDirectory()) {
      // 如果是文件夹就递归下去
      removeDir(newPath);
    } else {
      // 删除文件
      fs.unlinkSync(newPath);
    }
  }
  // 如果文件夹是空的，就将自己删除掉
  fs.rmdirSync(dir);
}

function removeMidDir(oldPath, newPath) {
  //清理中间产物
  if (fs.existsSync(newPath)) {
    removeDir(newPath);
  }
  //清理中间产物
  if (fs.existsSync(oldPath)) {
    removeDir(oldPath);
  }

  console.info('Clear OK');
}

/***
 * 执行做包脚本
 * */
function buildPackages(callback) {
  // sh(`cd .. && npm run build`, {
  // 	async: true,
  // 	stdio: 'inherit'
  // }).then((output) => {
  // 	console.log('build packages: success');
  callback && callback();
  // })
}

/***
 * 做包入口
 * */
function build() {
  //1、先执行做包命令生成做包产物
  buildPackages(() => {
    //2、整合外部资源到做包产物
    copyStatic(() => {
      //3、制作最终产物包zip
      modZip();
    });
  });
}

build();
