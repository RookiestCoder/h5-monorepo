<template>
  <van-popup :class="bem()" v-model="show" position="bottom" round>
    <div class="mono-dialog-trade-confirm">
      <div class="mono-dialog-trade-confirm-top">
        <span class="mono-dialog-trade-confirm-top-title">{{ title }}</span>
        <div v-if="hasClose" class="mono-dialog-trade-confirm-top-close" @click="close"></div>
      </div>
      <div v-if="titleTip" class="mono-dialog-trade-confirm-top-tip">
        <span class="mono-dialog-trade-confirm-top-tip-content">{{ titleTip }}</span>
      </div>
      <div class="mono-dialog-trade-confirm-center">
        <div class="line" v-for="(item, index) in info">
          <span class="line-left">{{ item[0] }}</span>
          <span class="line-right">{{ item[1] }}</span>
        </div>
      </div>
      <div class="mono-dialog-trade-confirm-tip" v-if="topTip || bottomTip">
        <div class="mono-dialog-trade-confirm-tip-top" v-if="topTip">
          <span class="mono-dialog-trade-confirm-tip-top-right" v-html="topTip"></span>
        </div>
      </div>
      <div class="mono-dialog-trade-confirm-bottom">
        <div class="mono-dialog-trade-confirm-bottom-left" @click="cancel">
          {{ buttonLeftText }}
        </div>
        <div class="mono-dialog-trade-confirm-bottom-separate"></div>
        <div
          class="mono-dialog-trade-confirm-bottom-right"
          :class="{ 'mono-dialog-trade-confirm-bottom-right_buy': isBuy }"
          @click="sure">
          {{ buttonRightText }}
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
  import { createNamespace } from '@monorepo/ui/utils/create';

  const [createComponentName, bem] = createNamespace('dialog-trade-confirm');

  export default {
    name: createComponentName,

    props: {},

    data() {
      return {
        show: false,
        result: false,
        title: '交易确认',
        info: '',
        titleTip: '',
        topTip: '',
        bottomTip: '',
        buttonLeftText: '取消',
        buttonRightText: '确定',
        doSure: {},
        doCancel: {},
        doFinally: {},
        doClose: {},
        hasClose: false,
        //是否为买入二次确认弹窗
        isBuy: false
      };
    },

    computed: {},

    watch: {
      show: function () {
        if (!this.show) {
          this.doFinally && this.doFinally(this.result);
        }
      }
    },

    created() {
      EventBus.$on('showDialogTradeConfirm', (params) => {
        //先清理数据（必要）
        this.clean();
        //再重新生成数据
        this.setInfo(params);
        this.show = true;
      });
    },

    mounted() {},

    destroyed() {},

    methods: {
      bem,
      close() {
        this.result = false;
        this.show = false;
        this.doClose && this.doClose();
      },
      sure() {
        this.result = true;
        this.show = false;
        this.doSure && this.doSure();
      },
      cancel() {
        this.result = false;
        this.show = false;
        this.doCancel && this.doCancel();
      },
      clean() {
        this.setInfo({});
      },
      setInfo(params) {
        this.result = false;
        this.title = params.title ? params.title : '交易确认';
        this.info = params.info ? params.info : '';
        this.buttonLeftText = params.buttonLeftText ? params.buttonLeftText : '取消';
        this.buttonRightText = params.buttonRightText ? params.buttonRightText : '确定';
        this.doSure = params.sure ? params.sure : '';
        this.doCancel = params.cancel ? params.cancel : '';
        this.titleTip = params.titleTip ? params.titleTip : '您是否确认以下委托？';
        this.topTip = params.topTip ? params.topTip : '';
        this.bottomTip = params.bottomTip ? params.bottomTip : '';
        this.doFinally = params.finally ? params.finally : '';
        this.doClose = params.close ? params.close : '';
        this.hasClose = params.hasClose ?? true;
        this.isBuy = params.isBuy ?? false;
      }
    }
  };
</script>
