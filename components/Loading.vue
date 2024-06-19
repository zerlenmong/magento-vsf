<template>
  <section>
    <LoadWhenVisible>
      <div class="loading-dot">
        <div v-for="dot in dotNumber" class="dot">loading</div>
      </div>
    </LoadWhenVisible>
    <LoadWhenVisible>
      <div class="prose">
        <span class="lead">Leading text</span>
      </div>
      <div class="flex">
        <SfCheckbox v-model="modelValue" value="value" />
        <SfButton class="erwwsew"></SfButton>
      </div>
    </LoadWhenVisible>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import LoadWhenVisible from '~/components/utils/LoadWhenVisible.vue';
import { SfCheckbox, SfButton } from '@storefront-ui/vue';

export default defineComponent({
  name: 'Loading',
  components: {
    LoadWhenVisible,
    SfCheckbox,
    SfButton
  },
  props: {
     dotNumber : {
       type: [Number],
       default: 36,
     },
  },
  setup() {
    const modelValue = ref([]);
    return {
      modelValue
    }
  }
});
</script>

<style lang="scss" scoped>
$ballSize: 10px;
$contaierSize: 150px;
$n: 36;
$pDeg: calc(360deg / $n);
$duration: 2s;
.loading-dot {
  width: $contaierSize;
  height: $contaierSize;
  border-radius: 50%;
  margin: 50px auto;
  position: relative;
  z-index: 1;
  .dot {
    width: $ballSize;
    height: $ballSize;
    position: absolute;
    top:0;
    left: 50%;
    margin-left: calc(-#{$ballSize} / 2);
    margin-top: calc(-#{$ballSize} / 2);
    font-size: 0;
    transform-origin: center calc(($contaierSize + $ballSize) / 2);
    perspective: 70px;
    transform-style: preserve-3d;
    @for $i from 1 through $n {
      &:nth-child(#{$i}) {
        transform: rotate(($i - 1) * $pDeg);
        &:before, &:after {
          animation-delay: -(calc($duration / $n) * ($i - 1) * 6);
        }
      }
    }
    &::before, &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    &::before {
      background: #000;
      top: -100%;
      animation: rotate-black $duration infinite;
      @keyframes rotate-black {
        20% {
          transform: translate3d(0, 100% , $ballSize);
          animation-timing-function: ease-out;
        }
        50% {
          transform: translate3d(0, 200% , 0);
          animation-timing-function: ease-in;
        }
        75% {
          transform: translate3d(0, 100% , -$ballSize);
          animation-timing-function: ease-out;
        }
      }
    }
    &::after {
      background: #736a6a;
      top: 100%;
      animation: rotate-white $duration infinite;
      @keyframes rotate-white {
        20% {
          transform: translate3d(0, -100% , -$ballSize);
          animation-timing-function: ease-out;
        }
        50% {
          transform: translate3d(0, -200% , 0);
          animation-timing-function: ease-in;
        }
        75% {
          transform: translate3d(0, -100% , $ballSize);
          animation-timing-function: ease-out;
        }
      }
    }
  }
}
</style>
