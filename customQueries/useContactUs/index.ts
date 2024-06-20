import { readonly, Ref, ref } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { useApi } from '~/composables/useApi';
import type { ComposableFunctionArgs } from '~/composables';
import POST_CONTACT_US_MUTATION from './contactUsMeta.gql';
import type {
  ContactusInput,
  ContactusOutput,
  UseContacUsErrors,
  UseContactUsInterface,
} from './useContactUs';

export function useContactUs(): UseContactUsInterface {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseContacUsErrors> = ref({
    message: null,
  });
  const { mutate } = useApi();
  const postContactUs = async (params: ComposableFunctionArgs<ContactusInput>): Promise<ContactusOutput> => {
    Logger.debug('useContactUs/postContactUs', params);
    loading.value = true;
    let result = null;
    try {
      error.value.message = null;
      result = await mutate(
        POST_CONTACT_US_MUTATION,
        { input: params },
      );
      Logger.debug('useContactUs/postContactUs', result);
    } catch (err) {
      error.value.message = err;
    } finally {
      loading.value = false;
    }
    return result;
  };
  return {
    loading: readonly(loading),
    error: readonly(error),
    postContactUs,
  };
}

export * from './useContactUs';

export default useContactUs;
