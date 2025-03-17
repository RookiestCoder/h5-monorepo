export type Format = 'cjs' | 'esm' | 'umd';

export interface UserConfig {
  // 目标工程的路径
  source: string;
  // 组件目录
  componentRootDir: string;
  format?: Format[] | string;
}

export interface TplObserver {
  [key: string]: string;
  vue2: string;
  setup: string;
  vue3: string;
}

export interface CreateOptions {
  codeStyle: string;
}
