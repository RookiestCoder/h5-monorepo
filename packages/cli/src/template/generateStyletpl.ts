import ejs from 'ejs';

// 生成 style/component.scss
const styleTpl = `
// 遵循 BEM 的命名规则
@import './mixins/_mixins.scss';
@import "./common/main.scss";

@include b(<%= componentName %>) {}
`;

export const generateStyleTpl = (componentName: string) => {
  return ejs.render(styleTpl, {
    componentName
  });
};
