import type { Ref } from '@nuxtjs/composition-api';
import type { Maybe } from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '~/composables';

/** upload Files information */
export interface UploadFilesInput {
  /** An array of files */
  files?: Maybe<Array<Maybe<UploadFile>>>;
}

export interface UploadFile {
  name: String,
  base64_encoded_file: String | ArrayBuffer
}
export interface UploadedReturn {
  name: String,
  full_path: String,
  quote_path: String,
  order_path: String,
  secret_key: String
}
export interface UploadOutput {
  items:Maybe<Array<Maybe<UploadedReturn>>>;
}
/**
 * Errors that occured in the {@link useContent|useContent()} composable
 */
export interface UseUploadErrors {
  /**
   * Contains error if `uploadFiles` method failed, otherwise is `null`
   */
  file: Error | null;
}

/**
 * Data and methods returned from the {@link useContent|useContent()} composable
 */
export interface UseUploadInterface {
  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from the composable methods
   */
  error: Readonly<Ref<UseUploadErrors>>;

  /**
   * upload files
   *
   * @remarks
   *
   *
   * @example
   *
   * Load CMS Page using the useFetch hook:
   *
   * ```typescript
   * import { useFetch, ref } from '@nuxtjs/composition-api';
   * import { useUpload } from '~/customQueries/useUpload';
   *
   * export default {
   *   setup() {
   *     const { loading, error, uploadFiles } = useUpload();
   *
   *     const uploadFiles = ref({});
   *     const uploadFilesInput = [
   *          {
   *            name: filename
   *            base64_encoded_file: base64_encoded_file
   *          }
   *     ];
   *
   *     const result = async () => {
   *       await uploadFiles({ files: uploadFilesInput });
   *
   *       if (error?.value?.page || !page.value) {
   *         // Handle error
   *       }
   *     };
   *   }
   * }
   * ```
   */
  uploadFiles(params: ComposableFunctionArgs<UploadFilesInput>): Promise<UploadOutput>;
}
