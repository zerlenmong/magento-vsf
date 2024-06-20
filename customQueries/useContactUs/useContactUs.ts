import type { Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables';

export interface ContactusInput {
  fullname: String
  email: String
  telephone: String
  message: String
  recaptchaToken?: String
}

export interface ContactusOutput {
  success_message: String
}

export interface UseContacUsErrors {
  /**
   * Contains error if `uploadFiles` method failed, otherwise is `null`
   */
  message: Error | null;
}

export interface UseContactUsInterface {
  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from the composable methods
   */
  error: Readonly<Ref<UseContacUsErrors>>;

  postContactUs(params: ComposableFunctionArgs<ContactusInput>): Promise<ContactusOutput>
}
