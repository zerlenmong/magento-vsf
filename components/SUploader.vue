<template>
  <div id="suploader">
    <LoadWhenVisible>
      <uploader ref="uploaderComponent"
                :options="options"
                @file-complete="fileComplete"
                @complete="complete"
                class="uploader-example">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
          <p>Drop files here to upload or</p>
          <uploader-btn>select files</uploader-btn>
          <uploader-btn :attrs="attrs">select images</uploader-btn>
          <uploader-btn :directory="true">select folder</uploader-btn>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
    </LoadWhenVisible>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  nextTick,
  ref,
} from '@nuxtjs/composition-api';
import LoadWhenVisible from '~/components/utils/LoadWhenVisible.vue';
import {
  Uploader,
  UploaderBtn,
  UploaderDrop,
  UploaderUnsupport,
  UploaderList,
} from 'vue-simple-uploader';
import FileUpload from 'vue-upload-component/src/FileUpload.vue';

export default defineComponent({
  name: 'SUploader',
  components: {
    LoadWhenVisible,
    Uploader,
    UploaderBtn,
    UploaderDrop,
    UploaderUnsupport,
    UploaderList,
  },
  setup() {
    const uploaderComponent = ref<InstanceType<typeof FileUpload> | null>(null);
    const options = ref({
      target: '/upload',
      testChunks: false,
    });
    const attrs = ref({
      accept: 'image/*',
    });
    const fileComplete = () => {
      console.log('file complete', arguments);
    };
    const complete = () => {
      console.log('complete', arguments);
    };
    // @ts-ignore
    return {
      uploaderComponent,
      options,
      attrs,
      fileComplete,
      complete,
    };
  },
  mounted() {
    nextTick(() => {
       console.error(this.$refs.uploaderComponent);
    });
  },
});
</script>
<style lang="scss" scoped>
.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
