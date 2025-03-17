<template>
  <div :class="bem()">
    <div @click="click" class="common-button">
      <div
        class="common-button-submit"
        v-touch="primary === 'primary' ? 'btn_primary' : 'btn_sell'"
        :class="{
          'common-button-sell': allow && primary === 'sell',
          'common-button-submit-disable': !allow && primary === 'primary',
          'common-button-submit-disable-sell': !allow && primary === 'sell',
          'common-button-submit-arrow': allow
        }">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
  import { createNamespace } from '@monorepo/ui/utils/create';

  const [createComponentName, bem] = createNamespace('common-button');

  export default {
    name: createComponentName,

    props: {
      primary: {
        type: String,
        default: 'primary'
      },
      text: {
        type: String,
        default: ''
      },
      click: {
        type: Function
      },
      allow: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        type: ''
      };
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
