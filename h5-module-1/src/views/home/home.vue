<template>
  <div class="home_page">
    <mono-title-bar left-icon="back" title="标题" />
    <div class="main">
      <van-tabs v-model="parentTabIndex" swipeable animated>
        <van-tab title="子模块1">
          <DemoTab1 />
        </van-tab>
        <van-tab title="子模块2">
          <DemoTab2 />
        </van-tab>
        <van-tab title="子模块3">
          <DemoTab3 />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
  import viewModelDemo from '@/logic/viewModel/viewModelDemo';

  export default {
    name: 'HomePage',
    mixins: [viewModelDemo],
    data() {
      return {};
    },
    props: {},
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {}
  };
</script>
<style lang="less" src="./home.less" scoped></style>
