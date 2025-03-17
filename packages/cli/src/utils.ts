// @ts-nocheck
import path from 'path';
import fs from 'fs';
//校验包名合法性
export function toValidPackageName(projectName) {
  return (
    projectName &&
    projectName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/^[._]/, '')
      .replace(/[^a-z0-9-~]+/g, '-')
  );
}

//能否安全覆盖
export function canSafelyOverwrite(dir) {
  if (!fs.existsSync(dir)) {
    return true;
  }

  const files = fs.readdirSync(dir);
  if (files.length === 0) {
    return true;
  }
  if (files.length === 1 && files[0] === '.git') {
    return true;
  }

  return false;
}

//校验包名合法性
export function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
}

//清空dir下内容
export function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  fs.rmSync(dir, { recursive: true, force: true }, (err) => {
    console.log(`fs.rmSync ${dir} error,errorInfo:`, err);
  });

  // postOrderDirectoryTraverse(
  //   dir,
  //   (dir) => fs.rmdirSync(dir),
  //   (file) => fs.unlinkSync(file)
  // );
}

export function postOrderDirectoryTraverse(dir, dirCallback, fileCallback) {
  for (const filename of fs.readdirSync(dir)) {
    const fullpath = path.resolve(dir, filename);
    if (fs.lstatSync(fullpath).isDirectory()) {
      postOrderDirectoryTraverse(fullpath, dirCallback, fileCallback);
      dirCallback(fullpath);
      continue;
    }
    fileCallback(fullpath);
  }
}

//加载模块
export function renderTemplate(src, dest, options = {}) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    // skip node_module
    if (path.basename(src) === 'node_modules') {
      return;
    }

    // if it's a directory, render its subdirectories and files recusively
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      renderTemplate(path.resolve(src, file), path.resolve(dest, file), options);
    }
    return;
  }

  const filename = path.basename(src);

  if (filename === 'package.json' && fs.existsSync(dest)) {
    // merge instead of overwriting
    const existing = JSON.parse(fs.readFileSync(dest, 'utf8'));
    const newPackage = JSON.parse(fs.readFileSync(src, 'utf8'));
    let pkg = sortDependencies(deepMerge(existing, newPackage));
    if (pkg.name && (options?.projectName || options?.packageName)) {
      pkg.name = `${options?.projectName || options?.packageName}`;
    }
    fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + '\n');
    return;
  }

  if (filename.startsWith('_')) {
    // rename `_file` to `.file`
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'));
  }

  fs.copyFileSync(src, dest);
}

export function sortDependencies(packageJson) {
  const sorted = {};

  const depTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];

  for (const depType of depTypes) {
    if (packageJson[depType]) {
      sorted[depType] = {};

      Object.keys(packageJson[depType])
        .sort()
        .forEach((name) => {
          sorted[depType][name] = packageJson[depType][name];
        });
    }
  }

  return {
    ...packageJson,
    ...sorted
  };
}

const mergeArrayWithDedupe = (a, b) => Array.from(new Set([...a, ...b]));
const isObject = (val) => val && typeof val === 'object';

/**
 * Recursively merge the content of the new object to the existing one
 * @param {Object} target the existing object
 * @param {Object} obj the new object
 */
export function deepMerge(target, obj) {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key];
    const newVal = obj[key];

    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe(oldVal, newVal);
    } else if (isObject(oldVal) && isObject(newVal)) {
      target[key] = deepMerge(oldVal, newVal);
    } else {
      target[key] = newVal;
    }
  }

  return target;
}

export function getCommand(packageManager, scriptName) {
  if (scriptName === 'install') {
    return packageManager === 'yarn' ? 'yarn' : `${packageManager} install`;
  }

  return packageManager === 'npm' ? `npm run ${scriptName}` : `${packageManager} ${scriptName}`;
}

export function resolveComponentDir(source: string, componentRootDir: string, name: string) {
  return path.resolve(source, componentRootDir, name);
}

export function writeFile(filename: string, content: string | Uint8Array): void {
  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filename, content);
}

export const buildStyleEntry = (stylePath: string, indexFilePath: string) => {
  // 遍历目录下的所有文件
  fs.readdir(stylePath, (err, files) => {
    if (err) {
      console.log('Error reading directory:', err);
      return;
    }

    // 过滤出样式文件
    const styleFiles = files.filter(
      (file) => ['.scss'].includes(path.extname(file)) && !['index.scss'].includes(path.basename(file))
    );

    // 生成引入语句
    const importStatements = styleFiles.map((file) => `@import '${file}';`).join('\n');

    // 写入到 index.scss 文件中
    writeFile(indexFilePath, importStatements);
    console.log('成功导入样式');
  });
};

export const buildComponentEntry = (componentsPath: string, filePath: string) => {
  // 遍历目录下的所有文件
  fs.readdir(componentsPath, (err, files) => {
    if (err) {
      console.log('Error reading directory:', err);
      return;
    }

    const obj = {};
    files
      .filter((item) => !['.DS_Store'].includes(item))
      .forEach((file) => {
        obj[file] = `./src/components/${file}/index.js`;
      });

    writeFile(filePath, JSON.stringify(obj, null, 2));
    console.log('成功导入组件');
  });
};

export function firstUpperCase(str: string) {
  return str.replace(/^\S/, (s) => s.toUpperCase());
}

export function camelize(str: string) {
  return String(str).replace(/-\D/g, function (match) {
    return match.charAt(1).toUpperCase();
  });
}
