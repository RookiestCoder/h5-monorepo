<template>
  <div id="h5-module-1" class="h5-module-1-container">
    <div class="pages">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <div id="pop"></div>
      <!--      弹窗-交易确认-->
      <mono-dialog-trade-confirm />
      <!--      弹窗-解释说明-->
      <!--      弹窗-交易结果-->
      <!--      弹窗-风险提示-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'h5-module',
    components: {},
    created() {
      console.log(window.Format.datePattern(new Date(), 'yyyy-MM-dd hh:mm:ss'));
    }
  };
</script>

<style lang="less"></style>
