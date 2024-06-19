import { readonly, Ref, ref } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { useApi } from '~/composables/useApi';
import type { ComposableFunctionArgs } from '~/composables';
import UPLOAD_FILES_MUTATION from './uploadMeta.gql';
import type {
  UseUploadErrors,
  UseUploadInterface,
  UploadFilesInput,
  UploadOutput,
} from './useUpload';

export function useUpload(): UseUploadInterface {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseUploadErrors> = ref({
    file: null,
  });
  const { mutate } = useApi();
  const uploadFiles = async (params: ComposableFunctionArgs<UploadFilesInput>): Promise<UploadOutput | null> => {
    Logger.debug('useUpload/uploadFiles', params);
    loading.value = true;
    let result = null;
    try {
      error.value.file = null;
      result = await mutate(
        UPLOAD_FILES_MUTATION,
      { input: params },
      );
      Logger.debug('useUpload/uploadFiles', result);
    } catch (err) {
      error.value.file = err;
    } finally {
      loading.value = false;
    }
    return result;
  };
  return {
    error: readonly(error),
    loading: readonly(loading),
    uploadFiles,
  };
}

export * from './useUpload';

export default useUpload;
