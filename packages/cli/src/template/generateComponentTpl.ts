import ejs from 'ejs';
// import { CreateOptions, TplObserver } from '../types';

// 生成 index.vue
const componentTpl = `<template>
  <div :class="bem()"></div>
</template>

<script>
  import { createNamespace } from '@monorepo/ui/utils/create';

  const [createComponentName, bem] = createNamespace('<%= componentName %>');

  export default {
    name: createComponentName,

    props: {},

    data() {
      return {};
    },

    computed: {},

    watch: {},

    created() {},

    mounted() {},

    destroyed() {},

    methods: {
      bem
    }
  };
</script>
`;

// const tplObserver: TplObserver = {
//   vue2: componentTpl,
//   vue3: ''
// };

export const generateComponentTpl = (componentName: string) => {
  return ejs.render(componentTpl, {
    componentName
  });
};
