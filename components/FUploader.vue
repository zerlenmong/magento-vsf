<template>
  <div id="file-uploader" class="file-uploader-example">
    <LoadWhenVisible>
      <ul>
        <li v-for="file in files" :key="file.id">
          <span>{{file.name}}</span> -
          <span>{{file.size}}</span> -
          <span v-if="file.error">{{file.error}}</span>
          <span v-else-if="file.success">success</span>
          <span v-else-if="file.active">active</span>
          <span v-else-if="!!file.error">{{file.error}}</span>
          <span v-else></span>
          <a class="dropdown-item" href="#" @click.prevent="$refs.upload.remove(file)">Remove</a>
        </li>
      </ul>
      <div class="example-btn">
        <file-upload
          class="btn btn-primary"
          extensions="gif,jpg,jpeg,png,webp"
          accept="image/png,image/gif,image/jpeg,image/webp"
          :custom-action="customAction"
          :multiple="true"
          :size="1024 * 1024 * 10"
          v-model="files"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload">
          <button><i class="fa fa-plus"></i> Select files</button>
        </file-upload>
        <button type="button" class="btn btn-success" v-if="!upload || !upload.active" @click.prevent="upload.active = true">
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
          Start Upload
        </button>
        <button type="button" class="btn btn-danger"  v-else @click.prevent="upload.active = false">
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </button>
    </div>
    </LoadWhenVisible>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  SetupContext,
} from '@nuxtjs/composition-api';
import LoadWhenVisible from '~/components/utils/LoadWhenVisible.vue';
import FileUpload from 'vue-upload-component/src/FileUpload.vue';
import { useUpload } from '~/customQueries/useUpload';

export default defineComponent({
  name: 'SUploader',
  components: {
    LoadWhenVisible,
    FileUpload,
  },
  setup(props: unknown, context: SetupContext) {
    const upload = ref<InstanceType<typeof FileUpload> | null>(null);

    const files = ref([]);
    const { uploadFiles } = useUpload();
    const inputFilter = (newFile: any, oldFile: any, prevent: (prevent?: boolean) => boolean) => {
      if (newFile && !oldFile) {
        // Before adding a file

        // Filter system files or hide files

        if (newFile.name && /(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent();
        }

        // Filter php html js file
        if (newFile.name && /\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent();
        }
      }
    };

    const inputFile = (newFile: any, oldFile: any) => {
      if (newFile && !oldFile) {
        // add
        console.log('add', newFile);
      }
      if (newFile && oldFile) {
        // update
        console.log('update', newFile);
      }

      if (!newFile && oldFile) {
        // remove
        console.log('remove', oldFile);
      }
    };

    const uploadFile = async (fileName: String, imageBase64: string | ArrayBuffer) => {
        const uploadFilesInput = {
          files: [{
            base64_encoded_file: imageBase64,
            name: fileName,
          }],
        };
        const result = await uploadFiles(uploadFilesInput);
        console.error(result);
    };
    const customAction = async (file, component) => {
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
           uploadFile(file.file.name, e.target.result);
        });
        reader.readAsDataURL(file.file);
    };
    return {
      files,
      upload,
      inputFilter,
      inputFile,
      customAction
    }
  }
});
</script>
<style lang="scss" scoped>
.file-uploader-example {
  width: 300px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}
</style>
