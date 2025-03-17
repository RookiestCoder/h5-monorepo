<!--页面标题组件-->
<template>
  <div :class="bem()">
    <div class="left">
      <div @click="leftClick">
        <img src="../../icons/ic_titlebar_back.svg" alt="" />
      </div>
      <span v-if="leftText" class="text">{{ leftText }}</span>
    </div>
    <div class="center">{{ title }}</div>
    <div class="right"></div>
  </div>
</template>
<script>
  import { createNamespace } from '@monorepo/ui/utils/create';

  const [createComponentName, bem] = createNamespace('title-bar');

  export default {
    name: createComponentName,
    data() {
      return {
        currClick: ''
      };
    },
    props: {
      leftText: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      leftClick: {
        type: Function,
        default: () => {}
      }
    },
    methods: {
      bem
    }
  };
</script>
