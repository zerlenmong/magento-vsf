<template>
  <div id="test">
    <h1>{{ testTitle }}</h1>
    <LoadWhenVisible>
      <Loading class="loading-dot-test" />
    </LoadWhenVisible>
    <SUploader />
    <FUploader />
    <LoadWhenVisible>
      <div v-for="(block, index) in blocks">
        <div
          v-if="block.title"
          class="sf-heading"
        >
          <h3 class="sf-heading__title h3">
            {{ block.title }}
          </h3>
        </div>
        <component
          :is="tag"
          v-html="$dompurify(block.content)"
        />
      </div>
    </LoadWhenVisible>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  useFetch,
  ref,
} from '@nuxtjs/composition-api';
import LoadWhenVisible from '~/components/utils/LoadWhenVisible.vue';
import { useContent } from '~/composables';
import HTMLContent from '~/components/HTMLContent.vue';

export default defineComponent({
  name: 'Test',
  components: {
    HTMLContent,
    // eslint-disable-next-line vue/no-unused-components
    LoadWhenVisible,
    SUploader: () => import(/* webpackPrefetch: true */ '~/components/SUploader.vue'),
    FUploader: () => import(/* webpackPrefetch: true */ '~/components/FUploader.vue'),
    Loading: () => import(/* webpackPrefetch: true */ '~/components/Loading.vue'),
  },
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
  setup() {
    const testTitle = ref('Test 111');
    const { loadBlocks } = useContent();
    const blocks = ref([]);
    useFetch(async () => {
      blocks.value = await loadBlocks({identifiers: ['footer_links_block','contact-us-info']});
    });
    // @ts-ignore
    return {
      testTitle,
      blocks,
    };
  }
});
</script>
<style lang="scss" scoped>
</style>
