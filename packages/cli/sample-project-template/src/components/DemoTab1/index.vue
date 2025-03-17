<template>
  <div class="demotab1">
    <div class="demotab1_content">
      <div style="line-height: 30px" v-for="item in 10">页面内容</div>
    </div>
    <div class="demotab1_btn">
      <mono-common-button text="点击展示委托确认弹窗" :allow="true" :click="handleSubmit"></mono-common-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'APP',
    data() {
      return {};
    },
    methods: {
      //委托确认
      handleSubmit() {
        Dialog.tradeConfirm({
          title: '网下认购撤单确认',
          info: [
            ['操作', 'ETF网下认购撤单'],
            ['ETF名称代码', '中证100ETF  510050'],
            ['认购方式', '现金认购'],
            ['委托金额', '1000.00元'],
            ['委托序号', '2019080112345678']
          ],
          buttonLeftText: '取消',
          buttonRightText: '确定',
          cancel: () => {
            console.log('取消');
          },
          sure: () => {
            console.log('确定');
          }
        });
      }
    },
    created() {},
    mounted() {}
  };
</script>
<style lang="less" scoped>
  .demotab1 {
    padding: 20px 16px;
    &_btn {
      padding: 20px 20px;
    }
  }
</style>
